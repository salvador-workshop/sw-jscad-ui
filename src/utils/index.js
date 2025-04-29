const buildUtils = (jscadInstance) => {
    return {
        generalUtils: require('./general-utils'),
        geometryUtils: require('./geometry-utils'),
        positionUtils: require('./position-utils')(jscadInstance),
        textUtils: require('./text-utils')(jscadInstance),
        transformUtils: require('./transform-utils')(jscadInstance),
    }
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = buildUtils;
