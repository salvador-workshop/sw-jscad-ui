const init = (jscadInstance) => {
    return {
        archBuilder: require('./arch-builder').init(jscadInstance),
        columnBuilder: require('./column-builder').init(jscadInstance),
        foilBuilder: require('./foil-builder').init(jscadInstance),
        mouldBuilder: require('./mould-builder').init(jscadInstance),
        profileBuilder: require('./profile-builder').init(jscadInstance),
    }
}

/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = { init };
