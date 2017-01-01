# dark-gravity-wave

> Computes the difficulty of the dark-gravity-wave.

## Installation

```
$ npm install --S dark-gravity-wave-js
```

## Usage

```js
var dgw = require('dark-gravity-wave');

dgw.darkGravityWaveTargetWithBlocks(lastInputs);
// -> '1be4c4d3'

```

## API

### darkGravityWaveTargetWithBlocks(array)

#### array

Type: `array`

Get the difficulty.  The array must contain the last 25 blocks.

### darkGravityWaveTargetWithBlocks(array,blockTime)

#### array

Type: `array`, `int` (default 150)

Get the difficulty for dark-gravity-wave's other than dash's 150 second block time.
