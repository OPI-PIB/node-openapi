import { NgOpenApiGen } from '../node_modules/ng-openapi-gen/lib/ng-openapi-gen';
import options from './contract.config.json';
import contract from './contract.json';

const gen = new NgOpenApiGen(contract, options);
gen.generate();

describe('Generation tests using contract.json', () => {
	it('All models generated', () => {
		expect(gen.models.size).toBe(4);
	});

	describe('Dates', () => {
		describe('activation', () => {
			it('Has proper type', () => {
				expect(gen.models.get('Dates')?.properties.at(0)?.type).toBe(
					'null | IsoDateWithTimeDto'
				);
			});

			it('Is optional', () => {
				expect(
					gen.models.get('Dates')?.properties.at(0)?.required
				).toBe(false);
			});
		});

		describe('creation', () => {
			it('Has proper type', () => {
				expect(gen.models.get('Dates')?.properties.at(1)?.type).toBe(
					'IsoDateWithTimeDto'
				);
			});

			it('Is optional', () => {
				expect(
					gen.models.get('Dates')?.properties.at(1)?.required
				).toBe(false);
			});
		});

		describe('modification', () => {
			it('Has proper type', () => {
				expect(gen.models.get('Dates')?.properties.at(2)?.type).toBe(
					'IsoDateWithTimeDto'
				);
			});

			it('Is required', () => {
				expect(
					gen.models.get('Dates')?.properties.at(2)?.required
				).toBe(true);
			});
		});
	});

	describe('User', () => {
		describe('firstname', () => {
			it('Has proper type', () => {
				expect(gen.models.get('User')?.properties.at(0)?.type).toBe(
					'null | string'
				);
			});

			it('Is optional', () => {
				expect(gen.models.get('User')?.properties.at(0)?.required).toBe(
					false
				);
			});
		});

		describe('middlename', () => {
			it('Has proper type', () => {
				expect(gen.models.get('User')?.properties.at(1)?.type).toBe(
					'string'
				);
			});

			it('Is optional', () => {
				expect(gen.models.get('User')?.properties.at(1)?.required).toBe(
					false
				);
			});
		});

		describe('surname', () => {
			it('Has proper type', () => {
				expect(gen.models.get('User')?.properties.at(2)?.type).toBe(
					'string'
				);
			});

			it('Is required', () => {
				expect(gen.models.get('User')?.properties.at(2)?.required).toBe(
					true
				);
			});
		});
	});
});
