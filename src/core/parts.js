const parts = ({ lib, swLib }) => {
    const newPart = ({
        partName,
        partColour,
        geom
    }) => {
        return {
            partName,
            partColour,
            partGeom: geom,
            partCtrlPts: null,
        }
    };
    return {
        newPart
    }
}

module.exports = { init: parts };
