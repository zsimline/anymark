/**
 * Asynchronous limiter implementation.
 */
export class AsyncLimiter {
  private concurrency: number;
  private pending: number;
  private jobs: Array<Function>;
  private cbs: Array<Function>;
  
  /**
   * Create an `AsyncLimiter` instance.
   * 
   * @param concurrency Maximum number of concurrency
   */
  constructor(concurrency?: number) {
    this.concurrency = concurrency || Infinity;
    this.pending = 0;
    this.jobs = [];
    this.cbs = [];
  }
  
  get length() {
    return this.pending + this.jobs.length;
  }
  
  public push(job: Function) {
    this.jobs.push(job);
    this.run();
  }

  public unshift(job: Function) {
    this.jobs.unshift(job);
    this.run();
  }

  public onDone(cb: Function) {
    this.cbs.push(cb);
  }

  private run() {
    if (this.pending === this.concurrency) {
      return ;
    }
    if (this.jobs.length) {
      const job = this.jobs.shift();
      this.pending++;
      job(() => {
        this.pending--;
        this.run();
      });
    }

    if (this.pending === 0) {
      while (this.cbs.length !== 0) {
        const cb = this.cbs.pop();
        process.nextTick(cb);
      }
    }
  };
}
