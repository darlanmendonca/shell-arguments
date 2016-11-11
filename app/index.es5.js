'use strict';

module.exports = parser();

function parser() {
  var args = process.argv.slice(2);
  args = require('./parser.es5.js')(args);

  return args;
}
