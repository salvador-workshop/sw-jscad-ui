
const init = ({ lib, swLib }) => {
    const utils = {
        // Dependent on lib
        transform: require('./transform').init({ lib }),
        superPrimitives: require('./super-primitives').init({ lib }),
    }

    // Dependent on lib and core modules
    utils.maths = require('./maths').init({ lib, swLib: { ...utils, ...swLib } });
    utils.layout = require('./layout').init({ lib, swLib: { ...utils, ...swLib } });
    utils.geometry = require('./geometry').init({ lib, swLib: { ...utils, ...swLib } });

    return utils;
}

module.exports = { init };
