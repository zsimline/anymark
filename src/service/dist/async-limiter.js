"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AsyncLimiter {
    constructor(concurrency) {
        this.concurrency = concurrency || Infinity;
        this.pending = 0;
        this.jobs = [];
        this.cbs = [];
    }
    get length() {
        return this.pending + this.jobs.length;
    }
    push(job) {
        this.jobs.push(job);
        this.run();
    }
    unshift(job) {
        this.jobs.unshift(job);
        this.run();
    }
    onDone(cb) {
        this.cbs.push(cb);
    }
    run() {
        if (this.pending === this.concurrency) {
            return;
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
    }
    ;
}
exports.AsyncLimiter = AsyncLimiter;
