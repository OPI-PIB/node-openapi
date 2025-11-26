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
	}
];
