import 'reflect-metadata';
import '../../src/ioc/inversify.config';

import { expect } from 'chai';

import { FunctionParser } from '../../src/parsers/function.parser';

describe('FunctionParser', () => {

	const componentFilename: string = 'test.component.ts';

	let parser: FunctionParser;

	beforeEach(() => {
		parser = new FunctionParser();
	});


	it('should extract strings using marker function', () => {
		const contents = `
			import { marker } from '@ebottacin/ngx-translate-extract-marker';
			marker('Hello world');
			marker(['I', 'am', 'extracted']);
			otherFunction('But I am not');
			marker(message || 'binary expression');
			marker(message ? message : 'conditional operator');
			marker('FOO.bar');
		`;
		const keys = parser.extract(contents, componentFilename).keys();
		expect(keys).to.deep.equal(['Hello world', 'I', 'am', 'extracted', 'binary expression', 'conditional operator', 'FOO.bar']);
	});

});
