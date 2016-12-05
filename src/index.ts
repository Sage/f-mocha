import { run } from 'f-promise';

export function setup() {
    const glob = global as any;
    const it = glob.it;
    if (it.wrapped) return;
    glob.it = function (name: string, fn: () => void) {
        return it(name, function (done: MochaDone) {
            run(() => fn()).then(done, done);
        });
    }
    glob.it.wrapped = true;
}
