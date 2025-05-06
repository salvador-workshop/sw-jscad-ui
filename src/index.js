const buildersModule = require('./builders');
const utilsModule = require('./utils');

const init = ({ lib }) => {
    const swLib = { ...utilsModule.init({ lib }) }
    // Builders have access to SW utils functions
    return {
        ...swLib,
        ...buildersModule.init({ lib, swLib }),
    }
}

module.exports = { init };
