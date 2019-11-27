#!/usr/bin/env node

const readline = require('readline');
const { spawnSync } = require('child_process');

const print = function(buffer) {
  console.log(buffer[1].toString())
}

const run = function() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // 查询状态
  const gitStatus = spawnSync('git', ['status']);
  print(gitStatus.output);
  
  rl.question('请输入本次提交的标注: ', (answer) => {
    commit(answer);
  });
}

const commit = function(comments) {
  // 暂存提交
  const gitAdd = spawnSync('git', ['add','.']);
  print(gitAdd.output);
  
  // 本地提交
  const gitCommit = spawnSync('git', ['commit','-m',comments]);
  print(gitCommit.output);

  // gitPush
  const gitPush = spawnSync('git', ['push','origin','master']);
  print(gitPush.output);
}

run();