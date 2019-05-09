/* eslint new-cap: 0 */
// const u256 = require('./lib/u256');
const getDoubleFrom256 = require('./lib/utils/getDoubleFrom256');

const maxBlocks = 24;

const maxTargetMainnet = 0x1e0ffff0;
const maxTargetRegtest = 0x207fffff;

function getDarkTarget(blocks) {
  return blocks.reduce((sum, b) => sum + getDoubleFrom256(b.target), 0.0) / (blocks.length + 1);
}

const getMaxTarget = (network) => {
  switch (network) {
    case 'mainnet':
      return maxTargetMainnet;
    case 'livenet':
      return maxTargetMainnet;
    case 'testnet':
      return maxTargetMainnet;
    case 'devnet':
      return maxTargetRegtest;
    case 'regtest':
      return maxTargetRegtest;
    default:
      return maxTargetMainnet;
  }
};

/**
* @param {Array} allHeaders - An array of blocks having target and timestamp property
* @param {int} blockTime - A block time value
* @param {string} [network='mainnet'] - A block time value
* @return {int} compact - The difficulty value
* current difficulty formula, dash - based on DarkGravity v3
* original work done by Evan Duffield, modified for javascript
*/
function getTarget(allHeaders, blockTime, network = 'mainnet') {
  const maxTarget = getMaxTarget(network);

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

function isValidTarget(headerBits, allHeaders, network = 'mainnet', blockTime = 150) {
  return getDoubleFrom256(headerBits) <= getTarget(allHeaders, blockTime, network);
}

module.exports = {
  isValidTarget,
};
