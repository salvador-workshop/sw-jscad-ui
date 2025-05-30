
const init = ({ lib }) => {
    const ux = {
        colors: require('./colors').init({ lib }),
    }

    ux.layers = require('./layers').init({ lib });

    return ux;
}

module.exports = { init };
