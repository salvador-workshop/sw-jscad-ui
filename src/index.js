const buildersModule = require('./builders');
const utilsModule = require('./utils');

const init = ({ lib, swLib }) => {
    return {
        ...buildersModule.init({ lib, swLib }),
        ...utilsModule.init({ lib, swLib }),
    }
}

module.exports = { init };
