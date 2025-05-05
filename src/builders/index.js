const init = ({ lib, swLib }) => {
    return {
        archBuilder: require('./arch-builder').init({ lib, swLib }),
        columnBuilder: require('./column-builder').init({ lib, swLib }),
        foilBuilder: require('./foil-builder').init({ lib, swLib }),
        mouldBuilder: require('./mould-builder').init({ lib, swLib }),
        profileBuilder: require('./profile-builder').init({ lib, swLib }),
    }
}

/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = { init };
