import { EventEmitter } from 'events';
import * as http from 'http';
import * as https from 'https';
import * as net from 'net';
import * as tls from 'tls';
import { randomBytes, createHash } from 'crypto';
import { URL } from 'url';


import { ReadyStates } from './config'
import { BinaryTypes } from './config'


/**
 * Class representing a WebSocket Server.
 */
class WebSocketServer extends EventEmitter {
  //private binaryType: BinaryTypes;
  //private closeFrameReceived: boolean;
  //private closeFrameSent: boolean;
  //private closeMessage: string;
  //private closeTimer: null;
  //private closeCode: number;
  //private extensions: object;
  //private receiver = null;
  //private sender = null;
  private socket: net.Socket;
  
  public readyState: ReadyStates;
  public protocol: string;

  /**
   * Create a new `WebSocket`.
   *
   * @param address The URL to which to connect
   * @param protocols The subprotocols
   * @param options Connection options
   */
  constructor(address: string|URL, protocols: string|string[], options: object) {
    super();
    
    this.readyState = ReadyStates.CONNECTING;

    this.socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (Array.isArray(protocols)) {
        protocols = protocols.join(', ');
      } else if (typeof protocols === 'object' && protocols !== null) {
        options = protocols;
        protocols = undefined;
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }

  
  }
}
