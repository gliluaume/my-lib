'use strict';

function get(obj, propPath) {
  if(!obj || !propPath) return undefined;
  
  var path = propPath.split('.');
  var tmp = obj;

  while((typeof tmp === 'object') && (path.length > 0)) {
    tmp = tmp[path.shift()];
  }

  if (path.length > 0) return undefined;

  return tmp;
}

module.exports = get;
