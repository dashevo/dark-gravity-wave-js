'use strict';

var u256 = require("./lib/u256");

module.exports.darkGravityWaveTargetWithBlocks = function(blocks, blockTime) {
    /* current difficulty formula, dash - based on DarkGravity v3, original work done by evan duffield, modified for javascript */
    blocks = blocks.slice();
    var previousBlock = blocks.pop();

    if (!blockTime) blockTime = 2.5; //Dash default

    var nActualTimespan = 0;
    var lastBlockTime = 0;
    var blockCount = 0;
    var sumTargets = new u256();

    if (previousBlock.height == 0 || previousBlock.height < 24) {
        // This is the first block or the height is < PastBlocksMin
        // Return minimal required work. (1e0ffff0)
        return 0x1e0ffff0;
    }

    var currentBlock = previousBlock;
    // loop over the past n blocks, where n == PastBlocksMax
    for (blockCount = 1; currentBlock && currentBlock.height > 0 && blockCount <= 24; blockCount++) {

        // Calculate average difficulty based on the blocks we iterate over in this for loop
        if (blockCount <= 24) {
            var currentTarget = new u256();
            currentTarget.setCompact(currentBlock.target);
            if (blockCount === 1) {
                sumTargets = currentTarget.plus(currentTarget);
            }
            else {
                sumTargets.add(currentTarget);
            }
        }

        // If this is the second iteration (LastBlockTime was set)
        if (lastBlockTime > 0) {
            // Calculate time difference between previous block and current block
            var currentBlockTime = currentBlock.timestamp;
            var diff = ((lastBlockTime) - (currentBlockTime));
            // Increment the actual timespan
            nActualTimespan += diff;
        }
        // Set lastBlockTime to the block time for the block in current iteration
        lastBlockTime = currentBlock.timestamp;

        currentBlock = blocks.pop();
    }
    // darkTarget is the difficulty
    var darkTarget = sumTargets.divide(blockCount);

    // nTargetTimespan is the time that the CountBlocks should have taken to be generated.
    var nTargetTimespan = (blockCount - 1) * 60 * blockTime;
    // Limit the re-adjustment to 3x or 0.33x
    // We don't want to increase/decrease diff too much.
    if (nActualTimespan < nTargetTimespan / 3.0)
        nActualTimespan = nTargetTimespan / 3.0;
    if (nActualTimespan > nTargetTimespan * 3.0)
        nActualTimespan = nTargetTimespan * 3.0;

    // Calculate the new difficulty based on actual and target timespan.
    var wew = darkTarget.multiplyWithInteger(Math.floor(nActualTimespan));
    var aas = wew.divide(nTargetTimespan);
    darkTarget = darkTarget.multiplyWithInteger(Math.floor(nActualTimespan)).divide(nTargetTimespan);

    var compact = darkTarget.getCompact();

    // If calculated difficulty is lower than the minimal diff, set the new difficulty to be the minimal diff.
    if ((compact >>> 1) > 0x1e0ffff) {
        compact = 0x1e0ffff0;
    }

    // Return the new diff.
    return compact;
}