var join = require('path').join;
var phantomjs = require('phantomjs-prebuilt');

module.exports = letMeIn = {};

letMeIn.getCodes = function (options) {

  var program = phantomjs.exec(
    join(__dirname, 'lib/codes.js'),
    options.username,
    options.password,
    options.url,
    options.homePage,
    options.tokenPage,
    options.qty
  );
  program.stdout.pipe(process.stdout);
  program.stderr.pipe(process.stderr);
  program.on('exit', function (code) {
    console.log('exit', code);
  });
};
