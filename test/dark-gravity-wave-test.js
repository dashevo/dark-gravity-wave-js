const { expect } = require('chai');
const dgw = require('../');

let timestamp = 0;
let blocks = [];

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

const testnetBlocks = [
  {
    height: 90000,
    timestamp: 1556653011,
    target: 0x1c00e3a7,
  },
  {
    height: 90001,
    timestamp: 1556653066,
    target: 0x1c00efb1,
  },
  {
    height: 90002,
    timestamp: 1556653101,
    target: 0x1c00f229,
  },
  {
    height: 90003,
    timestamp: 1556653117,
    target: 0x1c00f077,
  },
  {
    height: 90004,
    timestamp: 1556653330,
    target: 0x1c00f0bd,
  },
  {
    height: 90005,
    timestamp: 1556653367,
    target: 0x1c00ef4a,
  },
  {
    height: 90006,
    timestamp: 1556653563,
    target: 0x1c00de58,
  },
  {
    height: 90007,
    timestamp: 1556653788,
    target: 0x1c00cbc2,
  },
  {
    height: 90008,
    timestamp: 1556654197,
    target: 0x1c00c849,
  },
  {
    height: 90009,
    timestamp: 1556654357,
    target: 0x1c00d993,
  },
  {
    height: 90010,
    timestamp: 1556654367,
    target: 0x1c00e334,
  },
  {
    height: 90011,
    timestamp: 1556654397,
    target: 0x1c00de15,
  },
  {
    height: 90012,
    timestamp: 1556654464,
    target: 0x1c00cf7d,
  },
  {
    height: 90013,
    timestamp: 1556654887,
    target: 0x1c00c0a4,
  },
  {
    height: 90014,
    timestamp: 1556654998,
    target: 0x1c00c46e,
  },
  {
    height: 90015,
    timestamp: 1556655085,
    target: 0x1c00c525,
  },
  {
    height: 90016,
    timestamp: 1556655752,
    target: 0x1c07b372,
  },
  {
    height: 90017,
    timestamp: 1556655854,
    target: 0x1c016de0,
  },
  {
    height: 90018,
    timestamp: 1556655903,
    target: 0x1c01353a,
  },
  {
    height: 90019,
    timestamp: 1556656107,
    target: 0x1c012f39,
  },
  {
    height: 90020,
    timestamp: 1556656185,
    target: 0x1c014156,
  },
  {
    height: 90021,
    timestamp: 1556656218,
    target: 0x1c0140f8,
  },
  {
    height: 90022,
    timestamp: 1556656492,
    target: 0x1c014658,
  },
  {
    height: 90023,
    timestamp: 1556656579,
    target: 0x1c015945,
  },
  {
    height: 90024,
    timestamp: 1556656719,
    target: 0x1c014225,
  },
];

