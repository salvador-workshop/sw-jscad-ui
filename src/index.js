const utilsModule = require('./utils');
const buildersModule = require('./builders');

const init = ({ lib }) => {
    // Utils are initialized first
    let swLib = { ...utilsModule.init({ lib }) }

    // Builders have access to SW utils functions
    swLib = { ...swLib, ...buildersModule.init({ lib, swLib }) }

    return swLib;
}

module.exports = { init };
