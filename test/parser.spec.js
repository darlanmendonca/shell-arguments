/* globals describe, it */
'use strict';

var assert = require('assert');
var parser = require('../parser');

describe('short flags (-f, -abc)', function() {
  it('parse to true values', function () {

    assert.deepEqual({f: true}, parser('node index.js -f'));

    assert.deepEqual({
      a: true,
      b: true,
      c: true
    }, parser('node index.js -abc'));
  });
});

describe('long flags (--test, --env production)', function() {
  it('parse to boolean values', function () {
    assert.deepEqual({test: true}, parser('node index.js --test'));

    assert.deepEqual({
      test: true,
      test2: true
    }, parser('node index.js --test true --test2'));

    assert.deepEqual({
      test: true,
      test2: true
    }, parser('node index.js --test=true --test2="true"'));

    assert.deepEqual({
      test: false,
      test2: false
    }, parser('node index.js --test=false --test2="false"'));

    assert.deepEqual({no: false}, parser('node index.js --no false'));
  });

  it('parse to number values', function () {
    assert.deepEqual({
      number: 3,
      n: 2
    }, parser('node index.js --number 3 --n 2'));

    assert.deepEqual({
      number: 3,
      n: 2
    }, parser('node index.js --number "3" --n "2"'));

    assert.deepEqual({
      number: 3,
      n: 2
    }, parser('node index.js --number="3" --n=2'));
  });

  it('parse to string values', function () {
    assert.deepEqual({
      test: 'production',
      env: 'sandbox'
    }, parser('node index.js --test production --env sandbox'));

    assert.deepEqual({
      test: 'production'
    }, parser('node index.js --test "production"'));

      assert.deepEqual({
        test: 'production'
      }, parser('node index.js --test \'production\''));

      assert.deepEqual({
        test: 'production'
      }, parser('node index.js --test=production'));
  });
});
