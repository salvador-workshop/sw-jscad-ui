const internals = ({ lib, swLib }) => {

    //-------------------
    // Master Prop List

    const propListBasic = [
        { id: 'length', desc: 'length of element' },
        { id: 'width', desc: 'Width of element' },
        { id: 'height', desc: 'height of element' },
    ]

    const propListDecorative = [
        { id: 'trimOpts', desc: 'array of string options' },
        { id: 'trimUnitSize', desc: '[x,y] of trim unit depth, and trim unit height' },
    ]

    const propListWall = [
        { id: 'wallSize', desc: '[x,y,z] of wall length, wall thickness, and wall height' },
        { id: 'crownDetailLvl', desc: 'crown detail level, as integer (usually 0-2)' },
        { id: 'dadoDetailLvl', desc: 'dado detail level, as integer (usually 0-2)' },
        { id: 'baseDetailLvl', desc: 'base detail level, as integer (usually 0-2)' },
    ]

    const propListRoof = [
        { id: 'roofSpanSize', desc: 'length of element' },
        { id: 'roofOverhangSize', desc: 'Width of element' },
        { id: 'roofPitch', desc: 'height of element' },
    ]

    const masterPropList = [
        ...propListBasic,
        ...propListDecorative,
        ...propListWall,
        ...propListRoof,
    ]


    //-------------------
    // Colours

    colourList = [];

    //-------------------
    // Layers

    layerList = [];

    return {
        propListBasic,
        propListWall,
        propListRoof,
        masterPropList,
        colourList,
        layerList,
    }

}

module.exports = { init: internals };
