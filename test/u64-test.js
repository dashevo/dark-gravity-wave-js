'use strict';

var u64 = require('../lib/u64.js');
var expect = require("chai").expect;

describe("u64 Object", function() {
  describe("creation", function() {
    it("should create a u64", function() {
      var _u64 = new u64();
      expect(_u64).to.be.instanceof(u64);
    });
    it('should tell if zero',function(){
      expect(new u64(0,0).isZero()).to.be.equals(true);
      expect(new u64(1,1).isZero()).to.be.equals(false);
    })
    it('should return zero',function(){
      expect(new u64(42,12).zero()).to.deep.equal(new u64(0,0));
    });
    it('should add',function(){
      expect(new u64(42,10).add(new u64(42,10))).to.deep.equal(new u64(84,20))
    });
  });
});
