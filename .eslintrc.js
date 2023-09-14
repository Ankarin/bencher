module.exports = {
    overrides: [
        {
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@next/next/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: ['./tsconfig.json'],
            },
            plugins: ['@typescript-eslint', 'prettier'],
            rules: {
                'prettier/prettier': 1,
            },
            files: ['src/**/*.ts', 'src/**/*.tsx'],
        },
        {
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: ['./tsconfig.json'],
            },
            plugins: [
                '@typescript-eslint',
                'prettier',
            ],
            rules: {
                'prettier/prettier': 'error',
            },
            files: ['e2e/**/*.spec.ts'],
        },
        {
            extends: ['eslint:recommended', 'prettier', 'esnext'],
            files: '*.mjs',
            rules: {},
        },
        {
            extends: ['prettier'],
            files: '*.js',
            rules: {},
        },
        {
            extends: ['prettier'],
            files: '*.cjs',
            rules: {},
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
    ],
    root: true,
};
