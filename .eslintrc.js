module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'error',
    'linebreak-style': 'off',
  },
};
