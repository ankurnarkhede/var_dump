const STRIP_COMMENTS =
  /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

/**
 * Gets indent according to level
 * @param level
 * @returns {string}
 */
function getIndent(level) {
  let str = "";
  const indentLevel = level * 4;

  for (let i = 0; i < indentLevel; i += 1) {
    str += " ";
  }

  return str;
}

/**
 * Strips comments
 * @param func
 * @returns {Array}
 */
function getFuncArgs(func) {
  const str = func.toString().replace(STRIP_COMMENTS, "");
  const result = str
    .slice(str.indexOf("(") + 1, str.indexOf(")"))
    .match(ARGUMENT_NAMES);

  if (result === null) {
    return [];
  }

  return result;
}

/**
 * Generates dump for function type
 * @param func
 * @param level
 * @returns {string}
 */
function varIsFunction(func, level) {
  const { name } = func;
  const args = getFuncArgs(func);
  const curIndent = getIndent(level);
  const nextIndent = getIndent(level + 1);
  let dump = `function {\n${nextIndent}[name] => ${
    name.length === 0 ? "(anonymous)" : name
  }`;

  if (args.length > 0) {
    dump += `\n${nextIndent}[parameters] => {\n`;
    const argsIndent = getIndent(level + 2);

    for (let i = 0; i < args.length; i += 1) {
      dump += `${argsIndent + args[i]}\n`;
    }

    dump += `${nextIndent}}`;
  }

  return `${dump}\n${curIndent}}`;
}

/**
 * Checks if the given value is a HTML element.
 * @param value
 * @returns {boolean}
 */
function isElement(value) {
  if (typeof HTMLElement === "object") {
    // eslint-disable-next-line no-undef
    return value instanceof HTMLElement;
  }

  return (
    typeof value === "object" &&
    value !== null &&
    value.nodeType === 1 &&
    typeof value.nodeName === "string"
  );
}

/**
 * Generates dump string
 * @param value
 * @param objStack
 * @param level
 * @returns {*}
 * @private
 */
function dumpValues(value, objStack, level) {
  const dump = typeof value;

  switch (dump) {
    case "undefined":
      return dump;
    case "boolean":
      return `${dump}(${value ? "true" : "false"})`;
    case "number":
      return `${dump}(${value})`;
    case "string":
      return `${dump}(${value.length}) "${value}"`;
    case "function":
      return varIsFunction(value, level);
    case "object":
      // eslint-disable-next-line no-use-before-define
      return varIsObject(value, objStack, level);
    default:
      return dump;
  }
}

/**
 * Generated dump for object
 * @param obj
 * @param stack
 * @param level
 * @returns {string}
 */
function varIsObject(obj, stack, level) {
  if (stack.indexOf(obj) !== -1) {
    return "*RECURSION*";
  }

  if (obj === null) {
    return "NULL";
  }

  if (isElement(obj)) {
    return `HTMLElement(${obj.nodeName})`;
  }

  let dump = null;
  let length = 0;
  let numericIndex = true;
  stack.push(obj);

  if (Array.isArray(obj)) {
    length = obj.length;
    dump = `array(${length}) `;
  } else {
    let name = "";

    // The object is an instance of a function
    if (obj.constructor.name !== "Object") {
      name = ` ${obj.constructor.name}`;

      // Get the object properties
      const proto = {};

      // eslint-disable-next-line no-restricted-syntax,no-shadow
      for (const name in obj) {
        if (obj[name] === null || obj[name].constructor.name !== "Function") {
          proto[name] = obj[name];
        }
      }

      // eslint-disable-next-line no-param-reassign
      obj = proto;
    }

    length = Object.keys(obj).length;
    dump = `object${name}(${length}) `;
    numericIndex = false;
  }

  if (length === 0) {
    return `${dump}{}`;
  }

  const curIndent = getIndent(level);
  const nextIndent = getIndent(level + 1);

  dump += "{\n";
  // eslint-disable-next-line no-restricted-syntax
  for (const i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(i)) {
      dump += `${nextIndent}[${numericIndex ? i : `"${i}"`}] => ${dumpValues(
        obj[i],
        stack,
        level + 1
      )}\n`;
    }
  }

  return `${dump + curIndent}}`;
}

/**
 * Base var_dump function
 */
// eslint-disable-next-line camelcase
function var_dump() {
  for (let i = 0; i < arguments.length; i += 1) {
    // eslint-disable-next-line prefer-rest-params
    console.log(dumpValues(arguments[i], [], 0));
  }
}

// eslint-disable-next-line camelcase
module.exports = var_dump;
