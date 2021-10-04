/**
 * Eslint config file.
 */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    "airbnb-base",
    "plugin:mocha/recommended",
    "plugin:security/recommended",
    "prettier",
  ],
  plugins: ["mocha", "security", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  globals: {
    config: "readonly", // Add globals as 'readonly' or 'writable' as applicable
    logger: "readonly",
  },
  rules: {
    // Custom eslint rules
    "no-trailing-spaces": "error",
    "consistent-return": "error",

    // Allow console for the project
    // "no-console": "error",

    // Custom mocha rules
    "mocha/no-skipped-tests": "error",
    "mocha/no-exclusive-tests": "error",

    // Prettier rules
    "prettier/prettier": "error",
  },
  ignorePatterns: ["public/*"],
};
