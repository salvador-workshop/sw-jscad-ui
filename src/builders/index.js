const buildBuilders = (jscadInstance) => {
    return {
        archBuilder: require('./arch-builder')(jscadInstance),
        columnBuilder: require('./column-builder')(jscadInstance),
        foilBuilder: require('./foil-builder')(jscadInstance),
        mouldBuilder: require('./mould-builder')(jscadInstance),
        profileBuilder: require('./profile-builder')(jscadInstance),
    }
}

/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = buildBuilders;
