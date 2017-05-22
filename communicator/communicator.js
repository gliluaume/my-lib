'use strict';
/*
 * @description register handlers and call them when target event occurs
 */
function Communicator() {
  var handlers = [];
  this.addHandler = addHandler;
  this.getHandlers = getHandlers;
  this.dispatchEvent = dispatchEvent;
  
  function addHandler(eventName, delegate, source) {
    if(typeof delegate !== 'function') 
      throw Error('delegate must be a function');
    
    handlers.push(new Handler(eventName, delegate, source));
  }
  
  function getHandlers(eventName, source) {
    if(eventName && source) 
      return handlers.filter((h) => h.eventName === eventName && h.source === source);
    
    if(eventName && !source) 
      return handlers.filter((h) => h.eventName === eventName);
    
    return handlers.filter(a => true);
  }
  
  function dispatchEvent(eventName, data) {
    getHandlers(eventName).forEach(handler => handler.delegate(data));
  }
}

function Handler(eventName, delegate, source) {
  this.eventName = eventName;
  this.delegate = delegate;
  this.source = source;
} 

module.exports = Communicator;
