import { EventEmitter } from 'events';
/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
    /**
     * Create a new `WebSocket`.
     *
     * @param address The URL to which to connect
     * @param protocols The subprotocols
     * @param options Connection options
     */
    constructor(address, protocols, options) {
        super();
    }
}
