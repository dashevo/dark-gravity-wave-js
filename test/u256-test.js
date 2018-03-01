
/* eslint new-cap: 0 */
const u256 = require('../lib/u256.js');
const { expect } = require('chai').expect;

describe('u256 Object', () => {
  describe('creation', () => {
    it('should create a u64', () => {
      const u256Obj = new u256();
      expect(u256Obj).to.be.instanceof(u256);
    });
    it('string', () => {
      expect(new u256('123').u32).to.deep.equal([123, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('empty string', () => {
      expect(new u256('').u32).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('long string', () => {
      expect(new u256('').u32).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });
  describe('arithmetics', () => {
    it('should addOne', () => {
      expect(new u256().addOne().u32).to.deep.equal([1, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should neg', () => {
      expect(new u256().neg().u32).to.deep.equal([-1, -1, -1, -1, -1, -1, -1, -1]);
    });
    it('should subtract', () => {
      const first = new u256([10, 9, 8, 7, 6, 5, 4, 3]);
      const second = new u256([7, 6, 5, 4, 3, 2, 1, 0]);
      expect(first.subtract(second).u32).to.deep.equal([3, 3, 3, 3, 3, 3, 3, 3]);
    });
    it('multiplyWithInteger', () => {
      expect(new u256([10, 9, 8, 7, 6, 5, 4, 3])
        .multiplyWithInteger(10).u32).to.deep.equal([100, 90, 80, 70, 60, 50, 40, 30]);
    });
  });
  describe('misc', () => {

  });
});
