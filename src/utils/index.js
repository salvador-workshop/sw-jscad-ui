const init = ({ lib }) => {
    const starter = {
        constants: require('./constants'),
        generalUtils: require('./general-utils'),
        geometryUtils: require('./geometry-utils'),
    }
    return {
        ...starter,
        positionUtils: require('./position-utils').init({ lib, starter }),
        textUtils: require('./text-utils').init({ lib, starter }),
        transformUtils: require('./transform-utils').init({ lib, starter }),
    }
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
