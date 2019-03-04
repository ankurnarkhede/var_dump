'use strict'

/**
 * Generates dump string
 * @param value
 * @param objStack
 * @param level
 * @returns {*}
 * @private
 */
function _dump (value, objStack, level) {
  let dump = typeof value

  switch (dump) {
    case 'undefined':
      return dump
    case 'boolean':
      return dump + '(' + (value ? 'true' : 'false') + ')'
    case 'number':
      return dump + '(' + value + ')'
    case 'string':
      return dump + '(' + value.length + ') "' + value + '"'
    case 'function':
      return varIsFunction(value, level)
    case 'object':
      return varIsObject(value, objStack, level)
  }
}

/**
 * Checks if the given value is a HTML element.
 * @param value
 * @returns {boolean}
 */
function isElement (value) {
  if (typeof HTMLElement === 'object') {
    return value instanceof HTMLElement
  }

  return typeof value === 'object' && value !== null && value.nodeType === 1 &&
    typeof value.nodeName === 'string'
}

/**
 * Gets indent according to level
 * @param level
 * @returns {string}
 */
function getIndent (level) {
  let str = ''
  level *= 4

  for (let i = 0; i < level; i++) {
    str += ' '
  }

  return str
}

/**
 * Generates dump for function type
 * @param func
 * @param level
 * @returns {string}
 */
function varIsFunction (func, level) {
  let name = func.name
  let args = getFuncArgs(func)
  let curIndent = getIndent(level)
  let nextIndent = getIndent(level + 1)
  let dump = 'function {\n' + nextIndent + '[name] => ' +
    (name.length === 0 ? '(anonymous)' : name)

  if (args.length > 0) {
    dump += '\n' + nextIndent + '[parameters] => {\n'
    let argsIndent = getIndent(level + 2)

    for (let i = 0; i < args.length; i++) {
      dump += argsIndent + args[i] + '\n'
    }

    dump += nextIndent + '}'
  }

  return dump + '\n' + curIndent + '}'
}

let STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg
let ARGUMENT_NAMES = /([^\s,]+)/g

/**
 * Strips comments
 * @param func
 * @returns {Array}
 */
function getFuncArgs (func) {
  let str = func.toString().replace(STRIP_COMMENTS, '')
  let result = str.slice(str.indexOf('(') + 1, str.indexOf(')')).
    match(ARGUMENT_NAMES)

  if (result === null) {
    return []
  }

  return result
}

/**
 * Generated dump for object
 * @param obj
 * @param stack
 * @param level
 * @returns {string}
 */
function varIsObject (obj, stack, level) {
  if (stack.indexOf(obj) !== -1) {
    return '*RECURSION*'
  }

  if (obj === null) {
    return 'NULL'
  }

  if (isElement(obj)) {
    return 'HTMLElement(' + obj.nodeName + ')'
  }

  let dump = null
  let length = 0
  let numericIndex = true
  stack.push(obj)

  if (Array.isArray(obj)) {
    length = obj.length
    dump = 'array(' + length + ') '
  } else {
    let name = ''

    // The object is an instance of a function
    if (obj.constructor.name !== 'Object') {
      name = ' ' + obj.constructor.name

      // Get the object properties
      let proto = {}

      for (let name in obj) {
        if (obj[name] === null || obj[name].constructor.name !== 'Function') {
          proto[name] = obj[name]
        }
      }

      obj = proto
    }

    length = Object.keys(obj).length
    dump = 'object' + name + '(' + length + ') '
    numericIndex = false
  }

  if (length === 0) {
    return dump + '{}'
  }

  let curIndent = getIndent(level)
  let nextIndent = getIndent(level + 1)

  dump += '{\n'
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      dump += nextIndent + '[' + (numericIndex ? i : '"' + i + '"') + '] => ' +
        _dump(obj[i], stack, level + 1) + '\n'
    }
  }

  return dump + curIndent + '}'
}

/**
 * Base var_dump function
 */
function var_dump () {
  for (let i = 0; i < arguments.length; i++) {
    console.log(_dump(arguments[i], [], 0))
  }
}

module.exports = var_dump
