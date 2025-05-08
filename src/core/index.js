
const init = ({ lib }) => {
    const core = {
        constants: require('./constants'),
        generalUtils: require('./general-utils'),
        positionUtils: require('./position-utils').init({ lib }),
        textUtils: require('./text-utils').init({ lib }),
    }

    return core;
}

/**
 * Collection of util functions
 * @module core
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
