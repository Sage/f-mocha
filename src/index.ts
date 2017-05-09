import { run } from 'f-promise';
import { IHookCallbackContext } from 'mocha';

export type MochaBody = (this: IHookCallbackContext) => void;

function wrapWithRun(body: MochaBody){
    return function (this: IHookCallbackContext, done: MochaDone) {
        run(() => {
            return body.apply(this);
        }).then(done, done);
    };
}

function overrideFn(fn: Function) {
    return function (name: string | MochaBody, body?: MochaBody) {
        if (!body) {
            if (typeof name === 'string') {
                return fn(name);
            } else if (typeof name === 'function') {
                return fn(wrapWithRun(name));
            }
        }
        return fn(name, wrapWithRun(body));
    }
}

export function setup() {
    function patchFn(fnName: string, subNames?: string[]) {
        subNames = subNames || [];
        const _fn = glob[fnName];
        if (_fn.wrapped) return;
        glob[fnName] = overrideFn(_fn);
        subNames.forEach((subFnName) => {
            glob[fnName][subFnName] = overrideFn(_fn[subFnName]);
        });
        glob[fnName].wrapped = true;
    }

    const glob = global as any;
    patchFn('it', [ 'only', 'skip']);
    patchFn('before');
    patchFn('beforeEach');
    patchFn('after');
    patchFn('afterEach');
}
