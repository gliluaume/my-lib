'use strict';

const padLeft = require('./padder');
const Tester = require('../tester/tester');

let tester = new Tester('padLeft');

tester.except('wrong parameters : no char, 0 as min length', () => padLeft('s', '', 0));
tester.except('wrong parameters : no char, default min length', () => padLeft('s', ''));
tester.assert('default min len is ', () => padLeft('', 'a'), '');
tester.assert('null input string allowed', () => padLeft(null, 'a', 1), 'a');
tester.assert('empty input string allowed', () => padLeft('', 'a', 1), 'a');
tester.assert('handle string length exceeding min len', () => padLeft('foo', 'a', 2), 'foo');
tester.assert('pad as expected a given string', () => padLeft('foo', 'a', 5), 'aafoo');
tester.assert('pad as expected one char', () => padLeft('f', 'a', 1), 'f');

tester.report();
