import { Serve } from '../../classes/serve/serve';
import { config } from '../../config/config';

exports.command = 'spec [port] [host] [source]';
exports.desc = 'Serve openapi spec';
exports.builder = {
	port: {
		default: config.port.spec,
	},
	host: {
		default: config.host,
	},
	source: {
		default: `${config.dist.folder}/${config.dist.fileName}.json`,
	},
};
exports.handler = (argv: any) => Serve.spec(argv.port, argv.host, argv.source);
