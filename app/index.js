module.exports = parser();

function parser() {
  const args = process.argv.slice(2);
  args = require('./parser.es5.js')(args);

  return args;
}
