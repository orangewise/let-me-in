var minimist = require('minimist');
var fs = require('fs');
var join = require('path').join;

function usage () {
  return fs.readFileSync(join(__dirname, 'usage.txt'), 'utf8');
}


exports.parse = function () {
  // console.log(usage());
  var options = minimist(process.argv.slice(2));
  // console.log('options', options);

  return options;
}
