const init = ({ lib, swLib }) => {
    const builders = {
        // Dependent on libs and utils
        columns: require('./columns').init({ lib, swLib }),
        walls: require('./walls').init({ lib, swLib }),
    }

    // Dependent on libs, utils, and first builders
    builders.entryways = require('./entryways').init({ lib, swLib: { ...builders, ...swLib } });
    builders.roofs = require('./roofs').init({ lib, swLib: { ...builders, ...swLib } });
    builders.buttress = require('./buttress').init({ lib, swLib: { ...builders, ...swLib } });

    return builders;
}

module.exports = { init };
