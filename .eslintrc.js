module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:security/recommended",
    "plugin:prettier/recommended",
  ],

  plugins: ["perfectionist", "security"],

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },

  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
      },
    ],

    // any 사용 허용
    "@typescript-eslint/no-explicit-any": "off",

    "no-unused-vars": "off",

    "perfectionist/sort-imports": "off",

    "import/no-unresolved": "error",
    "import/no-cycle": "error",

    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-implied-eval": "error",
  },
};
