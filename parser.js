'use strict';

var util = require('util');

var typeCast = function(value) {
  // try cast to
  var toNumber = value !== true && !isNaN(value) ? Number(value) : value;
  var toBoolean = value === 'false' ? false : value === 'true' ? true : value;
  value = toNumber;
  value = toBoolean;

  return value;
};

var setArgs = function(args) {
  // if unit test, receive a args in string
  // then parsed this to generate a array like a process.argv
  if (typeof args === 'string') {
    args = args.split(' ');
    args.forEach(function(value, index) {
      // remove quotes
      var arg = args[index].replace(/(\"|\')/g, '');
      args[index] = arg;
    });
  }
  return args;
};

module.exports = function (args) {
  args = setArgs(args);

  var object = {};

  var regs = {
    flag: /--(.+)/,
    flaghWithEqual: /--(.+)=(.+)/,
    shortFlag: /-(.+)/
  };

  args.forEach(function(arg, index, array) {
    var key;
    var value = true;

    if (regs.flaghWithEqual.test(arg)) { // isLongFlagWithEqual
      var explode = arg.match(regs.flaghWithEqual);
      key = explode[1];
      value = explode[2];
    }
    else if (regs.flag.test(arg)) { // isLongFlag
      key = arg.replace(regs.flag, '$1');
    }
    else if (regs.shortFlag.test(arg)) { // isShortFlag
      key = arg.replace(regs.shortFlag, '$1').split('');
    }
    else if (regs.flag.test(array[index - 1])) { // isValue
      key = array[index - 1].replace(regs.flag, '$1');
      value = arg;
    }

    value = typeCast(value);

    if (key) {
      // if has array (short flags)
      if (util.isArray(key)) {
        key.forEach(function(key) {
          object[key] = value;
        });
      }
      // if has flag or value of flag
      else {
        object[key] = value;
      }
    }
  });

  return object;
};
