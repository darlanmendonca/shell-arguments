'use strict';

function parser() {
  var args = process.argv.slice(2);
  args = require('./parser')(args);

  return args;
}

module.exports = parser();
