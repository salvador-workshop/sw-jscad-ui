"use strict"

const superPrimitives = ({ lib }) => {
    const { cuboid } = lib.primitives
    const { expand } = lib.expansions
    const { translate } = lib.transforms

    return {
        frameCuboid: ({ size, frameWidth }) => {
            console.log(`frameCuboid() size = ${JSON.stringify(size)}, frameWidth = ${JSON.stringify(frameWidth)}`);
            const outerCuboid = cuboid({ size });

            return outerCuboid;
        }
    }
}

module.exports = { init: superPrimitives };
