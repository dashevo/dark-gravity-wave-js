

const dgw = require('../');
const { expect } = require('chai').expect;

const blocks = [{
  height: 312667,
  target: 0x1b193a68,
  timestamp: 1438528803,
}, {
  height: 312668,
  target: 0x1b1940c9,
  timestamp: 1438528786,
}, {
  height: 312669,
  target: 0x1b189a0a,
  timestamp: 1438529531,
}, {
  height: 312670,
  target: 0x1b1cf566,
  timestamp: 1438529543,
}, {
  height: 312671,
  target: 0x1b1d8480,
  timestamp: 1438529565,
}, {
  height: 312672,
  target: 0x1b1b6b56,
  timestamp: 1438529666,
}, {
  height: 312673,
  target: 0x1b1bae81,
  timestamp: 1438529838,
}, {
  height: 312674,
  target: 0x1b1c33e3,
  timestamp: 1438529995,
}, {
  height: 312675,
  target: 0x1b1d68a5,
  timestamp: 1438530059,
}, {
  height: 312676,
  target: 0x1b1d1ffc,
  timestamp: 1438530151,
}, {
  height: 312677,
  target: 0x1b1d61b7,
  timestamp: 1438530199,
}, {
  height: 312678,
  target: 0x1b1e3597,
  timestamp: 1438530280,
}, {
  height: 312679,
  target: 0x1b1dcb40,
  timestamp: 1438530401,
}, {
  height: 312680,
  target: 0x1b1de353,
  timestamp: 1438530599,
}, {
  height: 312681,
  target: 0x1b1d9f81,
  timestamp: 1438530667,
}, {
  height: 312682,
  target: 0x1b1bb5a3,
  timestamp: 1438530728,
}, {
  height: 312683,
  target: 0x1b17e949,
  timestamp: 1438531015,
}, {
  height: 312684,
  target: 0x1b1797b7,
  timestamp: 1438531231,
}, {
  height: 312685,
  target: 0x1b19406d,
  timestamp: 1438531237,
}, {
  height: 312686,
  target: 0x1b193835,
  timestamp: 1438531418,
}, {
  height: 312687,
  target: 0x1b15f370,
  timestamp: 1438531477,
}, {
  height: 312688,
  target: 0x1b15bda6,
  timestamp: 1438531515,
}, {
  height: 312689,
  target: 0x1b15792d,
  timestamp: 1438531838,
}, {
  height: 312690,
  target: 0x1b16dca7,
  timestamp: 1438531999,
}, {
  height: 312691,
  target: 0x1b1777d4,
  timestamp: 1438531991,
}];


describe('dark gravity wave', () => {
  describe('difficulty calculation', () => {
    it('should handle an array of blocks with a 150s block time', () => {
      const diff = dgw.getTarget(blocks);
      const expectedHexDiff = 0x1B177E3A;// 454524474 in decimal
      expect(diff).to.equal(expectedHexDiff);
    });
    it('should handle an array of blocks with block time argument', () => {
      const defaultBlockTimeSecond = 150;
      const diff = dgw.getTarget(blocks, defaultBlockTimeSecond);
      const expectedHexDiff = 0x1B177E3A;
      expect(diff).to.equal(expectedHexDiff);
    });
    it('should handle an array of block with another blocktime', () => {
      const blockTimeSecond = 300;
      const diff = dgw.getTarget(blocks, blockTimeSecond);
      const expectedHexDiff = 453754653;
      expect(diff).to.equal(expectedHexDiff);
    });
  });
});
