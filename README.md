# Emitify [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Dead simple event emitter.

## Install

```
npm i emitify --save
bower i emitify --save
```

## API

What you should do first is create new instance of `emitify` with 

```js
const emitify = Emitify();
```

Than you could just use API as it is.

### emitter.on(event, callback)

Add `callback` listener to `event`.

### emitter.off(event, callback)

Remove `callback` listener from `event`.

### emitter.emit(event [, data1, data2, ..., dataN])

Emit `event` with (or without) data.

### emitter.addListener(event, callback)

Alias to `emitter.on`.

### emitter.removeListener(event, callback)

Alias to `emitter.off`.

### emitter.removeAllListeners(event)

Removes all listeners related to `event`.

## How to use?

```js
const Emitify = require('emitify');
const emitter = new Emitify();
const log = (data) => {
    console.log(data);
});

emitter.on('data', log);

emitter.emit('data', 'hello');

emitter.off('data', log);
```

## Environments

In old `node.js` environments that not fully supports `es2015`, `emitify` could be used with:

```js
var typos = require('emitify/legacy');
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/emitify.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/emitify/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/emitify.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/emitify/badge.svg?branch=master&service=github
[NPMURL]:                   https://npmjs.org/package/emitify "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/emitify  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/emitify "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]:              https://coveralls.io/github/coderaiser/emitify?branch=master

