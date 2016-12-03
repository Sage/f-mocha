import { assert } from 'chai';
import { wait } from 'f-promise';
import { setup } from '..';

setup();

describe("basic test", () => {
    it('sync works', () => {
        assert(true, 'got true');
    });
    it('async works like sync', () => {
        assert(true, 'got true before wait');
        wait(cb => setTimeout(cb, 0));
        assert(true, 'got true after wait');
    });
})