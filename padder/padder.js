'use strict';
/*
 * @description left pad a string
 * @param {str} a string
 * @param {char} padding char
 * @param {minlen} minimum length
 * @returns a new string padding given one with given char for a min length of min len
 */
function padLeft(str, char, minlen) {
  let s = str ? str : '';
  if (char.length !== 1) throw Error('char expected');
  return char.repeat(Math.max(0, minlen - s.length)) + s;
}

module.exports = padLeft;
