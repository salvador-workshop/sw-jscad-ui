const init = ({ lib }) => {
    const swLib = {
        constants: require('./constants'),
        generalUtils: require('./general-utils'),
        geometryUtils: require('./geometry-utils'),
    }

    // JSCAD dependent
    swLib.positionUtils = require('./position-utils').init({ lib });
    swLib.textUtils = require('./text-utils').init({ lib });
    swLib.transformUtils = require('./transform-utils').init({ lib });

    // Dependent on other utils
    swLib.layoutUtils = require('./transform-utils').init({ lib, swLib });

    return swLib;
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
