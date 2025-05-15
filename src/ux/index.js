
const init = ({ lib, swLib }) => {
    const ux = {
        colors: require('./colors').init({ lib, swLib }),
    }

    ux.layers = require('./layers').init({ lib, swLib: { ...swLib, ...ux } });

    return ux;
}

module.exports = { init };
