// setup-tests.js

import 'react-native';
import 'jest-enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: 'https://localhost',
});
const { window } = jsdom;

function copyProps(src, target) {
	Object.defineProperties(target, {
		...Object.getOwnPropertyDescriptors(src),
		...Object.getOwnPropertyDescriptors(target),
	});
}

global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: 'node.js',
};
copyProps(window, global);

function suppressDomErrors() {
	// 리액트 네이티브여서 발생하는 경고 방지 함수
	const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser|PascalCase)/;
	// eslint-disable-next-line no-console
	const realConsoleError = console.error;
	// eslint-disable-next-line no-console
	console.error = (message) => {
		if (message.match(suppressedErrors)) {
			return;
		}
		realConsoleError(message);
	};
}
suppressDomErrors();

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });
