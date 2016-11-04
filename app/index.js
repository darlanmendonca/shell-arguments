module.exports = parser();

function parser() {
  let args = process.argv.slice(2);
  args = require('./parser.es5.js')(args);

  return args;
}
