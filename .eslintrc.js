module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ["react", "prettier", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
    "plugin:jest/recommended",
  ],
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
    "jest/no-large-snapshots": ["error", { maxSize: 50 }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
