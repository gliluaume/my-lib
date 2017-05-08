'use strict';

function get(obj, propPath) {
  if(!obj || !propPath) return undefined;
  
  var path = propPath.split('.');
  var tmp = obj;
  while(path.length > 0) {
    tmp = tmp[path.shift()];
  }
  return tmp;
}

module.exports = get;