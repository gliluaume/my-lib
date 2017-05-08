'use strict';

const recursiveWherer = require('./wherer');
const Tester = require('../tester/tester');

let tester = new Tester('wherer');

tester.assert('null returns empty string', () => recursiveWherer(null), '');
tester.assert('undefined returns empty string', () => recursiveWherer(undefined), '');
tester.assert('empty returns empty string', () => recursiveWherer({}), '');
tester.assert('only funcs returns empty string', () => recursiveWherer({ dummy: function() { console.log('yo'); } }), '');

tester.assert('simple obj returns simple clause', () => recursiveWherer({ a: 1 }), 'a = 1');
tester.assert('multiple kv returns multiple and clause', () => recursiveWherer({ a: 1, b: 2 }), 'a = 1 and b = 2');
tester.assert('string and number are well parsed into where clause', 
  () => recursiveWherer({ a: 1, b: 2, toto: 'oui' }), 
  'a = 1 and b = 2 and toto = "oui"');

tester.assert('functions are just ingnored', 
  () => recursiveWherer({ a: 1, dummy: function() { console.log('yo'); } }), 
  'a = 1');

tester.assert('nested objects are just ignored', 
  () => recursiveWherer({ a: 1, dummy: function() { console.log('yo'); }, nested: { u: 'uo', v: 1 }, b: 2 }), 
  'a = 1 and b = 2');

tester.report();
