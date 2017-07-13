import { run } from 'f-promise';
import { IHookCallbackContext } from 'mocha';

export type MochaBody = (this: IHookCallbackContext) => void;

function wrapWithRun(body: MochaBody) {
	return function (this: IHookCallbackContext, done: MochaDone) {
		function doneErr(err: any) {
			if (err && err instanceof Error) {
				done(err);
			} else {
				done();
			}
		}
		// check done is called only when declared (normal mocha behaviour)
		if (body.length === 0) {
			run(() => {
				return body.call(this);
			}).then(doneErr).catch(done);
		} else {
			run(() => {
				return body.call(this, doneErr);
			}).catch(err => { throw new Error('run failed'); });
		}
	};
}

function overrideFn(fn: Function) {
	return function (name: string | MochaBody, body?: MochaBody) {
		if (!body) {
			if (typeof name === 'string') {
				return fn(name);
			} else {
				return fn(wrapWithRun(name));
			}
		}
		return fn(name, wrapWithRun(body));
	};
}

export function setup() {
	function patchFn(fnName: string, subNames?: string[]) {
		subNames = subNames || [];
		const _fn = glob[fnName];
		if (_fn.wrapped) return;
		glob[fnName] = overrideFn(_fn);
		subNames.forEach(subFnName => {
			glob[fnName][subFnName] = overrideFn(_fn[subFnName]);
		});
		glob[fnName].wrapped = true;
	}

	const glob = global as any;
	patchFn('it', ['only', 'skip']);
	patchFn('before');
	patchFn('beforeEach');
	patchFn('after');
	patchFn('afterEach');
}
