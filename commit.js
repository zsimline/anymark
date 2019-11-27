const { spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const git = spawn('git', ['status']);
git.stdout.on('data', (data) => {
  console.log(data.toString());

  rl.question('请输入本次提交的标注: ', (answer) => {
    commit(answer);
  });  
});

const commit = function(comments) {
  spawn('git', ['add','.']);
  spawn('git', ['commit','-m',comments])
}
