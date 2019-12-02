const http = require('http')

httpServer = http.createServer((req, res) => {
  const body = http.STATUS_CODES[426];
  console.log(req.headers);

  res.writeHead(426, {
    'Content-Length': body.length,
    'Content-Type': 'text/plain'
  });
  res.end(body);
});

httpServer.listen(1722, '172.17.5.144');
