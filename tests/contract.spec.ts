/* eslint-disable @typescript-eslint/no-floating-promises */
import { strictEqual } from 'node:assert';
import { describe, test } from 'node:test';

import { NgOpenApiGen } from 'ng-openapi-gen/lib/ng-openapi-gen';
import { OpenAPIObject } from 'ng-openapi-gen/lib/openapi-typings';

import options from './contract.config.json';
import contract from './contract.json';

const gen = new NgOpenApiGen(contract as OpenAPIObject, options);
gen.generate();

describe('Generation tests using contract.json', () => {
	test('All models generated', () => {
		strictEqual(gen.models.size, 4);
	});

	describe('Dates', () => {
		const activation = gen.models.get('Dates')?.properties.at(0);
		const creation = gen.models.get('Dates')?.properties.at(1);
		const deactivation = gen.models.get('Dates')?.properties.at(2);
		const modification = gen.models.get('Dates')?.properties.at(3);

		describe('activation', () => {
			test('Has proper type', () => {
				strictEqual(activation?.type, 'IsoDateWithTimeDto | null');
			});

			test('Is optional', () => {
				strictEqual(activation?.required, false);
			});
		});

		describe('creation', () => {
			test('Has proper type', () => {
				strictEqual(creation?.type, 'IsoDateWithTimeDto');
			});

			test('Is optional', () => {
				strictEqual(creation?.required, false);
			});
		});

		describe('deactivation', () => {
			test('Has proper type', () => {
				strictEqual(deactivation?.type, 'IsoDateWithTimeDto | null');
			});

			test('Is optional', () => {
				strictEqual(deactivation?.required, false);
			});
		});

		describe('modification', () => {
			test('Has proper type', () => {
				strictEqual(modification?.type, 'IsoDateWithTimeDto');
			});

			test('Is required', () => {
				strictEqual(modification?.required, true);
			});
		});
	});

	describe('User', () => {
		describe('firstname', () => {
			test('Has proper type', () => {
				strictEqual(gen.models.get('User')?.properties.at(0)?.type, 'string | null');
			});

			test('Is optional', () => {
				strictEqual(gen.models.get('User')?.properties.at(0)?.required, false);
			});
		});

		describe('middlename', () => {
			test('Has proper type', () => {
				strictEqual(gen.models.get('User')?.properties.at(1)?.type, 'string');
			});

			test('Is optional', () => {
				strictEqual(gen.models.get('User')?.properties.at(1)?.required, false);
			});
		});

		describe('surname', () => {
			test('Has proper type', () => {
				strictEqual(gen.models.get('User')?.properties.at(2)?.type, 'string');
			});

			test('Is required', () => {
				strictEqual(gen.models.get('User')?.properties.at(2)?.required, true);
			});
		});
	});
});
