const u256 = require('./lib/u256');

const maxBlocks = 24;

/**
* @param {Array} blocks - An array of blocks having height, target, imestamp property
* @params {Int} [blockTime=150] - A block time value
* @return {Int} compact - The difficulty value
* current difficulty formula, dash - based on DarkGravity v3, original work done by evan duffield, modified for javascript
*/
module.exports.getTarget = function getTarget(allHeaders, blockTime = 150) {
  const blocks = allHeaders.slice(Math.max(allHeaders.length - maxBlocks, 0)).reverse(); // limit to 24
  let nActualTimespan = blocks[0].timestamp - blocks[blocks.length - 1].timestamp;

  // Todo: this is a strange impl but this is per original logic
  const tmp = new u256();
  tmp.setCompact(blocks[0].target);
  const tmpSumTarget = tmp.plus(tmp);

  function reducer(sum, b) {
    const toAdd = new u256();
    toAdd.setCompact(b.target);
    return sum.add(toAdd);
  }

  let darkTarget = blocks.slice(1, blocks.length + 2).reduce(reducer, tmpSumTarget).divide(blocks.length + 1);

  // nTargetTimespan is the time that the CountBlocks should have taken to be generated.
  const nTargetTimespan = (blocks.length) * blockTime;
  // Limit the re-adjustment to 3x or 0.33x
  // We don't want to increase/decrease diff too much.
  if (nActualTimespan < nTargetTimespan / 3.0) { nActualTimespan = nTargetTimespan / 3.0; }
  if (nActualTimespan > nTargetTimespan * 3.0) { nActualTimespan = nTargetTimespan * 3.0; }

  // Calculate the new difficulty based on actual and target timespan.
  darkTarget = darkTarget.multiplyWithInteger(nActualTimespan).divide(nTargetTimespan);

  let compact = darkTarget.getCompact();

  // If calculated difficulty is lower than the minimal diff, set the new difficulty to be the minimal diff.
  if ((compact >>> 1) > 0xF07FFF8) {
    compact = 0x1e0ffff0;
  }

  // Return the new diff.
  return compact;
};
