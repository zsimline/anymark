import { EventEmitter } from 'events';
import * as http from 'http';
import * as https from 'https';
import * as net from 'net';
import * as tls from 'tls';
import { randomBytes, createHash } from 'crypto';
import { URL } from 'url';

/**
 * Class representing a WebSocket.
 *
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param address The URL to which to connect
   * @param protocols The subprotocols
   * @param options Connection options
   */
  constructor(address: string|URL, protocols: string|string[], options: object) {
    super();
    
  
  }
}
