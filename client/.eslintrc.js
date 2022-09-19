module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-floating-promises': 'error',
    quotes: [1, 'single', 'avoid-escape'],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: []
      }
    ]
  }
}
