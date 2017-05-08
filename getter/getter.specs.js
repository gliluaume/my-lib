'use strict';

const Tester = require('../tester/tester');
const getter = require('./getter');

let tester = new Tester('getter');

tester.assert('empty object do not have prop undefined', () => getter({}, ''), undefined);
tester.assert('simple object property is accessible', () => getter({a: 1}, 'a'), 1);
tester.assert('nested object property is accessible', () => getter({a: {b: 1}}, 'a.b'), 1);
tester.report();
