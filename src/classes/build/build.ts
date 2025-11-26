import * as path from 'path';

import { ensureDir, removeSync, writeFileSync, writeJsonSync } from 'fs-extra';
import { concat, mergeDeepLeft, mergeWith, reduce, uniq } from 'ramda';
import { Notify } from '@opi_pib/node-utility';
import { Is } from '@opi_pib/ts-utility';
import { $RefParser } from '@apidevtools/json-schema-ref-parser';
import { NgOpenApiGen } from 'ng-openapi-gen';
import { Options } from 'ng-openapi-gen/lib/options';
import { OpenAPIObject } from 'ng-openapi-gen/lib/openapi-typings';

import { Loader } from '../loader/loader';

const customMerge = (acc: Record<string, unknown>, currentFile: Record<string, unknown>) =>
	mergeWith(
		(a, b) => {
			if (Is.array(a) && Is.array(b)) {
				return uniq(concat(a, b));
			} else if (Is.object(a) && Is.object(b)) {
				return mergeDeepLeft(a, b);
			} else {
				return b;
			}
		},
		acc,
		currentFile
	);

export class Build {
	static async spec(source: string | string[], dist: string, filename: string): Promise<void> {
		if (Array.isArray(source)) {
			const tmpFilePath = 'src/docs/index--tmp.json';

			const spec = reduce(
				(acc: any, elem: string) => {
					const currentFile = Loader.loadSource(elem);
					return currentFile != null ? customMerge(acc, currentFile) : acc;
				},
				{},
				source
			);
			writeJsonSync(tmpFilePath, spec);
			await this.generateSpec(tmpFilePath, dist, filename);

			removeSync(tmpFilePath);
		} else if (typeof source === 'string') {
			await this.generateSpec(source, dist, filename);
		}
	}

	private static async generateSpec(source: string, dist: string, filename: string): Promise<void> {
		try {
			const parser = new $RefParser();

			// Bundle: combines all $refs into one object
			const bundled = (await parser.bundle(source)) as OpenAPIObject;
			Notify.info({ message: 'OpenAPI schema is valid and bundled' });

			// Dereference: fully resolves all $refs
			const dereferenced = (await parser.dereference(source)) as OpenAPIObject;

			// Ensure the output directory exists
			ensureDir(dist);

			// Write bundled and dereferenced JSON files
			writeFileSync(path.join(dist, `${filename}.json`), JSON.stringify(bundled, null, 2));
			writeFileSync(path.join(dist, `${filename}-dereferenced.json`), JSON.stringify(dereferenced, null, 2));

			Notify.success({ message: `OpenAPI spec generated in directory: ${dist}` });
		} catch (error) {
			if (error instanceof Error) {
				Notify.error({
					message: 'OpenAPI spec generation failed',
					error
				});
			}
		}
	}

	static async typescript(source: string, dist: string, typesOnly: boolean): Promise<void> {
		removeSync(dist);
		removeSync(`${dist}$`);
		const templatePath = path.resolve(path.join(__dirname, '../../../template-overrides'));

		try {
			const options: Options = {
				input: source,
				output: dist,
				servicePrefix: 'Api',
				ignoreUnusedModels: false,
				templates: templatePath
			};

			const RefParser = new $RefParser();
			const openApi = (await RefParser.bundle(options.input, {
				dereference: { circular: false }
			})) as OpenAPIObject;

			const ngOpenGen = new NgOpenApiGen(openApi, options);
			ngOpenGen.generate();

			Notify.success({
				message: `Files generated in directory: ${dist}`
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
			path.join(dist, '/strict-http-response.ts')
		];

		unusedFiles.forEach((p) => {
			removeSync(p);
			Notify.info({ message: `Removed: ${p}` });
		});
	}
}
