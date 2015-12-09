'use strict';

module.exports = (function () {
  var args = process.argv.slice(2);
  args = require('./parser')(args);

  return args;
})();
