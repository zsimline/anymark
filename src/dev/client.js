const WebSocket = require('ws');
const repl = require('repl');

const print = console.log

const wsc = new WebSocket('ws://47.112.4.204:1722'); 

wsc.on('open', () => {
  print('Connected to server');
});
wsc.on('message', (msg) => {
  print('\t\t\t\x1B[31m%s\x1B[0m', msg);
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
