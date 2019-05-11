module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  plugins: ["react", "prettier"],
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  // globals: {
  //   Atomics: "readonly",
  //   SharedArrayBuffer: "readonly",
  //   expect: true,
  //   sinon: true,
  // },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
