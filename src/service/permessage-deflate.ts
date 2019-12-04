import * as zlib from 'zlib';

import { AsyncLimiter } from './async-limiter';

export interface PerMessageDeflateOpts {
  maxPayload?: number;
  threshold?: number;
  serverNoContextTakeover?: boolean;
  clientNoContextTakeover?: boolean
  serverMaxWindowBits?: boolean;
  clientMaxWindowBits?: boolean;
}

/**
 * permessage-deflate implementation.
 */
export class PerMessageDeflate {
  private maxPayload: number;
  private opts: PerMessageDeflateOpts;
  private threshold: number;
  private zlibLimiter: AsyncLimiter;
  private concurrency: number;


  /**
   * Creates a `PerMessageDeflate` instance.
   *
   * @param options Configuration options
   * `options.serverNoContextTakeover` Request/accept disabling of server context takeover
   * `options.clientNoContextTakeover` Advertise/acknowledge disabling of client context takeover
   * `options.serverMaxWindowBits` Request/confirm the use of a custom server window size
   * `options.clientMaxWindowBits` Advertise support for, or request, a custom client window size
   * `options.zlibDeflateOptions` Options to pass to zlib on deflate
   * `options.zlibInflateOptions` Options to pass to zlib on inflate
   * `options.threshold` Size (in bytes) below which messages should not be compressed
   * `options.concurrency` The number of concurrent calls to zlib
   * `options.maxPayload` The maximum allowed message length
   */
  constructor(options: PerMessageDeflate, maxPayload: number) {
    this.maxPayload = maxPayload | 0;
    this.opts = {
      maxPayload: 0,
      threshold: 1024,
      serverNoContextTakeover: false,
      clientNoContextTakeover: false,
      serverMaxWindowBits: false,
      clientMaxWindowBits: false,
      ...options
    };

    this.threshold = options.threshold | 1024;
    //this._deflate = null;
    //this._inflate = null;
    //this.params = null;
    const concurrency = options.concurrency || 10;
    this.zlibLimiter = new AsyncLimiter(concurrency);
  }

  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   */
  public offer() {
    const params = {
      server_no_context_takeover: false,
      client_no_context_takeover: false,
      server_max_window_bits: false,
      client_max_window_bits: false,
    };

    if (this.opts.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this.opts.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this.opts.serverMaxWindowBits) {
      params.server_max_window_bits = this.opts.serverMaxWindowBits;
    }
    if (this.opts.clientMaxWindowBits) {
      params.client_max_window_bits = this.opts.clientMaxWindowBits;
    } else if (this.opts.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param configurations The extension negotiation offers/reponse
   */
  public accept(configurations: Array<string>) {
    configurations = this.normalizeParams(configurations);
    const params = this.acceptAsServer(configurations);
    return params;
  }


  /**
   * Normalize parameters.
   *
   * @param configurations The extension negotiation offers/reponse
   * @return The offers/response with normalized parameters
   */
  private normalizeParams(configurations: Array<any>) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];
        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          }
        } else if ( key === 'client_no_context_takeover') {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   */
  private acceptAsServer(offers) {
    const opts = this.opts;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }



}