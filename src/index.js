const uxModule = require('./ux');

const init = ({ lib }) => {
    let swJscadUi = {
        ux: { ...uxModule.init({ lib }) }
    }

    return swJscadUi;
}

module.exports = { init };
