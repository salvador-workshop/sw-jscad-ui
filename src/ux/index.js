
const init = ({ lib, swLib }) => {
    const ux = {
        colors: require('./colors').init({ lib, swLib }),
    }

    ux.layers = require('./layers').init({ lib, swLib: { ...swLib, ...ux } });

    return ux;
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
