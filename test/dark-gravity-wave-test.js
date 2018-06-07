const dgw = require('../');
const {expect} = require('chai');

const blocks = [{
    height: 312667,
    target: 0x1b193a68,//
    timestamp: 1438528803,
}, {
    height: 312668,
    target: 0x1b1940c9,//454639817
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
            const result = dgw.isValidTarget(highTargetBits, blocks);
            expect(result).to.equal(true);
        });

        it('should be invalid for too high target', () => {
            const highTargetBits = 0x208fffff;
            const result = dgw.isValidTarget(highTargetBits, blocks);
            expect(result).to.equal(false);
        });

        it('should be valid for the max regtest target if less than 25 blocks has been mined', () => {
            const highTargetBits = 0x207fffff;
            const result = dgw.isValidTarget(highTargetBits, blocks.slice(0, 10));
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
            const result = dgw.isValidTarget(highTargetInt, blocks.slice(0, 10));
            expect(result).to.equal(true);
        });

        it('should be invalid maxTarget = 0x207fffff as int', () => {
            const highTargetInt = 545259519;
            const result = dgw.isValidTarget(highTargetInt, blocks);
            expect(result).to.equal(false);
        });

        it('should be valid for maxTarget > 0x207fffff', () => {
            const highTargetInt = 0x20800000;
            const result = dgw.isValidTarget(highTargetInt, blocks);
            expect(result).to.equal(true);
        });

        it('should be valid for maxTarget > 0x207fffff as int', () => {
            const highTargetInt = 0x20800000;
            const result = dgw.isValidTarget(highTargetInt, blocks);
            expect(result).to.equal(true);
        });

        it('should be valid when allHeaders is empty array', () => {
            const highTargetInt = 0x20800000;
            const result = dgw.isValidTarget(highTargetInt, [{}]);
            expect(result).to.equal(true);
        });

        it('should throw error for allHeaders is {}', () => {
            const highTargetBits = 0x208fffff;
            expect(() => {
                dgw.isValidTarget(highTargetBits, {});
            }).to.throw('allHeaders.slice is not a function');
        });

        /* https://dashpay.atlassian.net/browse/EV-897
        it('should throw error for allHeaders is string', () => {
            // TODO not very good that we allow string although it's length < 25 and ignored in getTarget
            const highTargetBits = 0x1b0777d4;
            expect(() => {
                dgw.isValidTarget(highTargetBits, 'my_string');
            }).to.throw('allHeaders.slice is not a function. TODO change message');
        });
        */

        it('should throw error for allHeaders is string > 25 chars', () => {
            const highTargetBits = 0x1b0777d4;
            expect(() => {
                dgw.isValidTarget(highTargetBits, 's'.repeat(26));
            }).to.throw('allHeaders.slice(...).reverse is not a function');
        });

        it('should throw error for signed int', () => {
            expect(() => {
                dgw.isValidTarget(-1, blocks);
            }).to.throw('byte array longer than desired length');
        });

        it('should throw error when compact is undefined', () => {
            expect(() => {
                dgw.isValidTarget(undefined, blocks);
            }).to.throw('Compact of type undefined not supported');
        });

        it('should throw error when compact is boolean', () => {
            expect(() => {
                dgw.isValidTarget(true, blocks);
            }).to.throw('Compact of type boolean not supported');
        });

        it('height values ignored in calculation in getTarget function', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks));
            blocks2.forEach(function (value) {
                delete value["height"];
            });
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });

        it('height values ignored in calculation in getTarget function: the same values', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks));
            var temp = blocks2[0]["height"]
            blocks2.forEach(function (value) {
                value["height"] = temp;
            });
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });


        it('should throw error when compact is not defined in blocks', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks));
            blocks2.forEach(function (value) {
                delete value["target"];
            });
            expect(() => {
                dgw.isValidTarget(highTargetBits, blocks2);
            }).to.throw('Compact of type undefined not supported');
        });

        it('should be invalid when timestamp values not specified', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks));
            blocks2.forEach(function (value) {
                delete value["timestamp"];
            });
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(false);
        });

        it('should be invalid for blockTime=0', () => {
            const highTargetBits = 0x1b0777d4;
            const result = dgw.isValidTarget(highTargetBits, blocks, blockTime = 0);
            expect(result).to.equal(false);
        });

        /*
        it('should be invalid for blockTime negative', () => {//TODO We should not allow negative blockTime - agree
            const highTargetBits = 0x1b0777d4;
            dgw.isValidTarget(highTargetBits, blocks, blockTime = -1);
            }).to.throw('TODO add error message');
        });
        */

        it('should be valid when timestamp for some blocks grater then next one. no verification', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks));
            blocks2.forEach(function (value) {
                if (Math.random() >= 0.2) {
                    value["timestamp"] += 2000
                }
            });
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });

        it('should be valid when timestamp is 0', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks));
            blocks2.forEach(function (value) {
                value["timestamp"] = 0
            });
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });

        it('should be valid when reverse block array(reversed timestamp)', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });

        it('should be valid when timestamp for last block is too big', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
            blocks2[blocks2.length - 1]["timestamp"] += 2000000000;
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });

        it('should be valid when first and last block with small timestamp diff', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
            // 1 seconds between blocks
            blocks2[blocks2.length - 24]["timestamp"] = blocks2[blocks2.length - 1]["timestamp"] - 24;
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });

        it('should be valid when first and last block with diff in (blocks.length) * blockTime/3.0', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
            blocks2[blocks2.length - 24]["timestamp"] = blocks2[blocks2.length - 1]["timestamp"] - 24 * 150 / 3.0;
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });

        it('should be valid when first and last block with diff in (blocks.length) * blockTime*3.0', () => {
            const highTargetBits = 0x1b0777d4;
            const blocks2 = JSON.parse(JSON.stringify(blocks)).reverse();
            blocks2[blocks2.length - 24]["timestamp"] = blocks2[blocks2.length - 1]["timestamp"] - 24 * 150 * 3.0;
            const result = dgw.isValidTarget(highTargetBits, blocks2);
            expect(result).to.equal(true);
        });


    });
});
