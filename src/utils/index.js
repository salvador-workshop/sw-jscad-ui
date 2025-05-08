
const init = ({ lib, swLib }) => {
    const utils = {
        // Dependent on lib
        transformUtils: require('./transform-utils').init({ lib }),
        superPrimitives: require('./super-primitives').init({ lib }),
    }

    // Dependent on lib and core modules
    utils.layoutUtils = require('./layout-utils').init({ lib, swLib: { ...utils, ...swLib } });
    utils.geometryUtils = require('./geometry-utils').init({ lib, swLib: { ...utils, ...swLib } });

    return utils;
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
