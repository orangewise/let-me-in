var join = require('path').join;
var phantomjs = require('phantomjs-prebuilt');
var username = process.argv[2];
var password = process.argv[3];
var url = process.argv[4];
var homePage = process.argv[5];
var tokenPage = process.argv[6];
var program = phantomjs.exec(join(__dirname, 'codes.js'), username, password, url, homePage, tokenPage);
program.stdout.pipe(process.stdout);
program.stderr.pipe(process.stderr);
program.on('exit', function (code) {
  console.log('exit', code);
});
