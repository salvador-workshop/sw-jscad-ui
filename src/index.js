const buildersModule = require('./builders');
const utilsModule = require('./utils');

const init = ({ lib }) => {
    const libStarter = { ...utilsModule.init({ lib, swLib: null }) }
    // Builders have access to SW utils functions
    return {
        ...libStarter,
        ...buildersModule.init({ lib, swLib: libStarter }),
    }
}

module.exports = { init };
