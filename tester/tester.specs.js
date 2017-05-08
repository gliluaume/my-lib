'use strict';

const Tester = require('../tester/tester');

let exception;
let tester;


function except(fn, msg) {
  try {
    fn();
  } catch(e){
    exception = e;
  }
  // console.log('is exce', !exception, exception);
  if(!exception) throw msg;
}

except(() => tester = new Tester(), 'Tester must have thrown an exception if no subject was given !');

tester = new Tester('test');
tester.assert('desc', () => true, true);
except(() => tester.assert('desc', () => true, true), 'Tester assert must have thrown an exception as duplicate description was given !');
except(() => tester.except('desc', () => true, true), 'Tester except must have thrown an exception as duplicate description was given !');

tester = new Tester('test');
tester.assert('desc a', () => true, true);
tester.assert('desc b', () => true, false);

let report = tester.failureReport();
if (!(report.length == 1 && 
    report[0].description === 'desc b' &&
    report[0].result &&
    !report[0].expected &&
    !report[0].ok))
throw 'failureReport is not valid';

console.log('eveything went well');
