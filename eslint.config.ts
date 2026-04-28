import globals from 'globals';
import cypress from 'eslint-plugin-cypress';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

// The package exposes this flat config as an array at runtime, but its
// TypeScript type is wider, so VS Code needs this narrow cast for spreading.
const typescriptRecommendedConfigs = tsPlugin.configs['flat/recommended'] as unknown as Record<
  string,
  unknown
>[];

export default [
  {
    ignores: [
      'cypress/downloads/**',
      'cypress/reports/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
    ],
  },
  ...typescriptRecommendedConfigs,
  {
    files: ['cypress/**/*.{ts,tsx,js,jsx}'],
    plugins: { cypress, '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        ...globals.chai,
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      'cypress/assertion-before-screenshot': 'error',
      'cypress/no-debug': 'error',
      'cypress/no-force': 'error',
      'cypress/no-pause': 'error',
      'cypress/no-unnecessary-waiting': 'error',
    },
  },
];
