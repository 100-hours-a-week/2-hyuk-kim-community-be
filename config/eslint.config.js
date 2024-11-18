const { fileURLToPath } = require('url');
const path = require('path');
const airbnb = require('eslint-config-airbnb');
const prettier = require('eslint-plugin-prettier');

module.exports = {
    extends: ['airbnb', 'plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': ['error'],
        'no-console': 'off',
    },
    ignorePatterns: [
        'node_modules/',
        'package.json',
        'package-lock.json',
        'yarn-error.json',
        'yarn.lock',
        '*.md',
        '*.log',
        'common/',
    ],
};
