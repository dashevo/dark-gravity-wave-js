/* eslint new-cap: 0 */
const u256 = require('./lib/u256');

const maxBlocks = 24;
const maxTarget = 0x1e0fffff;

function getDarkTarget(blocks) {
  const start = new u256();
  start.setCompact(blocks[0].target);

  return blocks
    .reduce((sum, b) => {
      const toAdd = new u256();
      toAdd.setCompact(b.target);
      return sum.add(toAdd);
    }, start)
    .divide(blocks.length + 1);
}

/**
* @param {Array} blocks - An array of blocks having height, target, imestamp property
* @params {Int} [blockTime=150] - A block time value
* @return {Int} compact - The difficulty value
* current difficulty formula, dash - based on DarkGravity v3
* original work done by evan duffield, modified for javascript
*/
const getTarget = function getTarget(allHeaders, blockTime = 150) {
  if (allHeaders.length < maxBlocks) return maxTarget;

  const blocks = allHeaders.slice(Math.max(allHeaders.length - maxBlocks, 0)).reverse();

  const timeSpanTarget = (blocks.length) * blockTime;
  const nActualTimespan = Math.min(
    Math.max(blocks[0].timestamp - blocks[blocks.length - 1].timestamp, timeSpanTarget / 3.0),
    timeSpanTarget * 3.0,
  );

  const darkTarget = getDarkTarget(blocks)
    .multiplyWithInteger(nActualTimespan)
    .divide(timeSpanTarget)
    .getCompact();

  // Prevent too high target (ie too low difficulty)
  // eslint-disable-next-line no-bitwise
  const target = (darkTarget >>> 1) > 0xF07FFF8 ? maxTarget : darkTarget;

  return target;
};

module.exports = {
  getTarget,
};
