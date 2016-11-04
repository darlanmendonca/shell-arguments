let expect = require('chai').expect;
let parser = require('./parser.es5.js');

describe('parser - unit tests', function() {
  describe('short flags (-f, -abc)', shortFlags);
  describe('long flags (--test, --env production)', longFlags);
});

function shortFlags() {
  it('parse to true values', function () {
    expect(parser('node index.js -f'))
    .to.deep.equal({f: true});

    expect(parser('node index.js -abc'))
    .to.deep.equal({
      a: true,
      b: true,
      c: true,
    });
  });
}

function longFlags() {
  it('parse to boolean values', function () {
    expect(parser('node index.js --test'))
    .to.deep.equal({test: true});

    expect(parser('node index.js --test true --test2'))
    .to.deep.equal({
      test: true,
      test2: true,
    });

    expect(parser('node index.js --test=true --test2="true"'))
    .to.deep.equal({
      test: true,
      test2: true,
    });

    expect(parser('node index.js --test=false --test2="false"'))
    .to.deep.equal({
      test: false,
      test2: false,
    });

    expect(parser('node index.js --no false'))
    .to.deep.equal({no: false});
  });

  it('parse to number values', function () {
    expect(parser('node index.js --number 3 --n 2'))
    .to.deep.equal({
      number: 3,
      n: 2,
    });

    expect(parser('node index.js --number "3" --n "2"'))
    .to.deep.equal({
      number: 3,
      n: 2,
    });

    expect(parser('node index.js --number="3" --n=2'))
    .to.deep.equal({
      number: 3,
      n: 2,
    });
  });

  it('parse to string values', function () {
    expect(parser('node index.js --test production --env sandbox'))
    .to.deep.equal({
      test: 'production',
      env: 'sandbox',
    });

    expect(parser('node index.js --test "production"'))
    .to.deep.equal({
      test: 'production',
    });

    expect(parser('node index.js --test \'production\''))
    .to.deep.equal({
      test: 'production',
    });

    expect(parser('node index.js --test=production'))
    .to.deep.equal({
      test: 'production',
    });
  });
}
