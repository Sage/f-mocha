import { run } from 'f-promise';


function wrapWithRun(_fn: Function) {
    return function (name: string, fn: () => void) {
        if (!fn) {
            return _fn(name);
        }
        return _fn(name, function (done: MochaDone) {
            run(() => fn()).then(done, done);
        });
    }
}
export function setup() {
    function patchFn(fnName: string, keep?: string[]) {
        keep = keep || [];
        const _fn = glob[fnName];
        if (_fn.wrapped) return;
        glob[fnName] = wrapWithRun(_fn);
        keep.forEach((subFnName) => {
            glob[fnName][subFnName] = wrapWithRun(_fn[subFnName]);
        });
        glob[fnName].wrapped = true;
    }

    const glob = global as any;
    patchFn('it', [ 'only', 'skip']);
    patchFn('before');
    patchFn('beforeEach');
}
