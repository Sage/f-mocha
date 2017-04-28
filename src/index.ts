import { run } from 'f-promise';



export function setup() {
    function patchFn(fnName: string) {
        const _fn = glob[fnName];
        if (_fn.wrapped) return;
        glob[fnName] = function (name: string, fn: () => void) {
            return _fn(name, function (done: MochaDone) {
                run(() => fn()).then(done, done);
            });
        }
        glob[fnName].wrapped = true;
    }

    const glob = global as any;
    patchFn('it');
    patchFn('before');
    patchFn('beforeEach');
}
