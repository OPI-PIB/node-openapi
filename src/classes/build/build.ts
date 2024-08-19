import { execSync } from 'child_process';
import * as path from 'path';

import { removeSync, writeJsonSync } from 'fs-extra';
import { concat, mergeDeepLeft, mergeWith, reduce, uniq } from 'ramda';
import { Notify } from '@opi_pib/node-utility';

import { Loader } from '../loader/loader';
import { Is } from '@opi_pib/ts-utility';

const customMerge = (acc: any, currentFile: any) =>
	mergeWith(
		(a, b) => {
			if (Is.array(a) && Is.array(b)) {
				return uniq(concat(a, b)); // Merge arrays by concatenating and removing duplicates
			} else if (Is.object(a) && Is.object(b)) {
				return mergeDeepLeft(a, b); // Default deep merge for objects
			} else {
				return b; // Fallback for non-objects/arrays
			}
		},
		acc,
		currentFile
	);

export class Build {
	static spec(
		source: string | string[],
		dist: string,
		filename: string
	): void {
		if (Array.isArray(source)) {
			const tmpFilePath = 'src/docs/index--tmp.json';

			const spec = reduce(
				(acc: any, elem: string) => {
					const currentFile = Loader.loadSource(elem);
					return currentFile != null
						? customMerge(acc, currentFile)
						: acc;
				},
				{},
				source
			);
			writeJsonSync(tmpFilePath, spec);
			this.generateSpec(tmpFilePath, dist, filename);

			removeSync(tmpFilePath);
		} else if (typeof source === 'string') {
			this.generateSpec(source, dist, filename);
		}
	}

	private static generateSpec(
		source: string,
		dist: string,
		filename: string
	): void {
		let isSpecValid = false;

		try {
			execSync(`swagger-cli validate ${source}`);
			Notify.info({ message: 'Openapi schema valid' });
			isSpecValid = true;
		} catch (error) {
			if (error instanceof Error) {
				Notify.error({
					message: 'Openapi schema validation failed',
					error,
				});
			}
		}

		if (isSpecValid) {
			try {
				execSync(
					`swagger-cli bundle -o ${dist}/${filename}.json ${source}`
				);
				execSync(
					`swagger-cli bundle -r -o ${dist}/${filename}-dereferenced.json ${source}`
				);
				Notify.success({
					message: `Openapi spec generated in directory: ${dist}`,
				});
			} catch (error) {
				if (error instanceof Error) {
					Notify.error({
						message: 'Openapi spec generation error',
						error,
					});
				}
			}
		}
	}

	static typescript(source: string, dist: string, typesOnly: boolean): void {
		removeSync(dist);
		removeSync(`${dist}$`);
		const configPath = path.resolve(
			path.join(__dirname, '../../../ng-openapi-gen.json')
		);
		const templatePath = path.resolve(
			path.join(__dirname, '../../../template-overrides')
		);

		try {
			execSync(
				`ng-openapi-gen --input ${source} --output ${dist} --config ${configPath} --templates ${templatePath}`
			);

			Notify.success({
				message: `Files generated in directory: ${dist}`,
			});

			if (typesOnly === true) {
				this.removeUnusedFiles(dist);
			}
		} catch (error) {
			if (error instanceof Error) {
				Notify.error({ message: 'Generation error', error });
			}
		}

		removeSync(`${dist}$`);
	}

	private static removeUnusedFiles(dist: string): void {
		const unusedFiles = [
			path.join(dist, '/fn'),
			path.join(dist, '/services'),
			path.join(dist, '/api.module.ts'),
			path.join(dist, '/api-configuration.ts'),
			path.join(dist, '/base-service.ts'),
			path.join(dist, '/request-builder.ts'),
			path.join(dist, '/services.ts'),
			path.join(dist, '/strict-http-response.ts'),
		];

		unusedFiles.forEach((p) => {
			removeSync(p);
			Notify.info({ message: `Removed: ${p}` });
		});
	}
}
