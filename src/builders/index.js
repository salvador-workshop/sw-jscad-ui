const init = ({ lib, swLib }) => {
    const newLib = {
        ...swLib,
        mouldBuilder: require('./mould-builder').init({ lib }),
        profileBuilder: require('./profile-builder').init({ lib }),
        archBuilder: require('./arch-builder').init({ lib }),
        foilBuilder: require('./foil-builder').init({ lib }),
        basicTrimFamily: require('./basic-trim-family').init({ lib }),
    }

    newLib.columnBuilder = require('./column-builder').init({ lib, newLib });
    newLib.wallBuilder = require('./wall-builder').init({ lib, newLib });

    return newLib;
}

/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = { init };
