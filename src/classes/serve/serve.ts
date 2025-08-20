import { Notify } from '@opi_pib/node-utility';
import express from 'express';
import * as swaggerUi from 'swagger-ui-express';

import { Loader } from '../loader/loader';

export class Serve {
	static editor(
		port: string,
		host: string,
		source: string,
		basePath: string
	): void {
		const file = Loader.loadSource(source);

		if (file != null) {
			const app = express();

			app.use(basePath, swaggerUi.serve, swaggerUi.setup(file));

			const server = app.listen(port, () =>
				Notify.info({
					message: `Listening on: ${host}:${port}${basePath}`,
				})
			);

			server.on('error', (err: any) => {
				if (err.code === 'EADDRINUSE') {
					console.error(`Port ${port} is busy`);
				} else {
					throw err;
				}
			});

			const shutdown = () => {
				server.close(() => {
					console.log('Server stopped, port freed.');
					process.exit(0);
				});
			};

			process.on('SIGINT', shutdown); // Ctrl+C
			process.on('SIGTERM', shutdown); // kill
			process.on('exit', shutdown);
		}
	}

	static spec(port: string, host: string, source: string): void {
		const file = Loader.loadSource(source);

		if (file != null) {
			const app = express();

			const server = app.listen(port, () =>
				Notify.info({
					message: `Listening on: ${host}:${port}`,
				})
			);

			app.get('/', (req, res) => {
				res.send(file);
			});

			server.on('error', (err: any) => {
				if (err.code === 'EADDRINUSE') {
					console.error(`Port ${port} is busy`);
				} else {
					throw err;
				}
			});

			const shutdown = () => {
				server.close(() => {
					console.log('Server stopped, port freed.');
					process.exit(0);
				});
			};

			process.on('SIGINT', shutdown); // Ctrl+C
			process.on('SIGTERM', shutdown); // kill
			process.on('exit', shutdown);
		}
	}
}
