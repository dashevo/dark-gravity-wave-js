/* eslint-disable */

var u64 = require('./u64');

var charString2bytes = function(s) {
  for (var b = [], i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
  return b;
}

var decimalNumStringToInt32Buffer = function(s) {
  var r = new u256();
  for (var i = 0; i < s.length; i++) {
    var temp = new u256();
    var slice = s.slice(i, i + 1);
    var n = parseInt(slice);
    temp.u32[0] = n;
    var height = s.length - i - 1;
    while (height > 0) {
      if (height > 8) {
        temp = temp.multiplyWithInteger(1000000000);
        height -= 9;
      } else {
        temp = temp.multiplyWithInteger(Math.pow(10,height));
        height = 0;
      }
    }
    r.add(temp);
  }
  return r.u32;
}

var hexNumStringToInt32Buffer = function(s) {
  var r = new u256();
  var i = 0;
  while (s.length) {
    var m = Math.min(s.length,8);
    var n = s.slice(s.length - m);
    s = s.slice(0,s.length - m);
    r.u32[i] = parseInt(n,16);
    i++;
  }
  return r.u32;
}

var bytes2Int32Buffer = function(b) {
  var len = b.length;
  if (!len) return [];
  var bufferLength = len ? (((len - 1) >>> 2) + 1) : 0;
  var buffer = new Array(bufferLength);
  for (var j = 0; j < bufferLength; j++) {
    buffer[j] = (b[j * 4] << 24) | (b[j * 4 + 1] << 16) | (b[j * 4 + 2] << 8) | b[j * 4 + 3];
  }
  return buffer;
}


function u256(a,base) {
  if (a === undefined) {
    this.u32 = [0, 0, 0, 0, 0, 0, 0, 0];
  }
  else if (u256.prototype.isPrototypeOf(a)) {
    this.u32 = a.u32.slice();
  }
  else if (Number.isInteger(a)) {
    this.u32 = [a, 0, 0, 0, 0, 0, 0, 0];
  }
  else if (typeof a === 'string' || a instanceof String) {
    if (base < 2) return Math.NaN;
    if (a.startsWith("0x")) {
      this.u32 = hexNumStringToInt32Buffer(a.slice(2));
    } else {
      this.u32 = decimalNumStringToInt32Buffer(a);
    }
  }
  else {
    this.u32 = a;
  }
}

u256.prototype.u16 = function() {
  var r16 = [];
  for (var i = 0; i < 8; i++) {
    r16.push(this.u32[i] & 0xFFFF);
    r16.push(this.u32[i] >>> 16);
  }
  return r16;
}

u256.prototype.importU16 = function(u16) {
  for (var i = 0; i < 8; i++) {
    this.u32[i] = u16[i * 2] + (u16[i * 2 + 1] << 16);
  }
  return this;
}

u256.prototype.setCompact = function(nCompact) {
  var nSize = nCompact >>> 24;
  var nWord = new u256();
  nWord.u32[0] = nCompact & 0x007fffff;
  if (nSize <= 3) {
    nWord = nWord.shiftRight(8 * (3 - nSize));
  }
  else {
    nWord = nWord.shiftLeft(8 * (nSize - 3));
  }
  this.u32 = nWord.u32;
}

u256.prototype.bits = function() {
  for (var pos = 8 - 1; pos >= 0; pos--) {
    if (this.u32[pos]) {
      for (var bits = 31; bits > 0; bits--) {
        if (this.u32[pos] & 1 << bits)
          return 32 * pos + bits + 1;
      }
      return 32 * pos + 1;
    }
  }
  return 0;
}

u256.prototype.getCompact = function() {
  var nSize = Math.floor((this.bits() + 7) / 8);
  var nCompact = 0;
  if (nSize <= 3) {
    nCompact = this.u32[0] << 8 * (3 - nSize);
  }
  else {
    var bn = this.shiftRight(8 * (nSize - 3));
    nCompact = bn.u32[0];
  }
  // The 0x00800000 bit denotes the sign.
  // Thus, if it is already set, divide the mantissa by 256 and increase the exponent.
  if (nCompact & 0x00800000) {
    nCompact >>= 8;
    nSize++;
  }
  // assert((nCompact & ~0x007fffff) == 0);
  // assert(nSize < 256);
  nCompact |= nSize << 24;
  return nCompact;
}

u256.prototype.plus = function(b) {
  var carry = 0;
  var r = new Array(16);
  var a16 = this.u16();
  var b16 = b.u16();
  for (var i = 0; i < 16; i++) {
    var sum = a16[i] + b16[i] + carry;
    r[i] = sum & 0xFFFF;
    carry = sum >>> 16;
  }
  return new u256().importU16(r);
}

u256.prototype.add = function(b) {
  var carry = 0;
  var r = new Array(16);
  var a16 = this.u16();
  var b16 = b.u16();
  for (var i = 0; i < 16; i++) {
    var sum = a16[i] + b16[i] + carry;
    r[i] = sum & 0xFFFF;
    carry = sum >>> 16;
  }
  this.importU16(r);
  return this;
}

u256.prototype.addOne = function() {
  if (this.u16[15] === 0xFFFF) {
    this.u16[15]++;
  }
  else {
    var b = new u256(1);
    return this.add(b);
  }
}

u256.prototype.neg = function() {
  var r = new u256(0);
  for (var i = 0; i < 8; i++) {
    r.u32[i] = ~this.u32[i];
  }
  return r;
}

u256.prototype.subtract = function(b) {
  return this.add(b.neg().addOne());
}

u256.prototype.shiftLeft = function(bits) {
  var r = new u256();
  var k = Math.floor(bits / 32);
  bits = bits % 32;
  for (var i = 0; i < 8; i++) {
    if (i + k + 1 < 8 && bits != 0)
      r.u32[i + k + 1] |= (this.u32[i] >>> (32 - bits));
    if (i + k < 8)
      r.u32[i + k] |= (this.u32[i] << bits);
  }
  return r;
}

u256.prototype.shiftRight = function(bits) {
  var r = new u256();
  var k = Math.floor(bits / 32);
  bits = bits % 32;
  for (var i = 0; i < 8; i++) {
    if (i - k - 1 >= 0 && bits != 0)
      r.u32[i - k - 1] |= (this.u32[i] << (32 - bits));
    if (i - k >= 0)
      r.u32[i - k] |= (this.u32[i] >>> bits);
  }
  return r;
}

u256.prototype.supeq = function(b) {
  for (var i = 7; i >= 0; i--) {
    if ((this.u32[i] >>> 0) > (b.u32[i] >>> 0)) return true;
    if (this.u32[i] !== b.u32[i]) return false;
  }
  return true;
}

u256.prototype.divide = function(b) {
  var div = new u256(b); // make a copy, so we can shift.
  var num = new u256(this); // make a copy, so we can subtract.
  var r = new u256(); // the quotient.
  var num_bits = num.bits();
  var div_bits = div.bits();
  if (div_bits === 0) return Number.NaN();
  if (div_bits > num_bits) // the result is certainly 0.
    return r;
  var shift = num_bits - div_bits;
  div = div.shiftLeft(shift); // shift so that div and num align.
  while (shift >= 0) {
    if (num.supeq(div)) {
      num = num.subtract(div);
      r.u32[Math.floor(shift / 32)] |= (1 << (shift & 31)); // set a bit of the result.
    }
    div = div.shiftRight(1); // shift back.
    shift--;
  }
  // num now contains the remainder of the division.
  return r;
}

u256.prototype.toString = function(a) {
  var string = '';
  var array = this.u32;
  for (var i in array) {
    var s = array[i];
    if (s < 0) {
      s = 0xFFFFFFFF + array[i] + 1;
    }
    var l = s.toString(16);
    var padding = 8;
    while (l.length < padding) {
      l = "0" + l;
    }
    string += l;
  }
  return string;
}

u256.prototype.toString = function() {
  return this.toString(16);
}

u256.prototype.multiplyWithInteger = function(b) {
  var carry = 0;
  var a = new u256();
  for (var i = 0; i < 8; i++) {
    var multiplied = new u64(0, b).multiply(new u64(0, this.u32[i]));
    if (carry) {
      var added = new u64(0, multiplied.lo).add(new u64(0, carry));
      a.u32[i] = added.lo;
      carry = (multiplied.hi >>> 0) + (added.hi >>> 0);
    }
    else {
      a.u32[i] = multiplied.lo;
      carry = multiplied.hi;
    }
  }
  return a;
}

module.exports = u256;
