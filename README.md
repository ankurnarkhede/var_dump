# vardump
Implementation of PHP's var_dump function for JavaScript.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

![Version npm](https://img.shields.io/npm/v/@smartankur4u/vardump.svg?style=for-the-badge)
![NPM Downloads](https://img.shields.io/npm/dt/@smartankur4u/vardump.svg?style=for-the-badge)
![License](https://img.shields.io/npm/l/@smartankur4u/vardump.svg?style=for-the-badge)
![GitHub Repository Size](https://img.shields.io/github/repo-size/smartankur4u/vardump.svg?style=for-the-badge)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=for-the-badge)](https://standardjs.com)

[![NPM](https://nodei.co/npm/@smartankur4u/vardump.png?downloads=true&downloadRank=true)](https://nodei.co/npm/@smartankur4u/vardump/)


## Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install @smartankur4u/vardump --save-dev
```


## Usage

```js
const vardump = require('@smartankur4u/vardump')

```

Use vardump while development for printing details of variables and functions.

```js
var variable = {
  'data': {
    'stuff': [{
      'onetype': [{
        'id': 1,
        'name': 'John Doe'
      },
        {
          'id': 2,
          'name': 'Don Joeh'
        }
      ]
    }]
  }
}

// print the variable using vardump
vardump(variable)
```
This will print 

```
object(1) {
    ["data"] => object(1) {
        ["stuff"] => array(1) {
            [0] => object(1) {
                ["onetype"] => array(2) {
                    [0] => object(2) {
                        ["id"] => number(1)
                        ["name"] => string(8) "John Doe"
                    }
                    [1] => object(2) {
                        ["id"] => number(2)
                        ["name"] => string(8) "Don Joeh"
                    }
                }
            }
        }
    }
}

```
