const init = ({ lib, swLib }) => {
    const builders = {
        // Dependent on libs and utils
        columns: require('./columns').init({ lib, swLib }),
        walls: require('./walls').init({ lib, swLib }),
    }

    // Dependent on libs, utils, and first builders
    builders.entryways = require('./entryways').init({ lib, swLib: {...builders, ...swLib }});

    return builders;
}

/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = { init };
