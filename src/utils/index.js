const init = ({ lib }) => {
    const utils = {
        constants: require('./constants'),
        generalUtils: require('./general-utils'),
        geometryUtils: require('./geometry-utils'),
    }

    // JSCAD dependent
    utils.positionUtils = require('./position-utils').init({ lib });
    utils.textUtils = require('./text-utils').init({ lib });
    utils.transformUtils = require('./transform-utils').init({ lib });
    utils.mouldBuilder = require('./mould-builder').init({ lib });
    utils.profileBuilder = require('./profile-builder').init({ lib });
    utils.basicTrimFamily = require('./basic-trim-family').init({ lib });
    utils.archBuilder = require('./arch-builder').init({ lib });
    utils.foilBuilder = require('./foil-builder').init({ lib });

    // Dependent on other utils
    utils.layoutUtils = require('./transform-utils').init({ lib, utils });

    return utils;
}

/**
 * Collection of util functions
 * @module utils
 * @example
 * const { geometryUtils, positionUtils } = require('sw-jscad')
 */
module.exports = { init };
