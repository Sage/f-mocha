import * as Mocha from 'mocha';
import { setup } from './setup';

module.exports = function fMochaInterface(suite: Mocha.Suite) {
    Mocha.interfaces.bdd(suite);
    suite.on('pre-require', () => {
        setup();
    });
};

module.exports.description = 'F-Mocha interface extending default BDD to add fiber support';
module.exports.setup = setup;
