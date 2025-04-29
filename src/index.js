const buildersModule = require('./builders');
const utilsModule = require('./utils');

const init = (jscadInstance) => {
    return {
        ...buildersModule.init(jscadInstance),
        ...utilsModule.init(jscadInstance),
    }
}

module.exports = { init };
