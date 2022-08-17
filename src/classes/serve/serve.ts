import { Notify } from '@opi-pib/node-utility';
import express from 'express';
import * as swaggerUi from 'swagger-ui-express';

import { Loader } from '../loader/loader';

export class Serve {
	static editor(port: string, host: string, source: string, basePath: string): void {
		const file = Loader.loadSource(source);

		if (file != null) {
			const app = express();

			app.use(basePath, swaggerUi.serve, swaggerUi.setup(file));

			app.listen(port, () => Notify.info({
				message: `Listening on: ${host}:${port}${basePath}`,
			}));
		}
	}

	static spec(port: string, host: string, source: string): void {
		const file = Loader.loadSource(source);

		if (file != null) {
			const app = express();

			app.listen(port, () => Notify.info({
				message: `Listening on: ${host}:${port}`,
			}));

			app.get('/', (req, res) => {
				res.send(file);
			});
		}
	}
}
