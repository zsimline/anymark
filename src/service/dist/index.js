"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config");
const websocket_server_1 = require("./websocket-server");
class MihanServer {
    constructor(server) {
        this.wss = null;
        const options = config.webSocketServerOpts;
        Object.defineProperty(options, 'server', { value: server });
        this.wss = new websocket_server_1.WebSocketServer(options, null);
    }
}
exports.MihanServer = MihanServer;
if (require.main === module) {
    const mihanServer = new MihanServer();
}
