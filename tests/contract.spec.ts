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
		const activation = gen.models.get('Dates')?.properties.at(0);
		const creation = gen.models.get('Dates')?.properties.at(1);
		const deactivation = gen.models.get('Dates')?.properties.at(2);
		const modification = gen.models.get('Dates')?.properties.at(3);

		describe('activation', () => {
			it('Has proper type', () => {
				expect(activation?.type).toBe('null | IsoDateWithTimeDto');
			});

			it('Is optional', () => {
				expect(activation?.required).toBe(false);
			});
		});

		describe('creation', () => {
			it('Has proper type', () => {
				expect(creation?.type).toBe('IsoDateWithTimeDto');
			});

			it('Is optional', () => {
				expect(creation?.required).toBe(false);
			});
		});

		describe('deactivation', () => {
			it('Has proper type', () => {
				expect(deactivation?.type).toBe('null | IsoDateWithTimeDto'); // ng-openapi-gen 0.50.3: https://github.com/cyclosproject/ng-openapi-gen/issues/301
			});

			it('Is optional', () => {
				expect(deactivation?.required).toBe(false);
			});
		});

		describe('modification', () => {
			it('Has proper type', () => {
				expect(modification?.type).toBe('IsoDateWithTimeDto');
			});

			it('Is required', () => {
				expect(modification?.required).toBe(true);
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
