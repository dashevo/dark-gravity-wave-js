# dark-gravity-wave-js

[![Build Status](https://travis-ci.com/dashevo/dark-gravity-wave-js.svg?branch=master)](https://travis-ci.com/dashevo/dark-gravity-wave-js)
[![NPM version](https://img.shields.io/npm/v/@dashevo/dark-gravity-wave.svg)](https://npmjs.org/package/@dashevo/dark-gravity-wave)

> Dark Gravity Wave difficulty retargeting algorithm in JavaScript

## Install

```sh
npm install @dashevo/dark-gravity-wave
```

## Usage

```js
const dgw = require('@dashevo/dark-gravity-wave');

dgw.hasValidTarget(header, previousHeaders, 'testnet');
// -> true or false
```

## API

### hasValidTarget(header, previousHeaders, [network = 'mainnet'])

#### header

Type: `object`

#### previousHeaders

Type: `array`

#### network

Type: `string` (optional, default = 'mainnet')

Validates the target (bits) property of a block header. The 2nd argument, the array of most recent previous headers, must contain block header objects of the last 24 blocks. Arrays with length > 24 are allowed however only the latest 24 will be considered.
The block header objects must contain *timestamp* and *target* properties (nBits field of the block header)


## Contributing

Feel free to dive in! [Open an issue](https://github.com/dashevo/dark-gravity-wave-js/issues/new) or submit PRs.

## License

[MIT](LICENSE) &copy; Dash Core Group, Inc.
