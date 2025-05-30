const uxModule = require('./ux');

const init = ({ lib }) => {
    let swLib = { ...uxModule.init({ lib }) }

    return swLib;
}

module.exports = { init };
