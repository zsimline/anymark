/**
 * @license GPLv3
 */

import * as http from 'http'

import * as config from './config'
import { WebSocketServer } from './websocket-server'


export class MihanServer {
  private wss: WebSocketServer = null

  /**
   * Create a `MihanServer` instance.
   * 
   * @param server A pre-created HTTP/S server to use
   */
  constructor(server?: http.Server) {
    const options = config.webSocketServerOpts;
    Object.defineProperty(options,
      'server', { value: server }
    );
    this.wss = new WebSocketServer(options, null);
  }
}


if (require.main === module) {
  const mihanServer = new MihanServer();
}
