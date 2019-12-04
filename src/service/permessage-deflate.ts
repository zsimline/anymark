import * as zlib from 'zlib';
import * as Limiter from 'async-limiter';

interface PerMessageDeflateOpts {
  maxPayload?: number;
  threshold?: number;
}


/**
 * permessage-deflate implementation.
 */
class PerMessageDeflate {
  private maxPayload: number;
  private opts: object;
  private threshold: number;
  private zlibLimiter: Limiter
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} options Configuration options
   * @param {Boolean} options.serverNoContextTakeover Request/accept disabling
   *     of server context takeover
   * @param {Boolean} options.clientNoContextTakeover Advertise/acknowledge
   *     disabling of client context takeover
   * @param {(Boolean|Number)} options.serverMaxWindowBits Request/confirm the
   *     use of a custom server window size
   * @param {(Boolean|Number)} options.clientMaxWindowBits Advertise support
   *     for, or request, a custom client window size
   * @param {Object} options.zlibDeflateOptions Options to pass to zlib on deflate
   * @param {Object} options.zlibInflateOptions Options to pass to zlib on inflate
   * @param {Number} options.threshold Size (in bytes) below which messages
   *     should not be compressed
   * @param {Number} options.concurrencyLimit The number of concurrent calls to
   *     zlib
   * @param {Boolean} isServer Create the instance in either server or client
   *     mode
   * @param maxPayload The maximum allowed message length
   */
  constructor(options: PerMessageDeflate, isServer, maxPayload: number) {
    this.maxPayload = maxPayload | 0;
    this.opts = options || {};
    this.threshold = options.threshold | 1024;
    //this._isServer = !!isServer;
    //this._deflate = null;
    //this._inflate = null;
  
    //this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new Limiter({ concurrency });
    }
  }



}