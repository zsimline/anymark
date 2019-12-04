import { EventEmitter } from 'events';
import * as http from 'http';
import * as net from 'net'
import { createHash } from 'crypto';

import { GUID } from './config'
import { PerMessageDeflate } from './permessage-deflate'
import { PerMessageDeflateOpts } from './permessage-deflate'

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

const kUsedByWebSocketServer = Symbol('kUsedByWebSocketServer');


export interface WebSocketServerOpts {
  host?: string,
  port?: number,
  server?: http.Server,
  backlog?: number,
  path?: string,
  maxPayload?: number,
  perMessageDeflate?: PerMessageDeflateOpts,
  handleProtocols?: Function,
  verifyClient?: Function,
};

/**
 * Class representing a WebSocket server.
 */
export class WebSocketServer extends EventEmitter {
  private httpServer: http.Server = null;
  private events: object = null;
  private opts: WebSocketServerOpts = null;
  private clients: Set<net.Socket> = null;

  /**
   * Create a `WebSocketServer` instance.
   *
   * @param options Configuration options
   *  `options.host` The hostname where to bind the server
   *  `options.port` The port where to bind the server
   *  `options.server` A pre-created HTTP/S server to use
   *  `options.backlog` The maximum length of the queue of pending connections
   *  `options.path` Accept only connections matching this path
   *  `options.maxPayload` The maximum allowed message size
   *  `options.perMessageDeflate` Enable/disable permessage-deflate
   *  `options.handleProtocols` A hook to handle protocols
   *  `options.verifyClient` A hook to reject connections
   * @param callback A listener for the `listening` event
   */
  constructor(options: WebSocketServerOpts, callback: ()=>void) {
    super();

    const opts = {
      host: 'localhost',
      port: 1722,
      server: null,
      path: null,
      maxPayload: 104857600,
      perMessageDeflate: {},
      handleProtocols: null,
      verifyClient: null,
      backlog: 128,
      ...options
    };
    this.opts = opts;

    this.createHttpServer();
    this.bindEvents();
  }
  
  /**
   * Initialize `this.httpServer`
   */ 
  private createHttpServer() {
    if (this.opts.server) {
      if (this.opts.server[kUsedByWebSocketServer]) {
        throw new Error(
          'The HTTP/S server is already being used by another WebSocket server'
        );
      }
      this.opts.server[kUsedByWebSocketServer] = true;
      this.httpServer = this.opts.server;
    } else if (this.opts.port) {
      this.httpServer = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });

      this.httpServer.listen(
        this.opts.port,
        this.opts.host,
        this.opts.backlog,
      );
    } else {
      throw new TypeError(
        "One of the 'port' or 'server' opts must be specified"
      );
    }
  }

  /**
   * Initialize `this.events`,
   */
  private bindEvents() {
    if (this.httpServer) {
      this.events = {
        'listening': this.emit.bind(this, 'listening'),
        'error'    : this.emit.bind(this, 'error'),
        'upgrade'  : (req, socket, head) => {
          this.handleUpgrade(req, socket, head, (ws) => {
            this.emit('connection', ws, req);
          });
        }
      };

      this.addListeners();
    }
  }

  /**
   * Binding events for `this.httpServer`
   */
  private addListeners() {
    for (const event of Object.keys(this.events)) {
      this.httpServer.on(event, this.events[event]);
    }
  }

  /**
   * Remove all events on `this.httpServer` 
   */
  private removeListeners() {
    for (const event of Object.keys(this.events)) {
      this.httpServer.removeListener(event, this.events[event]);
    }
  }

  // Handle premature socket errors.
  private socketOnError() {
   // this.destroy();
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param req Request object to inspect
   * @return `true` if the request is valid, else `false`
   */
  public shouldHandle(req: http.IncomingMessage) {
    if (this.opts.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.opts.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param req The request object
   * @param socket The network socket between the server and client
   * @param head The first packet of the upgraded stream
   * @param cb Callback
   */
  public handleUpgrade(req: http.IncomingMessage, socket: net.Socket,
                       head: Buffer, cb:Function) {
    socket.on('error', this.socketOnError);

    const key = req.headers['sec-websocket-key'].trim();
    const version =+ req.headers['sec-websocket-version'];
    const extensions = {};

    if (
      req.method !== 'GET' ||
      req.headers.upgrade.toLowerCase() !== 'websocket' ||
      !keyRegex.test(key) ||
      (version !== 8 && version !== 13) ||
      !this.shouldHandle(req)
    ) {
      return this.abortHandshake(socket, 400);
    }

    if (this.opts.perMessageDeflate) {
      const perMessageDeflate = new PerMessageDeflate(
        this.opts.perMessageDeflate,
        this.opts.maxPayload
      );

      try {
        const offers = parse(req.headers['sec-websocket-extensions']);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        return this.abortHandshake(socket, 400);
      }
    }
    
    this.completeUpgrade(key, extensions, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param key The value of the `Sec-WebSocket-Key` header
   * @param extensions The accepted extensions
   * @param req The request object
   * @param socket The network socket between the server and client
   * @param head The first packet of the upgraded stream
   * @param cb Callback
   */
  private completeUpgrade(key: string, extensions: object,
                          req: http.IncomingMessage, socket: net.Socket,
                          head: Buffer, cb: Function) {
    
    // Destroy the socket if the client has already sent a FIN packet.
    if (!socket.readable || !socket.writable) return socket.destroy();

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Connection: Upgrade',
      'Upgrade: websocket',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    //const ws = new WebSocket(null);
    
      
    //let protocol = req.headers['sec-websocket-protocol'];

    //if (protocol) {
      //protocol = protocol.trim().split(/ *, */);

      // Optionally call external protocol selection handler.
      /*if (this.opts.handleProtocols) {
        protocol = this.opts.handleProtocols(protocol, req);
      } else {
        protocol = protocol[0];
      }

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        //ws.protocol = protocol;
      }
    }*/

    /*if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }*/

    // Allow external modification/inspection of handshake headers.
    //this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', this.socketOnError);

    //ws.setSocket(socket, head, this.opts.maxPayload);

    if (this.clients) {
      //this.clients.add(ws);
      //ws.on('close', () => this.clients.delete(ws));
    }

    //cb(ws);
  }

  /**
   * Close the connection when preconditions are not fulfilled.
   *
   * @param socket  The socket of the upgrade request
   * @param code    The HTTP response status code
   * @param message The HTTP response body
   * @param headers Additional HTTP response headers
   */
  private abortHandshake(socket: net.Socket, code: number, 
                         message?:string, headers?: object) {
    if (socket.writable) {
      message = message || http.STATUS_CODES[code];
      headers = {
        'Connection'    : 'close',
        'Content-type'  : 'text/html',
        'Content-Length': Buffer.byteLength(message),
        ...headers
      };

      socket.write(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
          Object.keys(headers)
            .map(h => `${h}: ${headers[h]}`)
            .join('\r\n') +
          '\r\n\r\n' +
          message
      );
    }

    socket.removeListener('error', this.socketOnError);
    socket.destroy();
  }
}
