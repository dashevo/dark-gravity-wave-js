const u256 = require('./lib/u256');

const maxBlocks = 25;

/**
* @param {Array} blocks - An array of blocks having height, target, imestamp property
* @params {Int} [blockTime=150] - A block time value
* @return {Int} compact - The difficulty value
* current difficulty formula, dash - based on DarkGravity v3, original work done by evan duffield, modified for javascript
*/
module.exports.getTarget = function getTarget(allHeaders, blockTime = 150) {
  const blocks = allHeaders.slice(Math.max(allHeaders.length - maxBlocks, 1)); // limit to 25
  let currentBlock = blocks.pop();

  let nActualTimespan = 0;
  let lastBlockTime = 0;
  let blockCount = 0;
  let sumTargets = new u256();

  // loop over the past n blocks, where n == PastBlocksMax
  for (blockCount = 1; currentBlock && currentBlock.height > 0 && blockCount <= 24; blockCount++) {
    // Calculate average difficulty based on the blocks we iterate over in this for loop
    const currentTarget = new u256();
    currentTarget.setCompact(currentBlock.target);
    if (blockCount === 1) {
      sumTargets = currentTarget.plus(currentTarget);
    } else {
      sumTargets.add(currentTarget);
    }

    // If this is the second iteration (LastBlockTime was set)
    if (lastBlockTime > 0) {
      // Calculate time difference between previous block and current block
      const currentBlockTime = currentBlock.timestamp;
      const diff = ((lastBlockTime) - (currentBlockTime));
      // Increment the actual timespan
      nActualTimespan += diff;
    }
    // Set lastBlockTime to the block time for the block in current iteration
    lastBlockTime = currentBlock.timestamp;

    currentBlock = blocks.pop();
  }
  // darkTarget is the difficulty
  let darkTarget = sumTargets.divide(blockCount);

  // nTargetTimespan is the time that the CountBlocks should have taken to be generated.
  const nTargetTimespan = (blockCount - 1) * blockTime;
  // Limit the re-adjustment to 3x or 0.33x
  // We don't want to increase/decrease diff too much.
  if (nActualTimespan < nTargetTimespan / 3.0) { nActualTimespan = nTargetTimespan / 3.0; }
  if (nActualTimespan > nTargetTimespan * 3.0) { nActualTimespan = nTargetTimespan * 3.0; }

  // Calculate the new difficulty based on actual and target timespan.
  const wew = darkTarget.multiplyWithInteger(Math.floor(nActualTimespan));
  const aas = wew.divide(nTargetTimespan);
  darkTarget = darkTarget.multiplyWithInteger(Math.floor(nActualTimespan)).divide(nTargetTimespan);

  let compact = darkTarget.getCompact();

  // If calculated difficulty is lower than the minimal diff, set the new difficulty to be the minimal diff.
  if ((compact >>> 1) > 0xF07FFF8) {
    compact = 0x1e0ffff0;
  }

  // Return the new diff.
  return compact;
};
