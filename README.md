# shell-arguments

This module serialize the arguments passed to the npm, node, or nodemon, and convert this arguments to json.

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
=> {b: true, test: false}
```
Note that the string with false value was converted to a boolean false, because this module convert primitive values.


Too accept other values, like below:
```sh
node app.js -o '/Desktop/teste' --output="/Desktop/teste"
=> {o: '/Desktop/teste', output: '/Desktop/teste'}
```

Convert primitive values
```sh
node app.js -port 8080 --numbers="2", --allow="false" --private="true"
=> {port: 8080, numbers: 2, allow: false, private: true}
```

Multiple flags with a single -, example:
```shell
node app.js -rpqs
=> {r: true, p: true, q: true, s: true}
```

Apply value with =, or space:
```shell
node app.js --output '/Desktop/test', --config="test"
=> {output: '/Desktop/test', config: 'test'
```

Enjoy!


### Tests
I use mocha for tests, first install mocha has global

```sh
npm i -g mocha
```

Then run tests with:

```sh
npm test
```
