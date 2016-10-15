var join = require('path').join;
var phantomjs = require('phantomjs-prebuilt');
var dummy = require('./lib/dummy');

module.exports = letMeIn = {};

letMeIn.getCodes = function (options) {

  // console.log('letMeIn.getCodes', options);
  if (options.action === 'login') {
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
    // console.log('exit', code);
    });
    return program;
  } else if (options.action === 'dummy') {
    return dummy.codes(options);
  }
};
