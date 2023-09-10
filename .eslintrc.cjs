module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent', 'sibling'],
          ['index', 'object', 'type'],
        ],
        pathGroups: [
          { pattern: 'react', group: 'builtin', position: 'before' },
          { pattern: 'components', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
