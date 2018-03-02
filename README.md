# dark-gravity-wave

> Computes the difficulty of the dark-gravity-wave.

## Installation

```
$ npm install --S dark-gravity-wave-js
```

## Usage

```js
var dgw = require('dark-gravity-wave');

dgw.getTarget(lastHeaders);
// -> '1be4c4d3'

```

## API

### getTarget(array)

#### array

Type: `array`

Get the difficulty.  The array must contain the last 24 blocks. Arrays with length > 24 are allowed however only latest 24 will be considered.
Array objects must contain 

### getTarget(array,blockTime)

#### array

Type: `array`, `int` (default 150)

Get the difficulty for dark-gravity-wave's other than dash's 150 second block time.
