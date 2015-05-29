module.exports = (function () {
  'use Strict';

  var arguments = process.argv.slice(2);
  var jsonArguments = {};

  var regs = {
    flag: /--(.+)/,
    shortFlag: /-(.+)/
  };

  arguments.forEach(function(arg, index, array) {
    var key;
    var value = true;

    // has flag
    if (regs.flag.test(arg)) {
      key = arg.replace(regs.flag, '$1');
    } 
    // has short flag
    else if (regs.shortFlag.test(arg)) {
      key = arg.replace(regs.shortFlag, '$1').split('');
    } 
    // has value
    else if (regs.flag.test(array[index - 1])) {
      key = array[index - 1].replace(regs.flag, '$1');
      value = arg;
    }


    // type cast to primitive values

    if (key && value) {
      // if has array (short flags)
      if (typeof key === 'object' && key.length) {
        key.forEach(function(key) {
          jsonArguments[key] = value;
        });
      } 
      // if has flag or value of flag
      else {
        jsonArguments[key] = value;
      }
    }
  });
  
  console.log(jsonArguments);
  // return jsonArguments;

})();