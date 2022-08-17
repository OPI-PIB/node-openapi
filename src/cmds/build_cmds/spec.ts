import { Build } from '../../classes/build/build';
import { config } from '../../config/config';

exports.command = 'spec [source...] [dist] [filename]';
exports.desc = 'Generate openapi spec';
exports.builder = {
	source: {
		default: config.sourceUrl,
	},
	dist: {
		default: config.dist.folder,
	},
	filename: {
		default: config.dist.fileName,
	},
};
exports.handler = (argv: any) => Build.spec(argv.source, argv.dist, argv.filename);
