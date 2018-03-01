
/* eslint new-cap: 0 */
const u64 = require('../lib/u64.js');
const { expect } = require('chai').expect;

describe('u64 Object', () => {
  describe('creation', () => {
    it('should create a u64', () => {
      const u64Obj = new u64();
      expect(u64Obj).to.be.instanceof(u64);
    });
    it('should tell if zero', () => {
      expect(new u64(0, 0).isZero()).to.be.equals(true);
      expect(new u64(1, 1).isZero()).to.be.equals(false);
    });
    it('should return zero', () => {
      expect(new u64(42, 12).zero()).to.deep.equal(new u64(0, 0));
    });
    it('should add', () => {
      expect(new u64(42, 10).add(new u64(42, 10))).to.deep.equal(new u64(84, 20));
    });
  });
});
