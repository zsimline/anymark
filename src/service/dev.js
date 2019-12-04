const zlib = require('zlib');
const Limiter = require('async-limiter');
 
const message = { some: 'data' };
const payload = new Buffer(JSON.stringify(message));
 
// Try with different concurrency values to see how this actually
// slows significantly with higher concurrency!
//
// 5:        1398.607ms
// 10:       1375.668ms
// Infinity: 4423.300ms
//
const t = new Limiter({ concurrency: 5 });
function deflate(payload, cb) {
  t.push(function(done) {
    zlib.deflate(payload, function(err, buffer) {
      done();
      cb(err, buffer);
    });
  });
}
 
console.time('deflate');
for (let i = 0; i < 30000; ++i) {
  deflate(payload, function(err, buffer) {});
}
t.onDone(function() {
  console.timeEnd('deflate');