const WebSocket = require('ws');
const repl = require('repl');

const print = console.log

const wss = new WebSocket.Server({ 
  host: '172.17.5.144',
  port: 1722
});

let wsc;
wss.on('connection', (ws) => {
  wsc = ws;
  print('Connected to client');
  wsc.on('message', (msg) => {
    print('\t\t\t\x1B[32m%s\x1B[0m', msg);
  });
});

repl.start({ 
  prompt: '', 
  eval: (cmd, context, filename, callback) => {
    if(cmd != '\n') {
      wsc.send(cmd);
    }
    callback(null, cmd);
  },
  writer: () => {return '\n';}
});
