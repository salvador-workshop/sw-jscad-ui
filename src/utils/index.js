
const init = ({ lib, swLib }) => {
    const utils = {
        // Dependent on lib
        transform: require('./transform').init({ lib }),
        superPrimitives: require('./super-primitives').init({ lib }),
    }

    // Dependent on lib and core modules
    utils.math = require('./math').init({ lib, swLib: { ...utils, ...swLib } });
    utils.layout = require('./layout').init({ lib, swLib: { ...utils, ...swLib } });
    utils.geometry = require('./geometry').init({ lib, swLib: { ...utils, ...swLib } });

    return utils;
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
