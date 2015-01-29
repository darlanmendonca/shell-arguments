module.exports = (function () {
  'use Strict';

  var arguments = process.argv;
  var serializedArguments = {};

  for (var i = 2; i < arguments.length; i++) {
    var arg = arguments[i];

    // if argument have operator =
    if (arg.indexOf('=') !== -1) {
      arg = arg.match(/([^=]*)=(.*)/);
      // remove --, or - from argument name
      key = arg[1].replace(/\-{1,2}/, '');
      // apply value for element, and parse to integer
      serializedArguments[key] = parseInt(arg[2]) ? parseInt(arg[2]) : arg[2];
      // or parse to boolean
      serializedArguments[key] = serializedArguments[key] == 'true' ? true : serializedArguments[key] == 'false' ? false : serializedArguments[key];
    } 

    // if argument have prefix --
    else if (arg.indexOf('--') == 0) {
      key = arg.replace(/\-{1,2}/, '');
      // if have value, apply value
      if (arguments[i+1].indexOf('-') != 0) {
        serializedArguments[key] = arguments[i+1];
      }
      // else apply true
      else {
        serializedArguments[key] = true;
      }
    }

    // if argumante have prefix -
    else if (arg.indexOf('-') == 0) {
      keys = arg.replace(/\-{1}/, '').split('');
      for (index in keys) {
        serializedArguments[keys[index]] = true;
      }
    }
  }
  
  
  return serializedArguments;

})();