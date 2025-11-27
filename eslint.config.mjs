import { js, ts } from '@opi_pib/eslint-config-base';

const ignores = ['dist/**', 'out/**'];

/** @type {import("eslint").Linter.Config[]} */
export default [
	{
		...js,
		ignores
	},
	{
		...ts,
		ignores
	},
	{
		...ts,
		ignores,
		languageOptions: {
			...ts.languageOptions,
			parserOptions: {
				...ts.languageOptions.parserOptions,
				project: ['tsconfig.json', './tests/tsconfig.spec.json']
			}
		}
	}
];
