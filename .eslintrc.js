module.exports = {
  plugins: [
    'react-hooks',
  ],
  extends: ['airbnb', 'airbnb-typescript'],
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  globals: {
    __inline: true,
    IS_SERVER: true,
    __uri: true,
    plug: true,
    Browser: true,
    define: true,
    browser: true,
    global: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'linebreak-style': 0,
    '@typescript-eslint/naming-convention': 0,
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
    }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
