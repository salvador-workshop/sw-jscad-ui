const init = ({ lib, swLib }) => {
    const builders = {
        columnBuilder: require('./column-builder').init({ lib, swLib }),
        wallBuilder: require('./wall-builder').init({ lib, swLib }),
    }

    return builders;
}

/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = { init };
