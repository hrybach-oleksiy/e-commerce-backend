module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended', 'prettier'],

  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'no-undef': 'warn',
    'no-console': 'off',
  },
  ignorePatterns: ['.eslintrc.js', 'temp/**/*'],
};
