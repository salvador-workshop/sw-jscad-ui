"use strict"

const EDGE_PROFILE_MARGIN = 1;

const profileBuilder = (jscadInstance) => {

  /**
   * Builds cross-section profiles in gothic style.
   * Output profiles are centred at (0, 0, 0).
   * Edge profiles have a 1mm margin between all details and the flat (host) side.
   * @module profileBuilder
   * @version 2.0.0
   */
  module.exports = {
    /**
     * Square with circular notches at corners.
     * @param {Object} opts 
     * @param {number} opts.sqLength - side length for bounding square 
     * @param {number} opts.notchRadius - radius of circular notch
     */
    sqCornerCircNotch: (opts) => {
      const { square, circle } = jscadInstance.primitives
      const { union, subtract } = jscadInstance.booleans

      // TODO - fix implementation. Everything assumes that cornerRad === sqLen / 4.
      // So the bounding square probably would be off if it's changed.
      const sqLen = opts.sqLength;
      const halfUnit = sqLen / 2
      const cornerRad = opts.notchRadius || sqLen / 4;
      const centrePoints = [
        [halfUnit, halfUnit],
        [-halfUnit, halfUnit],
        [halfUnit, -halfUnit],
        [-halfUnit, -halfUnit],
      ];

      const baseSquare = square({ size: sqLen });
      const cornerCircles = union(centrePoints.map(cPt => {
        return circle({ radius: cornerRad, center: cPt });
      }));

      return subtract(baseSquare, cornerCircles);
    },
    /**
     * Square with circles at corners.
     * @param {Object} opts 
     * @param {number} opts.sqLength - side length for bounding square 
     * @param {number} opts.cornerRadius - radius of circular corner
     */
    sqCornerCircles: (opts) => {
      const { square, circle } = jscadInstance.primitives
      const { union } = jscadInstance.booleans

      // TODO - fix implementation. Everything assumes that cornerRad === baseSqLen / 4.
      // So the bounding square probably would be off if it's changed.
      const sqLen = opts.sqLength;

      const baseSqLen = sqLen * 2 / 3;
      const halfUnit = baseSqLen / 2;
      const cornerRad = opts.cornerRadius || baseSqLen / 4;
      const centrePoints = [
        [halfUnit, halfUnit],
        [-halfUnit, halfUnit],
        [halfUnit, -halfUnit],
        [-halfUnit, -halfUnit],
      ];

      const baseSquare = square({ size: baseSqLen });
      const cornerCircles = union(centrePoints.map(cPt => {
        return circle({ radius: cornerRad, center: cPt });
      }));

      return union(baseSquare, cornerCircles);
    },
    /**
     * Octagonal
     * @param {Object} opts 
     * @param {number} opts.sqLength - side length for bounding square 
     */
    octagonal: (opts) => {
      const { rotate } = jscadInstance.transforms
      const { square } = jscadInstance.primitives
      const { intersect } = jscadInstance.booleans

      const sqLen = opts.sqLength;
      // const octagonSideLen = Math.tan(Math.PI / 8) * (sqLen / 2) * 2;

      const baseSquare = square({ size: sqLen });
      const angledSquare = rotate([0, 0, Math.PI / 4], baseSquare);

      return intersect(baseSquare, angledSquare);
    },
    /**
    * Edge profiles
    * @alias module:profileBuilder.edge
    * @type {object}
    */
    edge: {
      /**
       * Edge profile: Circular notch in bottom half
       * @alias module:profileBuilder.edge.circNotch
       * @function circNotch
       * @param {Object} opts 
       * @param {number} opts.totalThickness - total thickness of edge
       * @param {number} opts.topThickness - thickness of top (left intact by ornaments)
       * @param {number} opts.smallOffset - small offset between notch and main edge
       */
      circNotch: (opts) => {
        const { square, circle, rectangle } = jscadInstance.primitives
        const { union, subtract } = jscadInstance.booleans
        const { align } = jscadInstance.transforms

        const ornamentThickness = opts.totalThickness - opts.topThickness;
        const smallOffset = opts.smallOffset || ornamentThickness / 6;
        const notchRadius = ornamentThickness - (smallOffset * 2);
        const profileWidth = smallOffset * 2 + notchRadius;

        const baseRect = rectangle({ size: [profileWidth, opts.totalThickness] });
        const margin = rectangle({ size: [EDGE_PROFILE_MARGIN, opts.totalThickness] });
        const alignedMargin = align({ modes: ['max', 'center', 'none'], relativeTo: [profileWidth / -2, 0, 0] }, margin)
        const baseShape = union(baseRect, alignedMargin);

        const cutawayCircle = circle({ radius: notchRadius, center: [profileWidth / 2 - smallOffset, opts.totalThickness / -2 + smallOffset] });
        const cutawayCorner1 = square({
          size: smallOffset * 2, center: [
            profileWidth / -2 + smallOffset,
            opts.totalThickness / -2,
          ]
        });
        const cutawayCorner2 = square({
          size: smallOffset * 2, center: [
            profileWidth / 2,
            opts.totalThickness / 2 - opts.topThickness - smallOffset,
          ]
        });
        const cutaway = union(cutawayCircle, cutawayCorner1, cutawayCorner2);

        return align({ modes: ['center', 'center', 'none'] }, subtract(baseShape, cutaway));
      },
      /**
       * Edge profile: Circular portrusion in bottom half
       * @alias module:profileBuilder.edge.circPortrusion
       * @function circPortrusion
       * @param {Object} opts 
       * @param {number} opts.totalThickness - total thickness of edge
       * @param {number} opts.topThickness - thickness of top (left intact by ornaments)
       * @param {number} opts.smallOffset - small offset between portrusion and main edge
       */
      circPortrusion: (opts) => {
        const { square, circle, rectangle } = jscadInstance.primitives
        const { union, subtract, intersect } = jscadInstance.booleans
        const { align, translate } = jscadInstance.transforms

        const ornamentThickness = opts.totalThickness - opts.topThickness;
        const smallOffset = opts.smallOffset || ornamentThickness / 8;
        const circRadius = ornamentThickness - (smallOffset * 3);
        const profileWidth = smallOffset * 3 + circRadius;

        const baseRect = rectangle({ size: [profileWidth, opts.totalThickness] });
        const margin = rectangle({ size: [EDGE_PROFILE_MARGIN, opts.totalThickness] });
        const alignedMargin = align({ modes: ['max', 'center', 'none'], relativeTo: [profileWidth / -2, 0, 0] }, margin)

        const cutaway = translate([0, opts.topThickness / -2], rectangle({ size: [profileWidth, ornamentThickness] }));
        const cutShape = subtract(baseRect, cutaway);
        const baseShape = union(cutShape, alignedMargin);

        const portCircle = circle({ radius: circRadius, center: [profileWidth / -2 + smallOffset, opts.totalThickness / 2 - opts.topThickness - smallOffset] });
        const portArc = intersect(baseRect, portCircle);
        const smallCorner1 = rectangle({
          size: [smallOffset, smallOffset * 2], center: [
            profileWidth / -2 + (smallOffset / 2),
            opts.totalThickness / -2 + (smallOffset * 2),
          ]
        });
        const smallCorner2 = square({
          size: smallOffset * 2, center: [
            profileWidth / 2 - (smallOffset * 2),
            opts.totalThickness / 2 - opts.topThickness,
          ]
        });
        const ornament = union(portArc, smallCorner1, smallCorner2)

        return align({ modes: ['center', 'center', 'none'] }, union(baseShape, ornament));
      },
    }
  }
}

/**
 * Builds cross-section profiles in gothic style.
 * Output profiles are centred at (0, 0, 0).
 * Edge profiles have a 1mm margin between all details and the flat (host) side.
 * @module profileBuilder
 * @version 2.0.0
 */
module.exports = profileBuilder
