/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2019,
    sourceType: "module",
  },
  extends: [
    "problems",
    "problems/node10",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard",
  ],
  plugins: ["prettier", "react"],
  rules: {
    // Enable prettier
    "prettier/prettier": "error",

    // We're not creating PropTypes anywhere so don't both checking for them
    "react/prop-types": "off",

    // This should be suggested but not required as it will prevent us from
    // using anon render functions
    "react/display-name": "off",

    // The default for this rule requires that we define typedefs before we use
    // them, which is silly because that can't cause a bug because typedefs are
    // stripped from the transpiled code.
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, typedefs: false, variables: true },
    ],

    // Remove stylistic rules recommended by @typescript-eslint because they
    // don't actually catch any bugs
    // @see https://github.com/typescript-eslint/typescript-eslint/issues/651
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/class-name-casing": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/type-annotation-spacing": "off",
  },
  overrides: [
    {
      files: ["**/*.story.*", ".storybook/**", "stories/**"],
      env: {
        node: true,
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
