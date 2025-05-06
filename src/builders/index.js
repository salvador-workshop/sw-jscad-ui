const init = ({ lib, swLib }) => {
    const swBuilders = {
        mouldBuilder: require('./mould-builder').init({ lib, swLib }),
        profileBuilder: require('./profile-builder').init({ lib, swLib }),
    }
    swBuilders.archBuilder = require('./arch-builder').init({ lib, swLib });
    swBuilders.columnBuilder = require('./column-builder').init({ lib, swLib });
    swBuilders.foilBuilder = require('./foil-builder').init({ lib, swLib });

    return swBuilders;
}

/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = { init };
