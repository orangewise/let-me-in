var minimist = require('minimist');
var fs = require('fs');
var join = require('path').join;

function usage () {
  return fs.readFileSync(join(__dirname, 'usage.txt'), 'utf8');
}


exports.parse = function () {
  var options = minimist(process.argv.slice(2));

  if (!options._.length) {
    console.log(usage());
  } else if (options._.length === 1 && options._[0] === 'login') {
    return options;
  } else if (options._.length === 1 && options._[0] === 'dummy' && options.q) {
    return options;
  } else {
    console.log(usage());
  }
};
