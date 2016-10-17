var d = require('debug')('dummy.js');
var Readable = require('stream').Readable;

var randomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var generateUUID = function () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
};

exports.codes = function (options) {
  d(options.qty);
  var rs = new Readable;
  var n = 0;
  if (n === 0) {
    rs.push('[');
  }
  while (n < options.qty) {
    rs.push(JSON.stringify({
      code: randomString(30),
      scope: 'openid profile',
      state: generateUUID()
    }));
    if (n < options.qty-1) {
      rs.push(',');
    }
    n++;
  }
  // Use ==, not === so closing bracket is also added when options.qty equals true.
  if (n == options.qty) {
    rs.push(']\n');
  }
  rs.push(null);
  if (options.stdout) rs.pipe(process.stdout);
  return rs;
};
