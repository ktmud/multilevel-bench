function randomString(len) {
  var alpha = '123456789qwerty{uiop[];lkjhgfds}azxcvbnm,./';
  var i = 0, s = '';
  while (len--) {
    i = (Math.round(Math.random() * 100)) % 43;
    s += alpha[i];
  }
  return s;
}

var str = {
  large : randomString(2048),
  medium : randomString(512),
  small : randomString(16)
}

module.exports.randomString = randomString;
module.exports.str = str;
