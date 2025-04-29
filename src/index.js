const buildersModule = require('./builders');
const utilsModule = require('./utils');

const buildSwJsCad = (jscadInstance) => {
    return {
        ...buildersModule(jscadInstance),
        ...utilsModule(jscadInstance),
    }
}

module.exports = buildSwJsCad;
