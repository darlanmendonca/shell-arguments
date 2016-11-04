'use strict';

module.exports = parser;

function typeCast(value) {
  var isNumber = value !== true && !isNaN(value);
  var isFalse = value === 'false';
  var isTrue = value === 'true';

  // to number
  value = isNumber ? Number(value) : value;

  // to boolean
  value = isFalse ? false : isTrue ? true : value;

  return value;
};

function setArgs(args) {
  // if unit test, receive a args in string
  // then parsed this to generate a array like a process.argv
  if (typeof args === 'string') {
    args = args.split(' ');
    args.forEach(removeQuotes);
  }

  return args;

  function removeQuotes(value, index) {
    var arg = value.replace(/(\"|\')/g, '');
    args[index] = arg;
  }
};

function parser(args) {
  var object = {};
  var regs = {
    flag: /--(.+)/,
    flaghWithEqual: /--(.+)=(.+)/,
    shortFlag: /-(.+)/
  };

  args = setArgs(args);
  args.forEach(parse);

  return object;

  function parse(arg, index, array) {
    var key = void 0;
    var value = true;

    var isLongFlagWithEqual = regs.flaghWithEqual.test(arg);
    var isLongFlag = regs.flag.test(arg);
    var isShortFlag = regs.shortFlag.test(arg);
    var isValue = regs.flag.test(array[index - 1]);

    if (isLongFlagWithEqual) {
      var explode = arg.match(regs.flaghWithEqual);
      key = explode[1];
      value = explode[2];
    } else if (isLongFlag) {
      key = arg.replace(regs.flag, '$1');
    } else if (isShortFlag) {
      key = arg.replace(regs.shortFlag, '$1').split('');
    } else if (isValue) {
      key = array[index - 1].replace(regs.flag, '$1');
      value = arg;
    }

    value = typeCast(value);

    if (key) {
      // if has array (short flags)
      if (Array.isArray(key)) {
        var applyValue = function applyValue(key) {
          object[key] = value;
        };

        key.forEach(applyValue);
      } else {
        // if has flag or value of flag
        object[key] = value;
      }
    }
  }
};
