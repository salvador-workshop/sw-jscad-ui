const init = ({ lib, swLib }) => {
    return {
        generalUtils: require('./general-utils'),
        geometryUtils: require('./geometry-utils'),
        positionUtils: require('./position-utils').init({ lib, swLib }),
        textUtils: require('./text-utils').init({ lib, swLib }),
        transformUtils: require('./transform-utils').init({ lib, swLib }),
    }
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
