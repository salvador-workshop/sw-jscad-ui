
const init = ({ lib }) => {
    const core = {
        constants: require('./constants'),
        general: require('./general'),
        position: require('./position').init({ lib }),
        text: require('./text').init({ lib }),
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
