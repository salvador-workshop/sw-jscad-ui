
const init = ({ lib, swLib }) => {
    const buildersCore = {
        // Dependent on lib
        archBuilder: require('./arch-builder').init({ lib }),
        basicTrimFamily: require('./basic-trim-family').init({ lib }),
        foilBuilder: require('./foil-builder').init({ lib }),
        mouldBuilder: require('./mould-builder').init({ lib }),
        profileBuilder: require('./profile-builder').init({ lib }),
    }

    return buildersCore;
}

/**
 * Collection of util functions
 * @module buildersCore
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
