module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended', 'google',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 'off',
    'max-len': 'off',
    'require-jsdoc': 'off',
  },
  globals: {
    Promise: true,
    r: true,
    user: true,
    sqlUtil: true,
    config: true,
  },
};
