"use strict"

const DEFAULT_EXTRUDE_HEIGHT = 1;
const DEFAULT_PANEL_HEIGHT = 2;

const textUtils = ({ lib }) => {
    const { union, subtract } = lib.booleans
    const { circle, cuboid } = lib.primitives
    const { translate, align } = lib.transforms
    const { vectorText } = lib.text
    const { hullChain } = lib.hulls
    const { extrudeLinear } = lib.extrusions
    const { measureDimensions, measureBoundingBox } = lib.measurements;

    const flatText = (opts) => {
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
        const message3D = extrudeLinear({ height: opts.extrudeHeight || DEFAULT_EXTRUDE_HEIGHT }, message2D)
        return align({ modes: ['center', 'center', 'center'] }, message3D)
    }

    return {
        flatText,
        textPanel: (opts) => {
            const extrudeHt = opts.extrudeHeight || DEFAULT_EXTRUDE_HEIGHT;

            const textModel = flatText({
                ...opts,
                extrudeHeight: extrudeHt,
            });
            const textModelDims = measureDimensions(textModel);
            const panelOffset = opts.panelOffset || 2;

            const textPanel = cuboid({
                size: [
                    textModelDims[0] + panelOffset,
                    textModelDims[1] + panelOffset,
                    opts.panelThickness || extrudeHt * 2
                ]
            })

            const embossedPanel = subtract(
                align({ modes: ['center', 'center', 'max'] }, textPanel),
                align({ modes: ['center', 'center', 'max'] }, textModel)
            )

            return align({ modes: ['center', 'center', 'center'] }, embossedPanel);
        }
    }
}

module.exports = { init: textUtils };
