module.exports = parser;

function typeCast(value) {
  const isNumber = value !== true && !isNaN(value);
  const isFalse = value === 'false';
  const isTrue = value === 'true';

  // to number
  value = isNumber
    ? Number(value)
    : value;

  // to boolean
  value = isFalse
    ? false :
    isTrue
      ? true
      : value;

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
    const arg = value.replace(/(\"|\')/g, '');
    args[index] = arg;
  }
};

function parser(args) {
  const object = {};
  const regs = {
    flag: /--(.+)/,
    flaghWithEqual: /--(.+)=(.+)/,
    shortFlag: /-(.+)/,
  };

  args = setArgs(args);
  args.forEach(parse);

  return object;

  function parse(arg, index, array) {
    let key;
    let value = true;

    const isLongFlagWithEqual = regs.flaghWithEqual.test(arg);
    const isLongFlag = regs.flag.test(arg);
    const isShortFlag = regs.shortFlag.test(arg);
    const isValue = regs.flag.test(array[index - 1]);

    if (isLongFlagWithEqual) {
      const explode = arg.match(regs.flaghWithEqual);
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
        key.forEach(applyValue);

        function applyValue(key) {
          object[key] = value;
        }
      } else { // if has flag or value of flag
        object[key] = value;
      }
    }
  }
};
