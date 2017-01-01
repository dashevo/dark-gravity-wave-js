'use strict';

var u256 = require('../lib/u256.js');
var expect = require("chai").expect;

describe("u256 based arithmetic", function() {
  describe("creation", function() {
    it("string", function() {
      expect(new u256("123").u32).to.deep.equal([123,0,0,0,0,0,0,0]);
    });
    it("empty string", function() {
      expect(new u256("").u32).to.deep.equal([0,0,0,0,0,0,0,0]);
    });
    it("long string", function() {
      expect(new u256("").u32).to.deep.equal([0,0,0,0,0,0,0,0]);
    });
  });
});
