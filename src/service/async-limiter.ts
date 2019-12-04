export class AsyncLimiter {
  private concurrency: number;
  private pending: number;
  private jobs: Array<Function>;
  private cbs: Array<Function>;
  
  constructor(concurrency?: number) {
    this.concurrency = concurrency | Infinity;
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
    this.run();
  };

  private run() {
    if (this.pending === this.concurrency) {
      return ;
    }
    if (this.jobs.length) {
      const job = this.jobs.shift();
      this.pending++;
      
      new Promise(resolve => {
        job();
        resolve();
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        this.pending--;
        this.run();
      })

      this.run();
    }

    if (this.pending === 0) {
      while (this.cbs.length !== 0) {
        const cb = this.cbs.pop();
        process.nextTick(cb);
      }
    }
  };
}
