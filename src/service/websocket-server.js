"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const http = require("http");
const crypto_1 = require("crypto");
const config_1 = require("./config");
const config = require("./config");
const keyRegex = /^[+/0-9A-Za-z]{22}==$/;
const kUsedByWebSocketServer = Symbol('kUsedByWebSocketServer');
;
class WebSocketServer extends events_1.EventEmitter {
    constructor(options, callback) {
        super();
        this.httpServer = null;
        this.events = null;
        this.opts = null;
        this.clients = null;
        const opts = Object.assign({ host: 'localhost', port: 1722, server: null, path: null, maxPayload: 100 * 1024 * 1024, perMessageDeflate: false, handleProtocols: null, verifyClient: null, backlog: null }, config.WebSocketOpts);
        this.opts = opts;
        if (!opts.port && !opts.server) {
            throw new TypeError("One of the 'port' or 'server' opts must be specified");
        }
        if (opts.port != null) {
            this.httpServer = http.createServer((req, res) => {
                const body = http.STATUS_CODES[426];
                res.writeHead(426, {
                    'Content-Length': body.length,
                    'Content-Type': 'text/plain'
                });
                res.end(body);
            });
            this.httpServer.listen(opts.port, opts.host, opts.backlog, callback);
        }
        else if (opts.server) {
            if (opts.server[kUsedByWebSocketServer]) {
                throw new Error('The HTTP/S server is already being used by another WebSocket server');
            }
            options.server[kUsedByWebSocketServer] = true;
        }
        if (this.httpServer) {
            this.events = {
                'listening': this.emit.bind(this, 'listening'),
                'error': this.emit.bind(this, 'error'),
                'upgrade': (req, socket, head) => {
                    this.handleUpgrade(req, socket, head, (ws) => {
                        this.emit('connection', ws, req);
                    });
                }
            };
            this.addListeners();
        }
    }
    addListeners() {
        for (const event of Object.keys(this.events)) {
            this.httpServer.on(event, this.events[event]);
        }
    }
    removeListeners() {
        for (const event of Object.keys(this.events)) {
            this.httpServer.removeListener(event, this.events[event]);
        }
    }
    socketOnError() {
    }
    shouldHandle(req) {
        if (this.opts.path) {
            const index = req.url.indexOf('?');
            const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
            if (pathname !== this.opts.path)
                return false;
        }
        return true;
    }
    handleUpgrade(req, socket, head, cb) {
        socket.on('error', this.socketOnError);
        const key = req.headers['sec-websocket-key'] !== undefined ?
            req.headers['sec-websocket-key'].trim()
            : false;
        const version = +req.headers['sec-websocket-version'];
        const extensions = {};
        console.log(key);
        if (req.method !== 'GET' ||
            req.headers.upgrade.toLowerCase() !== 'websocket' ||
            !key ||
            !keyRegex.test(key) ||
            (version !== 8 && version !== 13) ||
            !this.shouldHandle(req)) {
            return this.abortHandshake(socket, 400);
        }
        this.completeUpgrade(key, extensions, req, socket, head, cb);
    }
    completeUpgrade(key, extensions, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
            return socket.destroy();
        const digest = crypto_1.createHash('sha1')
            .update(key + config_1.GUID)
            .digest('base64');
        const headers = [
            'HTTP/1.1 101 Switching Protocols',
            'Connection: Upgrade',
            'Upgrade: websocket',
            `Sec-WebSocket-Accept: ${digest}`
        ];
        socket.write(headers.concat('\r\n').join('\r\n'));
        socket.removeListener('error', this.socketOnError);
        if (this.clients) {
        }
    }
    abortHandshake(socket, code, message, headers) {
        if (socket.writable) {
            message = message || http.STATUS_CODES[code];
            headers = Object.assign({ 'Connection': 'close', 'Content-type': 'text/html', 'Content-Length': Buffer.byteLength(message) }, headers);
            socket.write(`HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
                Object.keys(headers)
                    .map(h => `${h}: ${headers[h]}`)
                    .join('\r\n') +
                '\r\n\r\n' +
                message);
        }
        socket.removeListener('error', this.socketOnError);
        socket.destroy();
    }
}
const d = new WebSocketServer({
    host: '172.17.5.144',
    port: 1722
}, () => { });
