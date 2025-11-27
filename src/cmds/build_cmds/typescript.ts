/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as path from 'path';

import { Build } from '../../classes/build/build';
import { config } from '../../config/config';

exports.command = 'typescript [source] [dist] [typesOnly]';
exports.alias = 'ts';
exports.desc = 'Generate typescript models';
exports.builder = {
	source: {
		default: `${config.host}:${config.port.spec}`
	},
	dist: {
		default: config.typescript.dist
	},
	typesOnly: {
		default: config.typescript.typesOnly
	},
	services: {
		default: config.typescript.services
	},
	promises: {
		default: config.typescript.promises
	}
};
exports.handler = (argv: any) => {
	const source = /^https?:\/\//.test(argv.source) ? argv.source : path.resolve(path.join(process.cwd(), argv.source));
	const dist = path.resolve(path.join(process.cwd(), argv.dist));
	Build.typescript(source, dist, argv.typesOnly !== 'false', argv.services === 'true', argv.promises === 'true');
};
