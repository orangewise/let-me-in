var Readable = require('stream').Readable;

exports.codes = function (options) {
  var rs = new Readable;
  var n = 0;
  if (n === 0) {
    rs.push('[');
  }
  while (n < options.qty) {
    rs.push(JSON.stringify({qty: n}));
    if (n < options.qty-1) {
      rs.push(',');
    }
    n++;
  }
  if (n === options.qty) {
    rs.push(']\n');
  }
  rs.push(null);
  if (options.stdout) rs.pipe(process.stdout);
  return rs;
};
