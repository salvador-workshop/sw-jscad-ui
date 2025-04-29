const init = (jscadInstance) => {
    return {
        generalUtils: require('./general-utils'),
        geometryUtils: require('./geometry-utils'),
        positionUtils: require('./position-utils').init(jscadInstance),
        textUtils: require('./text-utils').init(jscadInstance),
        transformUtils: require('./transform-utils').init(jscadInstance),
    }
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
