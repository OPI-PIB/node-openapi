/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Notify } from '@opi_pib/node-utility';
import { Maybe } from '@opi_pib/ts-utility';
import { readFileSync } from 'fs-extra';

export class Loader {
	static loadSource(source: string): Maybe<any> {
		let file: Maybe<any> = null;

		if (typeof source === 'string') {
			const fileAsString = this.readFile(source);

			if (typeof fileAsString === 'string') {
				file = JSON.parse(fileAsString);
			}
		}

		return file;
	}

	static readFile(source: string): Maybe<string> {
		try {
			return readFileSync(source, 'utf-8');
		} catch {
			Notify.error({
				message: `Can't read file: ${source}`
			});
		}
	}
}
