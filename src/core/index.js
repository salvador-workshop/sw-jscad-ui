
const init = ({ lib }) => {
    const core = {
        constants: require('./constants'),
        errors: require('./errors'),
        position: require('./position').init({ lib }),
        text: require('./text').init({ lib }),
    }

    core.internals = require('./internals').init({ lib, swLib: core });
    core.parts = require('./parts').init({ lib, swLib: core });

    return core;
}

/**
 * Collection of util functions
 * @module core
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
