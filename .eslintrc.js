module.exports = {
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
  ],
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
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/naming-convention': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
