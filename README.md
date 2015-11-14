[![Build Status](https://travis-ci.org/darlanmendonca/shell-arguments.svg)](https://travis-ci.org/thebergamo/parsick) [![Coverage Status](https://coveralls.io/repos/darlanmendonca/shell-arguments/badge.svg?branch=master&service=github)](https://coveralls.io/github/darlanmendonca/shell-arguments?branch=master)

# shell-arguments

This module serialize the arguments passed to the npm, node, nodemon, or pm2, and convert this arguments to json.

### install
```sh
npm install --save shell-arguments
```

and in your .js file

```js
var arguments = require('shell-arguments');
console.log(arguments);
```

now, var arguments, return a object, with your data, example:

```sh
node app.js -b --test
=> {b: true, test: true}
```

If you want apply false, use
```sh
node app.js -b=false --test="false"
=> {b: false, test: false}
```
Note that the string with false value was converted to a boolean false, because this module convert primitive values.


Too accept other values, like below:
```sh
node app.js -o '/Desktop/teste' --output="/Desktop/teste"
=> {o: '/Desktop/teste', output: '/Desktop/teste'}
```

Convert primitive values
```sh
node app.js --port 8080 --numbers="2", --allow="false" --private="true"
=> {port: 8080, numbers: 2, allow: false, private: true}
```

Multiple flags with a single -, example:
```shell
node app.js -rpqs
=> {r: true, p: true, q: true, s: true}
```

Apply value with =, or space:
```shell
node app.js --output '/Desktop/test' --config="test"
=> {output: '/Desktop/test', config: 'test'}
```

Enjoy!


### Tests
I use mocha for tests, to run, first install dependencies

```sh
npm install
```

Then run tests with:

```sh
npm test
```





The MIT License (MIT)

Copyright (c) 2015 Darlan Mendonça de Almeida

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

