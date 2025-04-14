"use strict"

const INCHES_MM_FACTOR = 25.4;
const _arrCartesianProduct = (a, b) => a.reduce((acc, x) => [...acc, ...b.map(y => [x, y])], []);

const generalUtils = {
    isEven: (n) => {
        return n % 2 == 0;
    },
    isOdd: (n) => {
        return Math.abs(n % 2) == 1;
    },
    arrayCartesianProduct: _arrCartesianProduct,
    inchesToMM: (numInches) => numInches * INCHES_MM_FACTOR,
    mmToInches: (numMils) => numMils / INCHES_MM_FACTOR,
}

module.exports = generalUtils;
