# dark-gravity-wave

> Computes the difficulty of the dark-gravity-wave.

## Installation

```
$ npm install --save dark-gravity-wave-js
```

## Usage

```js
var dgw = require('dark-gravity-wave');

dgw.difficulty(lastInputs);
// -> '4da3b7c5ff698c6546564ebc72204f31885cd87b75b2b3ca5a93b5d75db85b8c'

```

## API

### difficulty(array)

#### array

Type: `array`

Get the difficulty.  The array must contain the last 25 blocks.

### difficulty(array,blockTime)

#### array

Type: `array`, `int` (default 150)

Get the difficulty for dark-gravity-wave's other than dash's 150 second block time.