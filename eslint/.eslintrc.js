module.exports = {
  env: {
    es6: true,
    
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: "module",
  },
  plugins: [],
  rules: {},
  globals: {
    "Promise": false
  }
};
