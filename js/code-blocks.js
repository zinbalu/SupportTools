const fs = require('fs');
const path = require('path');
const storage = require('electron-json-storage');

const codeBlocksWithPaths = document.querySelectorAll('code[data-path]');

Array.prototype.forEach.call(codeBlocksWithPaths, function (code) {
  const codePath = path.join(__dirname, '..', code.dataset.path);
  const extension = path.extname(codePath);
  code.classList.add('language-' + extension.substring(1));
  code.textContent = fs.readFileSync(codePath);
});

document.addEventListener('DOMContentLoaded', function () {
  const highlight = require('highlight.js');
  const codeBlocks = document.querySelectorAll('pre code');
  Array.prototype.forEach.call(codeBlocks, function (code) {
    highlight.highlightBlock(code);
  })
});

storage.get('account', function (err, account) {
	if(err) return console.error(err);
	if(account.username && account.username.length) document.getElementById('account-username').value = account.username;
	if(account.password && account.password.length) document.getElementById('account-password').value = account.password;
	if(account.server 	&& account.server.length) 	document.getElementById('account-server').value   = account.server;
});