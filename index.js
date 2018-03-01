/* eslint new-cap: 0 */
const u256 = require('./lib/u256');

const maxBlocks = 24;

// Todo: this is a strange impl but this is per original logic (needs review)
function getDarkTarget(blocks) {
  function reducer(sum, b) {
    const toAdd = (new u256());
    toAdd.setCompact(b.target);
    return sum.add(toAdd);
  }

  const start = new u256();
  start.setCompact(blocks[0].target);
  return blocks.reduce(reducer, start).divide(blocks.length + 1);
}

/**
* @param {Array} blocks - An array of blocks having height, target, imestamp property
* @params {Int} [blockTime=150] - A block time value
* @return {Int} compact - The difficulty value
* current difficulty formula, dash - based on DarkGravity v3, original work done by evan duffield, modified for javascript
*/
module.exports.getTarget = function getTarget(allHeaders, blockTime = 150) {
  const blocks = allHeaders.slice(Math.max(allHeaders.length - maxBlocks, 0)).reverse(); // limit to 24

  const nTargetTimespan = (blocks.length) * blockTime;
  let nActualTimespan = blocks[0].timestamp - blocks[blocks.length - 1].timestamp;
  nActualTimespan = Math.min(Math.max(nActualTimespan, nTargetTimespan / 3.0), nTargetTimespan * 3.0);

  let darkTarget = getDarkTarget(blocks);
  darkTarget = darkTarget.multiplyWithInteger(nActualTimespan).divide(nTargetTimespan);

  return Math.min(darkTarget.getCompact(), 0x1e0ffff0); // prevent lower than certain difficulty
};
