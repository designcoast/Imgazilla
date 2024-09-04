module.exports = {
  languageOptions: {
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
  },

  ignores: ['eslint.config.cjs'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
