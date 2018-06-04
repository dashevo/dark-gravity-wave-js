/* eslint-disable no-bitwise */
const BN = require('bn.js');

function getFromString(compactValString) {
  throw Error(`${compactValString}: Getting u32 from string not yet implemented`);
}

function double256(target) {
  const B192 = 0x1000000000000000000000000000000000000000000000000;
  const B128 = 0x100000000000000000000000000000000;
  const B64 = 0x10000000000000000;
  const B0 = 0x1;

  let n = 0;
  let hi = null;
  let lo = null;

  hi = target.readUInt32LE(28, true);
  lo = target.readUInt32LE(24, true);
  n += ((hi * 0x100000000) + lo) * B192;

  hi = target.readUInt32LE(20, true);
  lo = target.readUInt32LE(16, true);
  n += ((hi * 0x100000000) + lo) * B128;

  hi = target.readUInt32LE(12, true);
  lo = target.readUInt32LE(8, true);
  n += ((hi * 0x100000000) + lo) * B64;

  hi = target.readUInt32LE(4, true);
  lo = target.readUInt32LE(0, true);
  n += ((hi * 0x100000000) + lo) * B0;

  return n;
}

function fromCompact(compact) {
  if (compact === 0) { return new BN(0); }

  const exponent = compact >>> 24;
  const negative = (compact >>> 23) & 1;

  let mantissa = compact & 0x7fffff;
  let num;

  if (exponent <= 3) {
    mantissa >>>= 8 * (3 - exponent);
    num = new BN(mantissa);
  } else {
    num = new BN(mantissa);
    num.iushln(8 * (exponent - 3));
  }

  if (negative) { num.ineg(); }

  return num;
}

function getFromNumber(compactValDecimal) {
  const target = fromCompact(compactValDecimal);
  return double256(target.toArrayLike(Buffer, 'le', 32));
}

// Converts a 256-bit or 32 byte unsigned int to its floating point equivalent
function getDoubleFrom256(val) {
  switch (typeof val) {
    case 'string':
      return getFromString(val);
    case 'number':
      return getFromNumber(val);
    default:
      throw Error(`Compact of type ${typeof val} not supported`);
  }
}

module.exports = getDoubleFrom256;
