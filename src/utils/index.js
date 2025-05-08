
const init = ({ lib }) => {
    const utils = {
        // Dependent on lib
        constants: require('./constants'),
        generalUtils: require('./general-utils'),
        geometryUtils: require('./geometry-utils'),
        positionUtils: require('./position-utils').init({ lib }),
        textUtils: require('./text-utils').init({ lib }),
        transformUtils: require('./transform-utils').init({ lib }),
        mouldBuilder: require('./mould-builder').init({ lib }),
        profileBuilder: require('./profile-builder').init({ lib }),
        basicTrimFamily: require('./basic-trim-family').init({ lib }),
        archBuilder: require('./arch-builder').init({ lib }),
        foilBuilder: require('./foil-builder').init({ lib }),
        superPrimitives: require('./super-primitives').init({ lib }),
    }

    // Dependent on lib and other utils
    utils.layoutUtils = require('./layout-utils').init({ lib, swLib: utils });

    return utils;
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
