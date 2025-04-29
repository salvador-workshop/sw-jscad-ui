"use strict"

const textUtilsInit = (jscadInstance) => {
    return {
        flatText: (opts) => {
            const { union } = jscadInstance.booleans
            const { circle } = jscadInstance.primitives
            const { translate, } = jscadInstance.transforms
            const { vectorText } = jscadInstance.text
            const { hullChain } = jscadInstance.hulls
            const { extrudeLinear } = jscadInstance.extrusions

            // message, fontSize, extrudeHeight, opts.charLineWidth
            if (opts.message === undefined || opts.message.length === 0) return []

            const lineRadius = opts.charLineWidth / 2
            const lineCorner = circle({ radius: lineRadius })

            const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: opts.message, height: opts.fontSize }) // line segments for each character
            const lineSegments = []
            lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
                const corners = segmentPoints.map((point) => translate(point, lineCorner))
                lineSegments.push(hullChain(corners))
            })
            const message2D = union(lineSegments)
            const message3D = extrudeLinear({ height: opts.extrudeHeight }, message2D)
            return translate([0, 0, 0], message3D)
        },
        textPanel: () => {
            return null;
        }
    }
}

module.exports = { init: textUtilsInit };
