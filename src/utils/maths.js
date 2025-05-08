"use strict"

const arrayCartesianProduct = (a, b) => a.reduce((acc, x) => [...acc, ...b.map(y => [x, y])], []);

const mathUtils = ({ lib, swLib }) => {
    const {
        INCHES_MM_FACTOR
    } = swLib.constants;

    return {
        isEven: (n) => {
            return n % 2 == 0;
        },
        isOdd: (n) => {
            return Math.abs(n % 2) == 1;
        },
        arrayCartesianProduct,
        inchesToMM: (numInches) => numInches * INCHES_MM_FACTOR,
        mmToInches: (numMils) => numMils / INCHES_MM_FACTOR,
        factorize: (num) => {
            const int1 = Math.floor(Math.sqrt(num));
            const rem = num % int1
            if (rem === 0) {
                return [int1, int1]
            }
            const int2 = (num - rem) / int1
            return [int1, int2 + 1]
        },
    }
}


module.exports = { init: mathUtils };
