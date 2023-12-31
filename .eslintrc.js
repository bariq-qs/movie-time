module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'max-len': [
      'error',
      {
        code: 1000,
      },
    ],
    semi: ['error', 'never'],
    'global-require': 'off',
    'vue/multi-word-component-names': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    'vue/setup-compiler-macros': 'off',
    'vue/no-dupe-keys': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
