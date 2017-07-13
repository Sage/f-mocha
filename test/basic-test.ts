import { assert } from 'chai';
import { wait } from 'f-promise';
import { setup } from '..';

setup();

describe('basic test', () => {
	it('sync works', () => {
		assert(true, 'got true');
	});
	it('async works like sync', () => {
		assert(true, 'got true before wait');
		wait<void>(cb => setTimeout(cb, 0));
		assert(true, 'got true after wait');
	});
	it.skip('skip', () => {
		assert(true, 'not executed because of skip');
	});
});

describe('basic test on before', () => {
	describe('sync test', () => {
		let expected: boolean;
		before('init expected value', () => {
			expected = true;
		});

		it('check expected value set in before', () => {
			assert(expected, 'got expected value set in before');
			expected = false;
		});

		it('check expected value set in before but changed in previous it', () => {
			assert(!expected, 'got expected value set in before');
		});
	});
	describe('async test', () => {
		let expected: boolean;
		before('init expected value', () => {
			assert(true, 'got false before wait');
			wait<void>(cb => setTimeout(cb, 0));
			assert(true, 'got true after wait');
			expected = true;
		});

		it('check expected value set in before', () => {
			assert(expected, 'got expected value set in before');
			expected = false;
		});

		it('check expected value set in before but changed in previous it', () => {
			assert(!expected, 'got expected value set in before');
		});
	});
});

describe('basic test on beforeEach', () => {
	describe('sync test', () => {
		let expected: boolean;
		beforeEach('init expected value', () => {
			expected = true;
		});

		it('check expected value set in beforeEach', () => {
			assert(expected, 'got expected value set in before');
			expected = false;
		});

		it('check expected value set in beforeEach but changed in previous it', () => {
			assert(expected, 'got expected value set in before');
		});
	});
	describe('async test', () => {
		let expected: boolean;
		beforeEach('init expected value', () => {
			assert(true, 'got false before wait');
			wait<void>(cb => setTimeout(cb, 0));
			assert(true, 'got true after wait');
			expected = true;
		});

		it('check expected value set in beforeEach', () => {
			assert(expected, 'got expected value set in before');
			expected = false;
		});

		it('check expected value set in beforeEach but changed in previous it', () => {
			assert(expected, 'got expected value set in before');
		});
	});

	describe('async test without string prefix', () => {
		let expected: boolean;
		beforeEach(function () {
			this.timeout(20000);
			assert(true, 'got false before wait');
			wait<void>(cb => setTimeout(cb, 0));
			assert(true, 'got true after wait');
			expected = true;
		});

		it('check expected value set in beforeEach', () => {
			assert(expected, 'got expected value set in before');
			expected = false;
		});

		it('check expected value set in beforeEach but changed in previous it', () => {
			assert(expected, 'got expected value set in before');
		});
	});

	describe('async test with done parameter called too soon', () => {
		let expected: boolean;
		beforeEach(function (done) {
			done();
			wait<void>(() => setTimeout(() => {
				expected = true;
			}, 1000));
		});

		it('check expected value set in beforeEach', done => {
			assert(!expected, 'got expected value set in before');
			done();
		});
	});

	describe('async test with done parameter called in time', () => {
		let expected: boolean;
		beforeEach(function (done) {
			assert(true, 'got true after wait');

			setTimeout(() => {
				expected = true;
				done();
			}, 1000);
		});

		it('check expected value set in beforeEach', () => {
			assert(expected, 'got expected value set in before');
		});
	});
});