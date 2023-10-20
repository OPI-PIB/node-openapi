import { Serve } from '../../classes/serve/serve';
import { config } from '../../config/config';

exports.command = 'editor [port] [host] [source] [basePath]';
exports.desc = 'Serve openapi spec';
exports.builder = {
	port: {
		default: config.port.editor,
	},
	host: {
		default: config.host,
	},
	source: {
		default: `${config.dist.folder}/${config.dist.fileName}.json`,
	},
	basePath: {
		default: config.basePath,
	},
};
exports.handler = (argv: any) =>
	Serve.editor(argv.port, argv.host, argv.source, argv.basePath);
