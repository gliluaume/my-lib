'use strict';

var fs = require('fs');

/*
  this is a custom testing framework to test very simple case and handle simple reporting.
*/
function TestCase(description, type) {
  this.description = description;
  this.type = type ? type : 'assert';
  this.result = null;
  this.ok = false;
  this.expected = null;
}

function Tester(subject) {
  if (arguments.length !== 1) throw Error('you must set a subject to your test.');

  const FgRed = "\x1b[31m";
  // const FgGreen = "\x1b[32m";
  const FgBlue = "\x1b[34m"
  const Reset = "\x1b[0m"

  var assertNewDesc = function(description) {
    // console.log(description, this.results.map(item => item.description), this.results.some((item) => item.description === description));
    if(this.results.some((item) => item.description === description)) throw Error('description must be unique !');
  }

  this.subject = subject;
  this.results = [];
  
  this.assert = function assert(description, fn, expected) {
    assertNewDesc.bind(this, description)();
    let testCase = new TestCase(description);
    try {
      testCase.result = fn();
      testCase.expected = expected;
      testCase.ok = (testCase.result === expected);
    } 
    catch(e) {
      testCase.result = e;
      testCase.ok = false;
    }

    this.results.push(testCase);
  }

  this.except = function(description, fn) {
    assertNewDesc.bind(this, description)();
    let testCase = new TestCase(description, 'exception');
    try {
      testCase.result = fn();
    } 
    catch(e) {
      testCase.result = e;
      testCase.ok = true;
    }

    this.results.push(testCase);
  }

  this.isSuccessful = function() {
    return this.results.reduce((acc, item) => acc && item.ok, true);
  }

  this.explicitReport = function() {
    return this.results.map((item) => { return { description: item.description, ok: item.ok }});
  }

  this.failureReport = function() {
    return this.results
    .filter((item) => !item.ok)
    .map((item, index) => { return { description: item.description, result: item.result, expected: item.expected, ok: item.ok }});
  }

  this.report = function() {
    if(!this.isSuccessful()) {
      console.log(FgRed, subject, this.isSuccessful());
      console.log(Reset, this.failureReport());
    }
    else {
      console.log(FgBlue, subject, this.isSuccessful());
      console.log(Reset, 'end');
    }
  }

  this.watch = function(path) {
    console.log('watching', path);
    fs.watch(path, (eventType, filename) => {
      if (filename)
        console.log(filename);
        // Prints: <Buffer ...>
    });
  }

}

module.exports = Tester;
