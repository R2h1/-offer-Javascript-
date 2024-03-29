module.exports = {
  plugins: [
    'react-hooks'
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    createDefaultProgram: true
  },
  globals: {
    __inline: true,
    IS_SERVER: true,
    __uri: true,
    plug: true,
    Browser: true,
    define: true,
    browser: true,
    global: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'quotes': [1, 'single'],
    '@typescript-eslint/naming-convention': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'complexity': ['error', 10],
    'comma-dangle': ['error', 'never']
  }
};
