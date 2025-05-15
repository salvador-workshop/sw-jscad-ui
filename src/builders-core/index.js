
const init = ({ lib, swLib }) => {
    const buildersCore = {
        // Dependent on lib
        arches: require('./arches').init({ lib }),
        foils: require('./foils').init({ lib }),
        moulds: require('./moulds').init({ lib }),
        profiles: require('./profiles').init({ lib }),
        trimFamilyAranea: require('./trim-family-aranea').init({ lib }),
    }

    return buildersCore;
}

module.exports = { init };
