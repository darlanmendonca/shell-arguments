'use strict';

module.exports = parser;

function typeCast(value) {
	let isNumber = value !== true && !isNaN(value);
	let isFalse = value === 'false';
	let isTrue = value === 'true';

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
	  let arg = value.replace(/(\"|\')/g, '');
	  args[index] = arg;
	}
};


function parser(args) {
  let object = {};
  let regs = {
    flag: /--(.+)/,
    flaghWithEqual: /--(.+)=(.+)/,
    shortFlag: /-(.+)/
  };

  args = setArgs(args);
  args.forEach(parse);

  return object;

  function parse(arg, index, array) {
    let key;
    let value = true;

    let isLongFlagWithEqual = regs.flaghWithEqual.test(arg);
    let isLongFlag = regs.flag.test(arg);
    let isShortFlag = regs.shortFlag.test(arg);
    let isValue = regs.flag.test(array[index - 1]);

    if (isLongFlagWithEqual) {
      let explode = arg.match(regs.flaghWithEqual);
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
      }
      // if has flag or value of flag
      else {
        object[key] = value;
      }
    }
  }
};
