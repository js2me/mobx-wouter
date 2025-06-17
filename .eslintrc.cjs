/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('./package.json');

module.exports = {
  extends: [require.resolve('js2me-eslint-config')],
  rules: {
    'import/no-unresolved': [
      'error',
      { ignore: Object.keys(packageJson.peerDependencies) },
    ],
    'sonarjs/deprecation': 'off'
  },
  overrides: [
    {
      files: [
        "*.test.ts",
        "*.test.tsx"
      ],
      rules: {
        'sonarjs/no-identical-functions': 'off',
        'sonarjs/no-nested-functions': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-this-assignment': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'sonarjs/use-type-alias': 'off',
        'sonarjs/deprecation': 'off'
      },
      parserOptions: {
        project: 'tsconfig.test.json',
      },
    }
  ]
};
