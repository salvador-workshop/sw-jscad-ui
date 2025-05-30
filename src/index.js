const uxModule = require('./ux');
const layoutModule = require('./layout');

const init = ({ lib, swLib }) => {
    let swJscadUi = {
        ux: { ...uxModule.init({ lib, swLib }) }
    }

    swJscadUi.layout = layoutModule.init({ lib, swLib: { ...swJscadUi, ...swLib } });

    return swJscadUi;
}

module.exports = { init };
