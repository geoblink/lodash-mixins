[![Build Status](https://travis-ci.org/geoblink/lodash-mixins.svg?branch=master)](https://travis-ci.org/geoblink/lodash-mixins)
[![Coverage Status](https://coveralls.io/repos/github/geoblink/lodash-mixins/badge.svg)](https://coveralls.io/github/geoblink/lodash-mixins)

# lodash-mixins

A collection of functionalities to extend lodash library.

## Installation

`yarn add --save lodash-mixins`

## Usage

In your app:

```javascript
const _ = require('lodash')
require('lodash-mixins')(_)
```

## API

### fromPairsMap

`fromPairsMap (collection, iteratee)` Applies fromPairs to the result of mapping the given iteratee to the given array.

### getTruthyKeys

`function getTruthyKeys (collection, parseKeyFunction)` Returns the truthy values of the collection. If `parseKeyFunction` is provided, the values will be parsed against it.

### hasTruthyValues

`function hasTruthyValues (object)` Returns whether given object has at least one truthy value for one of its keys.

### mapNonNil

`function mapNonNil (collection, iteratee)` Returns a new collection with non-nil values.

### mGet

`function mGet (object, arrayOfKeys, defaultValue)` Returns a new array with the values of `object` that match `arrayOfKeys`

### shortcuttedReduce

`function shortcuttedReduce (collection, iteratee, accumulator)` Like _.reduce but as soon as accumulator changes it finishes execution.
