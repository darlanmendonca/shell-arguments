[![Build Status](https://travis-ci.org/darlanmendonca/shell-arguments.svg)](https://travis-ci.org/darlanmendonca/shell-arguments) 
[![Coverage Status](https://coveralls.io/repos/darlanmendonca/shell-arguments/badge.svg?branch=master&service=github)](https://coveralls.io/github/darlanmendonca/shell-arguments?branch=master)
[![npm version](https://badge.fury.io/js/shell-arguments.svg)](https://badge.fury.io/js/shell-arguments)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

# shell-arguments

This module serialize the arguments passed to the npm, node, nodemon, forever, or pm2, and convert this arguments to json.

### Install
```sh
npm install --save shell-arguments
```

and in your .js file

```js
import arguments from 'shell-arguments';

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