const devnetBlocks = [{
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
  describe('Regtest/Devnet difficulty calculation', () => {
    before(() => {
      blocks = devnetBlocks.slice(0, 24);
      timestamp = 1438531991;
    });
    it('should work with devnet/regtest target', () => {
      const highTargetBits = 0x1b1777d4;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(true);
    });

    it('should be invalid for any other target', () => {
      const highTargetBits = 0x1b1777d5;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should be valid for the max regtest target if less than 24 blocks have been mined', () => {
      const highTargetBits = 0x207fffff;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks.slice(0, 23), 'devnet');
      expect(result).to.equal(true);
    });

    it('should be valid when num blocks < maxBlocks and maxTarget = 0x207fffff', () => {
      const highTargetBits = 0x207fffff;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks.slice(0, 10), 'devnet');
      expect(result).to.equal(true);
    });

    it('should be invalid when allHeaders is empty array', () => {
      const highTargetBits = 0x1b1777d4;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, [{}], 'devnet');
      expect(result).to.equal(false);
    });

    it('should throw error for allHeaders is {}', () => {
      const highTargetBits = 0x208fffff;
      const header = { target: highTargetBits, timestamp };
      expect(() => {
        dgw.hasValidTarget(header, {}, 'devnet');
      }).to.throw('allHeaders.slice is not a function');
    });

    it('should throw error for allHeaders is string > 25 chars', () => {
      const highTargetBits = 0x1b0777d4;
      const header = { target: highTargetBits, timestamp };
      expect(() => {
        dgw.hasValidTarget(header, 's'.repeat(26), 'devnet');
      }).to.throw('allHeaders.slice(...).reverse is not a function');
    });

    it('should be invalid if target is undefined', () => {
      const bits = undefined;
      const header = { target: bits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should be invalid if target is boolean', () => {
      const bits = true;
      const header = { target: bits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should be invalid when timestamp values not specified', () => {
      const highTargetBits = 0x1b1777d4;
      const header = { target: highTargetBits, timestamp };
      const blocks2 = JSON.parse(JSON.stringify(blocks));
      blocks2.forEach((value) => {
        const v = value;
        delete v.timestamp;
      });
      const result = dgw.hasValidTarget(header, blocks2, 'devnet');
      expect(result).to.equal(false);
    });

    it('should be invalid when timestamp is 0', () => {
      const highTargetBits = 0x1b0777d4;
      const header = { target: highTargetBits, timestamp };
      const blocks2 = JSON.parse(JSON.stringify(blocks));
      blocks2.forEach((value) => {
        const v = value;
        v.timestamp = 0;
      });
      const result = dgw.hasValidTarget(header, blocks2, 'devnet');
      expect(result).to.equal(false);
    });

    it('should be invalid when timestamp for last block is too big', () => {
      const highTargetBits = 0x1b1777d4;
      const header = { target: highTargetBits, timestamp };
      const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
      blocks2[blocks2.length - 1].timestamp += 2000000000;
      const result = dgw.hasValidTarget(header, blocks2, 'devnet');
      expect(result).to.equal(false);
    });

    it('should have target below max target with timestamp (10m+1sec)', () => {
      timestamp = 1438531999 + 601;
      const highTargetBits = 0x207fffff;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should have target below max target with timestamp (20m)', () => {
      timestamp = 1438531999 + 1200;
      const highTargetBits = 0x207fffff;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should have lowest diff with timestamp (2h+1sec)', () => {
      timestamp = 1438531999 + 7201;
      const highTargetBits = 0x207fffff;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(true);
    });

    it('should have lowest diff with timestamp (3h)', () => {
      timestamp = 1438531999 + (3 * 60 * 60);
      const highTargetBits = 0x207fffff;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(true);
    });
  });

  describe('Testnet difficulty calculation', () => {
    before(() => {
      blocks = testnetBlocks.slice(0, 24);
      timestamp = 1438531991;
    });

    it('should work with testnet headers', () => {
      const highTargetBits = 0x1c014225;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks);
      expect(result).to.equal(true);
    });

    it('should be invalid for any other testnet target', () => {
      const highTargetBits = 0x1c014226;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should have same result with timestamp (10m+1sec)', () => {
      timestamp = 1438532592;
      const highTargetBits = 0x1c014225;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'testnet');
      expect(result).to.equal(true);
    });

    it('should have same result with timestamp (20m)', () => {
      timestamp = 1438533191;
      const highTargetBits = 0x1c014225;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'testnet');
      expect(result).to.equal(true);
    });

    it('should have lowest diff with timestamp (2h+1sec)', () => {
      timestamp = 1438539192;
      const highTargetBits = 0x1e0ffff0;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'testnet');
      expect(result).to.equal(false);
    });

    it('should have lowest diff with timestamp (3h)', () => {
      timestamp = 1438542791;
      const highTargetBits = 0x1e0ffff0;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'testnet');
      expect(result).to.equal(false);
    });
  });

  describe('Mainnet difficulty calculation', () => {
    before(() => {
      blocks = mainnetBlocks.slice(0, 24);
      timestamp = 1546798810;
    });

    it('should work with mainnet headers', () => {
      const highTargetBits = 0x19514193;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks);
      expect(result).to.equal(true);
    });

    it('should be invalid for any other mainnet target', () => {
      const highTargetBits = 0x19514194;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks, 'devnet');
      expect(result).to.equal(false);
    });

    it('should have same result with timestamp (10m+1sec)', () => {
      timestamp = 1546798603;
      const highTargetBits = 0x19514193;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks);
      expect(result).to.equal(true);
    });

    it('should have same result with timestamp (20m)', () => {
      timestamp = 1546799803;
      const highTargetBits = 0x19514193;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks);
      expect(result).to.equal(true);
    });

    it('should not have lowest diff with timestamp (2h+1sec)', () => {
      timestamp = 1546805804;
      const highTargetBits = 0x1e0ffff0;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks);
      expect(result).to.equal(false);
    });

    it('should not have lowest diff with timestamp (3h)', () => {
      timestamp = 1546809403;
      const highTargetBits = 0x1e0ffff0;
      const header = { target: highTargetBits, timestamp };
      const result = dgw.hasValidTarget(header, blocks);
      expect(result).to.equal(false);
    });
  });
});
