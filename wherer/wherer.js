'use strict';

 /*
 * @description remove function and nested object
 * @param kvObject} JS object
 * @returns a simple object without any function or nested object
 */
function cleanObject(kvObject) {
  let cleaned = {};
  for(var key in kvObject) {
    if((typeof kvObject[key] === 'string') || (typeof kvObject[key] === 'number')) {
      cleaned[key] = kvObject[key];
    }
  }
  return cleaned;
}

 /*
 * @description works on a simple object without any function or nested object
 * @param kvObject} JS object
 * @returns a SQL where clause mapping given JS object as required criterions
 */
function __recursiveWherer(kvObject) {
  if(!kvObject || Object.keys(kvObject).length <= 0) return '';

  let keys = Object.keys(kvObject);
  let value = typeof kvObject[keys[0]] === 'string' ? `"${kvObject[keys[0]]}"` : kvObject[keys[0]];
  var token = `${keys[0]} = ${value}`;
  delete kvObject[keys[0]];

  if( keys.length === 1 ) return token;

  return `${token} and ${recursiveWherer(kvObject)}`;
}

 /*
 * @description translate an js object to an SQL clause
 * @param kvObject} JS object
 * @returns a SQL where clause mapping given JS object as required criterions
 */
function recursiveWherer(kvObject) {
  return __recursiveWherer(cleanObject(kvObject));
}

module.exports = recursiveWherer;
