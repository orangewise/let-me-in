var join = require('path').join;
var phantomjs = require('phantomjs-prebuilt');
var url = process.argv[2];
var program = phantomjs.exec(join(__dirname, 'codes.js'), url);
program.stdout.pipe(process.stdout);
program.stderr.pipe(process.stderr);
program.on('exit', function (code) {
  console.log('exit', code);
});
