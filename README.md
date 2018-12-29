# dark-gravity-wave-js

[![Build Status](https://travis-ci.com/dashevo/dark-gravity-wave-js.svg?branch=master)](https://travis-ci.com/dashevo/dark-gravity-wave-js)

> Dark Gravity Wave difficulty retarget algorithm in JavaScript

## Install

```sh
npm install @dashevo/dark-gravity-wave
```

## Usage

```js
var dgw = require('@dashevo/dark-gravity-wave');

dgw.getTarget(lastHeaders);
// -> '1be4c4d3'
```

## API

### getTarget(array)

#### array

Type: `array`

Get the difficulty.  The array must contain the last 24 blocks. Arrays with length > 24 are allowed however only latest 24 will be considered.
Array objects must contain *timestamp* and *target* properties (where target = the difficulty at which the block has been solved)

### getTarget(array,blockTime)

#### array

Type: `array`, `int` (default 150)

Get the difficulty for dark-gravity-wave's other than dash's 150 second block time.

## Contributing

Feel free to dive in! [Open an issue](https://github.com/dashevo/dark-gravity-wave-js/issues/new) or submit PRs.

## License

[MIT](LICENSE) &copy; Dash Core Group, Inc.
