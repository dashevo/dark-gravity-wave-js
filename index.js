/* eslint new-cap: 0 */
// const u256 = require('./lib/u256');
const getDoubleFrom256 = require('./lib/utils/getDoubleFrom256');

const maxBlocks = 24;

// Using regtest targets according to Bitcoin specifications
// Todo: adapt to allow for test/mainnet targets (0x1d00ffff)
const maxTarget = 0x207fffff;

function getDarkTarget(blocks) {
  return blocks.reduce((sum, b) => sum + getDoubleFrom256(b.target), 0.0) / (blocks.length + 1);
}

/**
* @param {Array} blocks - An array of blocks having target and timestamp property
* @params {Int} [blockTime=150] - A block time value
* @return {Int} compact - The difficulty value
* current difficulty formula, dash - based on DarkGravity v3
* original work done by evan duffield, modified for javascript
*/
function getTarget(allHeaders, blockTime) {
  if (allHeaders.length < maxBlocks) return getDoubleFrom256(maxTarget);

  const blocks = allHeaders.slice(Math.max(allHeaders.length - maxBlocks, 0)).reverse();

  const timeSpanTarget = (blocks.length) * blockTime;
  const nActualTimespan = Math.min(
    Math.max(blocks[0].timestamp - blocks[blocks.length - 1].timestamp, timeSpanTarget / 3.0),
    timeSpanTarget * 3.0,
  );

  const darkTarget = ((getDarkTarget(blocks) * nActualTimespan) / timeSpanTarget);

  // Prevent too high target (ie too low difficulty)
  const maxTargetAsDouble = getDoubleFrom256(maxTarget);
  return Math.min(darkTarget, maxTargetAsDouble);
}

function isValidTarget(headerBits, allHeaders, blockTime = 150) {
  return getDoubleFrom256(headerBits) <= getTarget(allHeaders, blockTime);
}

module.exports = {
  isValidTarget,
};
