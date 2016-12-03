import { run } from 'f-promise';

export function setup() {
    const glob = global as any;
    const it = glob.it;
    glob.it = function (name: string, fn: () => void) {
        return it(name, function (done: MochaDone) {
            run(() => {
                fn();
                done();
            }).catch(console.error);
        });
    }
}
