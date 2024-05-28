module.exports = {
  // Other configurations...
  rules: {
    // Other rules...
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
};
