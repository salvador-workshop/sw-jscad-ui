"use strict"

const transformUtilsInit = ({ lib, swLib }) => {
    const { subtract } = lib.booleans
    const { measureDimensions } = lib.measurements;
    const { cuboid } = lib.primitives
    const { align, mirror, rotate } = lib.transforms
    const { colorize } = lib.colors

    return {
        /**
         * Cuts a given geometry in half.
         * @param {Object} opts
         * @param {Object} opts.geom - Object we're cutting
         * @param {string} opts.axis - Axis direction pointing to the remaining geometry. This could be negative, specified like "x" or "-y"
         * @returns bisected geometry
         */
        bisect3d: (opts) => {
            const geomDims = measureDimensions(opts.geom);
            const baseCutBox = cuboid({
                size: [
                    geomDims[0] + 3,
                    geomDims[1] + 3,
                    geomDims[2] + 3,
                ]
            });

            let alignedCutBox = null;
            const remAxis = opts.axis || 'z';
            switch (remAxis) {
                case "-x":
                    alignedCutBox = align({ modes: ['min', 'center', 'center'] }, baseCutBox);
                    break;
                case "x":
                    alignedCutBox = align({ modes: ['max', 'center', 'center'] }, baseCutBox);
                    break;
                case "-y":
                    alignedCutBox = align({ modes: ['center', 'min', 'center'] }, baseCutBox);
                    break;
                case "y":
                    alignedCutBox = align({ modes: ['center', 'max', 'center'] }, baseCutBox);
                    break;
                case "-z":
                    alignedCutBox = align({ modes: ['center', 'center', 'min'] }, baseCutBox);
                    break;
                case "z":
                default:
                    alignedCutBox = align({ modes: ['center', 'center', 'max'] }, baseCutBox);
            }

            return subtract(
                opts.geom,
                alignedCutBox
            );
        },
        /**
         * Cuts a slice of an object
         * @param {Object} opts
         * @param {Object} opts.geom - Object we're cutting
         * @param {number} opts.centralAngle
         * @returns bisected geometry
         */
        cutCircularSlice: (opts) => {
            const geomDims = measureDimensions(opts.geom);
            const baseCutBox = cuboid({
                size: [
                    geomDims[0] + 3,
                    geomDims[1] + 3,
                    geomDims[2] + 3,
                ]
            });

            const cutBox1 = colorize(
                [0.7, 0.7, 0.1, 0.5],
                rotate([0, 0, opts.centralAngle / 2], align({ modes: ['max', 'center', 'center'] }, baseCutBox))
            );
            const cutBox2 = mirror({ normal: [1, 0, 0] }, cutBox1);
            let cutAssembly = subtract(opts.geom, cutBox1);
            cutAssembly = subtract(cutAssembly, cutBox2);

            return cutAssembly
        }
    }
}

module.exports = { init: transformUtilsInit };
