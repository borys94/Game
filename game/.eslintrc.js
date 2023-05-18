module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
  ],
  overrides: [
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    'react',
    "@typescript-eslint",
  ],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-confusing-void-expression': 0,
    '@typescript-eslint/no-for-in-array': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/explicit-function-return-type': 0
  }
}
