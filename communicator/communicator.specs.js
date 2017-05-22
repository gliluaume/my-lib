'use strict';

const Communicator = require('./Communicator');
const Tester = require('../tester/tester');

let tester = new Tester('Communicator');

tester.assert('can build multiple communicators', () => {
  let c = new Communicator();
  let d = new Communicator();
  c.addHandler('tweet', function() { console.log('handle tweet') }, 'listener1');
  c.addHandler('groan', function() { console.log('handle groan') }, 'listener2');
  return c.getHandlers().length;
}, 2);

tester.assert('can add handlers to its collection of handlers', () => {
  let c = new Communicator();
  let d = new Communicator();
  c.addHandler('tweet', function() { console.log('handle tweet') }, 'listener1');
  c.addHandler('groan', function() { console.log('handle groan') }, 'listener2');
  return c.getHandlers().length > d.getHandlers().length;
}, true);

tester.assert('can dispatch event to a listeners', () => {
  let c = new Communicator();
  let witness;
  let listenerA = {
    handler: function(eventData) {
      if(!eventData) throw Error('test failed for listenerA');
      witness = true;
    }
  };

  c.addHandler('tweet', listenerA.handler); 
  c.dispatchEvent('tweet', {something: 'in the way'});
  
  return witness;
}, true);

tester.report();
