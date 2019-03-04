# var_dump
Implementation of PHP's var_dump function for JavaScript.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

![Version npm](https://img.shields.io/npm/v/var_dump.svg?style=for-the-badge)
![NPM Downloads](https://img.shields.io/npm/dt/var_dump.svg?style=for-the-badge)
![License](https://img.shields.io/npm/l/var_dump.svg?style=for-the-badge)
![GitHub Repository Size](https://img.shields.io/github/repo-size/smartankur4u/var_dump.svg?style=for-the-badge)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=for-the-badge)](https://standardjs.com)

[![NPM](https://nodei.co/npm/var_dump.png?downloads=true&downloadRank=true)](https://nodei.co/npm/var_dump/)


## Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install var_dump --save-dev
```


## Usage

```js
const var_dump = require('var_dump')

```

Use var_dump while development for printing details of variables and functions.

```js
var variable = {
  'data': {
    'users': {
      'id': 12,
      'friends': [{
        'id': 1,
        'name': 'John Doe'
      }]
    }
  }
}

// print the variable using var_dump
var_dump(variable)
```

This will print:

```js
object(1) {
    ["data"] => object(1) {
        ["users"] => object(2) {
            ["id"] => number(12)
            ["friends"] => array(1) {
                [0] => object(2) {
                    ["id"] => number(1)
                    ["name"] => string(8) "John Doe"
                }
            }
        }
    }
}

```
