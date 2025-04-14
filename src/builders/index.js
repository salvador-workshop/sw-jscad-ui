/**
 * Collection of builder functions
 * @module builders
 * @example
 * const { archBuilder, columnBuilder } = require('sw-jscad').builders
 */
module.exports = {
    archBuilder: require('./arch-builder'),
    columnBuilder: require('./column-builder'),
    foilBuilder: require('./foil-builder'),
    mouldBuilder: require('./mould-builder'),
    profileBuilder: require('./profile-builder'),
}
