"use strict"

const transformUtils = {
    /**
     * Cuts a given geometry in half.
     * @param {Object} opts
     * @param {string} opts.axis - Axis direction pointing to the remaining geometry. This could be negative, specified like "x" or "-y"
     * @param {number[]} opts.relativeTo
     * @returns bisected geometry
     */
    bisect3d: () => {
        return null;
    },
    /**
     * Cuts a slice of an object
     * @param {Object} opts
     * @param {number} opts.centralAngle
     * @param {string} opts.axis - Rotation axis ("x", "y", or "z")
     * @param {number[]} opts.relativeTo
     * @returns bisected geometry
     */
    cutCircularSlice: () => {

    }
}

module.exports = transformUtils;
