const init = ({ lib, swLib }) => {
    const builders = {
        // Dependent on libs and utils
        columnBuilder: require('./column-builder').init({ lib, swLib }),
        wallBuilder: require('./wall-builder').init({ lib, swLib }),
    }

    // Dependent on libs, utils, and first builders
    builders.entrywayBuilder = require('./entryway-builder').init({ lib, swLib: {...builders, ...swLib }});

    return builders;
}

/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = { init };
