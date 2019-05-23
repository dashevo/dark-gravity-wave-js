/* eslint new-cap: 0 */
const u256 = require('./lib/u256');

const maxBlocks = 24;
const maxTargetMainnet = 0x1e0ffff0;
const maxTargetRegtest = 0x207fffff;

// Dash blocktime: 2.5 minutes
const powTargetSpacing = 2.5 * 60;

function getDarkTarget(blocks) {
  const blocksU256 = blocks.map((b) => {
    const target = new u256();
    target.setCompact(b.target);
    return target;
  });
  const averageTarget = blocksU256.reduce((sum, b) => sum.add(b), blocksU256[0]);
  return averageTarget.divide(blocks.length + 1);
}

const getNetworkParams = (network) => {
  switch (network) {
    case 'mainnet':
      return { maxTarget: maxTargetMainnet, allowMinDifficultyBlocks: false };
    case 'livenet':
      return { maxTarget: maxTargetMainnet, allowMinDifficultyBlocks: false };
    case 'testnet':
      return { maxTarget: maxTargetMainnet, allowMinDifficultyBlocks: true };
    case 'devnet':
      return { maxTarget: maxTargetRegtest, allowMinDifficultyBlocks: true };
    case 'regtest':
      return { maxTarget: maxTargetRegtest, allowMinDifficultyBlocks: true };
    default:
      return { maxTarget: maxTargetMainnet, allowMinDifficultyBlocks: false };
  }
};

/**
* @param {Array} allHeaders - An array of blocks having target and timestamp property
* @param {object} newHeader - a block header
* @param {string} [network='mainnet'] - a block time value
* @return {int} compact - the difficulty value
* current difficulty formula, dash - based on DarkGravity v3
* https://github.com/dashpay/dash/blob/master/src/pow.cpp#L186-L204 and
* https://github.com/dashpay/dash/blob/master/src/pow.cpp#L82-L145
* original work done by Evan Duffield, modified for javascript
*/
function getTarget(allHeaders, newHeader, network = 'mainnet') {
  const { maxTarget, allowMinDifficultyBlocks } = getNetworkParams(network);

  if (allHeaders.length < maxBlocks) return maxTarget;

  const blocks = allHeaders.slice(Math.max(allHeaders.length - maxBlocks, 0)).reverse();

  if (allowMinDifficultyBlocks) {
    // most recent block is more than 2 hours old
    if (newHeader.timestamp > blocks[0].timestamp + (2 * 60 * 60)) {
      return maxTarget;
    }
    // most recent block is more than 10 minutes old
    if (newHeader.timestamp > blocks[0].timestamp + (powTargetSpacing * 4)) {
      let bnNew = new u256();
      bnNew.setCompact(blocks[0].target);
      bnNew = bnNew.multiplyWithInteger(10);
      const uMaxTarget = new u256();
      uMaxTarget.setCompact(maxTarget);
      if (bnNew.getCompact() > uMaxTarget.getCompact()) {
        bnNew = uMaxTarget;
      }
      return bnNew.getCompact();
    }
  }
  // nTargetTimespan is the time that the blocks should have taken to be generated.
  const nTargetTimespan = blocks.length * powTargetSpacing;

  // limit the re-adjustment to 3x or 0.33x
  const nActualTimespan = Math.min(
    Math.max(blocks[0].timestamp - blocks[blocks.length - 1].timestamp, nTargetTimespan / 3.0),
    nTargetTimespan * 3.0,
  );

  // Calculate the new difficulty based on actual and target timespan.
  const darkTarget = getDarkTarget(blocks)
    .multiplyWithInteger(nActualTimespan).divide(nTargetTimespan);
  return Math.min(darkTarget.getCompact(), maxTarget);
}

function hasValidTarget(newHeader, previousHeaders, network = 'mainnet') {
  return newHeader.target === getTarget(previousHeaders, newHeader, network);
}

module.exports = {
  hasValidTarget,
};
