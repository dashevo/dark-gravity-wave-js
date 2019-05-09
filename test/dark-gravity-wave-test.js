const { expect } = require('chai');
const dgw = require('../');

const mainnetBlocks = [
  {
    height: 999900,
    timestamp: 1546794811,
    target: 0x1937efd3,
  },
  {
    height: 999901,
    timestamp: 1546794872,
    target: 0x193bdb17,
  },
  {
    height: 999902,
    timestamp: 1546795363,
    target: 0x193c2e06,
  },
  {
    height: 999903,
    timestamp: 1546795705,
    target: 0x19436374,
  },
  {
    height: 999904,
    timestamp: 1546795801,
    target: 0x1942c8da,
  },
  {
    height: 999905,
    timestamp: 1546796153,
    target: 0x1942a824,
  },
  {
    height: 999906,
    timestamp: 1546796323,
    target: 0x19466999,
  },
  {
    height: 999907,
    timestamp: 1546796325,
    target: 0x194815a5,
  },
  {
    height: 999908,
    timestamp: 1546796396,
    target: 0x19481272,
  },
  {
    height: 999909,
    timestamp: 1546796425,
    target: 0x1948b446,
  },
  {
    height: 999910,
    timestamp: 1546796594,
    target: 0x194767ac,
  },
  {
    height: 999911,
    timestamp: 1546797416,
    target: 0x194798d6,
  },
  {
    height: 999912,
    timestamp: 1546797529,
    target: 0x19560a56,
  },
  {
    height: 999913,
    timestamp: 1546797597,
    target: 0x19592a34,
  },
  {
    height: 999914,
    timestamp: 1546797677,
    target: 0x195bb28f,
  },
  {
    height: 999915,
    timestamp: 1546797788,
    target: 0x195c638e,
  },
  {
    height: 999916,
    timestamp: 1546798067,
    target: 0x195a9134,
  },
  {
    height: 999917,
    timestamp: 1546798096,
    target: 0x195a40bd,
  },
  {
    height: 999918,
    timestamp: 1546798145,
    target: 0x19532245,
  },
  {
    height: 999919,
    timestamp: 1546798220,
    target: 0x194eadda,
  },
  {
    height: 999920,
    timestamp: 1546798311,
    target: 0x1950aaf2,
  },
  {
    height: 999921,
    timestamp: 1546798458,
    target: 0x195298e1,
  },
  {
    height: 999922,
    timestamp: 1546798565,
    target: 0x1955383b,
  },
  {
    height: 999923,
    timestamp: 1546798603,
    target: 0x195587da,
  },
  {
    height: 999924,
    timestamp: 1546798801,
    target: 0x19514193,
  },
];

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
    it('should be valid for low enough target', () => {
      const highTargetBits = 0x1b0777d4;
      const result = dgw.isValidTarget(highTargetBits, blocks, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be invalid for too high target', () => {
      const highTargetBits = 0x208fffff;
      const result = dgw.isValidTarget(highTargetBits, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should be valid for the max regtest target if less than 25 blocks has been mined', () => {
      const highTargetBits = 0x207fffff;
      const result = dgw.isValidTarget(highTargetBits, blocks.slice(0, 10), 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid for int headerBits', () => {
      const highTargetInt = 1000;
      const result = dgw.isValidTarget(highTargetInt, blocks);
      expect(result).to.equal(true);
    });

    it('should be invalid maxTarget = 0x207fffff', () => {
      const highTargetInt = 0x207fffff;
      const result = dgw.isValidTarget(highTargetInt, blocks);
      expect(result).to.equal(false);
    });

    it('should be valid when num blocks < maxBlocks and maxTarget = 0x207fffff', () => {
      const highTargetInt = 0x207fffff;
      const result = dgw.isValidTarget(highTargetInt, blocks.slice(0, 10), 'devnet');
      expect(result).to.equal(true);
    });

    it('should be invalid maxTarget = 0x207fffff as int', () => {
      const highTargetInt = 545259519;
      const result = dgw.isValidTarget(highTargetInt, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should be valid for maxTarget > 0x207fffff', () => {
      const highTargetInt = 0x20800000;
      const result = dgw.isValidTarget(highTargetInt, blocks, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid for maxTarget > 0x207fffff as int', () => {
      const highTargetInt = 0x20800000;
      const result = dgw.isValidTarget(highTargetInt, blocks, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid when allHeaders is empty array', () => {
      const highTargetInt = 0x20800000;
      const result = dgw.isValidTarget(highTargetInt, [{}], 'devnet');
      expect(result).to.equal(true);
    });

    it('should throw error for allHeaders is {}', () => {
      const highTargetBits = 0x208fffff;
      expect(() => {
        dgw.isValidTarget(highTargetBits, {}, 'devnet');
      }).to.throw('allHeaders.slice is not a function');
    });

    it('should throw error for allHeaders is string > 25 chars', () => {
      const highTargetBits = 0x1b0777d4;
      expect(() => {
        dgw.isValidTarget(highTargetBits, 's'.repeat(26), 'devnet');
      }).to.throw('allHeaders.slice(...).reverse is not a function');
    });

    it('should throw error for signed int', () => {
      expect(() => {
        dgw.isValidTarget(-1, blocks, 'devnet');
      }).to.throw('byte array longer than desired length');
    });

    it('should throw error when compact is undefined', () => {
      expect(() => {
        dgw.isValidTarget(undefined, blocks, 'devnet');
      }).to.throw('Compact of type undefined not supported');
    });

    it('should throw error when compact is boolean', () => {
      expect(() => {
        dgw.isValidTarget(true, blocks, 'devnet');
      }).to.throw('Compact of type boolean not supported');
    });

    it('height values ignored in calculation in getTarget function', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks));
      blocks2.forEach((value) => {
        const v = value;
        delete v.height;
      });
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });

    it('height values ignored in calculation in getTarget function: the same values', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks, 'devnet'));
      const temp = blocks2[0].height;
      blocks2.forEach((value) => {
        const v = value;
        v.height = temp;
      });
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });


    it('should throw error when compact is not defined in blocks', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks));
      blocks2.forEach((value) => {
        const v = value;
        delete v.target;
      });
      expect(() => {
        dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      }).to.throw('Compact of type undefined not supported');
    });

    it('should be invalid when timestamp values not specified', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks));
      blocks2.forEach((value) => {
        const v = value;
        delete v.timestamp;
      });
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(false);
    });

    it('should be invalid for blockTime=0', () => {
      const highTargetBits = 0x1b0777d4;
      const blockTime = 0;
      const result = dgw.isValidTarget(highTargetBits, blocks, 'devnet', blockTime);
      expect(result).to.equal(false);
    });

    /*
        it('should be invalid for blockTime negative', () => {
        // TODO We should not allow negative blockTime - agree
            const highTargetBits = 0x1b0777d4;
            dgw.isValidTarget(highTargetBits, blocks, blockTime = -1);
            }).to.throw('TODO add error message');
        });
        */

    it('should be valid when timestamp for some blocks grater then next one. no verification', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks));
      blocks2.forEach((value) => {
        if (Math.random() >= 0.2) {
          const v = value;
          v.timestamp += 2000;
        }
      });
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid when timestamp is 0', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks));
      blocks2.forEach((value) => {
        const v = value;
        v.timestamp = 0;
      });
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid when reverse block array(reversed timestamp)', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid when timestamp for last block is too big', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
      blocks2[blocks2.length - 1].timestamp += 2000000000;
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid when first and last block with small timestamp diff', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
      // 1 seconds between blocks
      blocks2[blocks2.length - 24].timestamp = blocks2[blocks2.length - 1].timestamp - 24;
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid when first and last block with diff in (blocks.length) * blockTime/3.0', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
      // eslint-disable-next-line operator-linebreak
      blocks2[blocks2.length - 24].timestamp =
          blocks2[blocks2.length - 1].timestamp - ((24 * 150) / 3.0);
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid when first and last block with diff in (blocks.length) * blockTime*3.0', () => {
      const highTargetBits = 0x1b0777d4;
      const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
      // eslint-disable-next-line operator-linebreak
      blocks2[blocks2.length - 24].timestamp =
          blocks2[blocks2.length - 1].timestamp - (24 * 150 * 3.0);
      const result = dgw.isValidTarget(highTargetBits, blocks2, 'devnet');
      expect(result).to.equal(true);
    });

    it('should work with mainnet headers', () => {
      const highTargetBits = 0x19514193;
      const result = dgw.isValidTarget(highTargetBits, mainnetBlocks);
      expect(result).to.equal(true);
    });
  });
});
