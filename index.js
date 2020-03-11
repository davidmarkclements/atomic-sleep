'use strict'

/* global SharedArrayBuffer, Atomics */

module.exports = function sleep (ms) {
  // also filters out NaN, non-number types, including empty strings, but allows bigints

  const valid = ms > 0 && ms < Infinity
  if (valid === false) {
    if (typeof ms !== 'number' && typeof ms !== 'bigint') {
      throw TypeError('sleep: ms must be a number')
    }
    throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
  }

  if (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined') {
    const nil = new Int32Array(new SharedArrayBuffer(4))

    Atomics.wait(nil, 0, 0, Number(ms))
  } else {
    const target = Date.now() + Number(ms)

    while (target > Date.now()) { }
  }
}
