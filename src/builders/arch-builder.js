
"use strict"

const archBuilderInit = (jscadInstance) => {
  return {
    /**
     * Builds a one-centre (semicircular) arch.
     * @param {Object} opts 
     * @param {number} opts.arcRadius - arc radius 
     * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
     */
    onePt: (opts) => {
      const { path2, geom2 } = jscadInstance.geometries
      const { extrudeRotate } = jscadInstance.extrusions
      const { arc } = jscadInstance.primitives
      const { translate, rotate, align } = jscadInstance.transforms

      const arcRad = opts.arcRadius;

      if (opts.geomProfile) {
        // 3D
        const profile = translate([arcRad, 0, 0], opts.geomProfile);
        const baseArch = extrudeRotate({ segments: 48, angle: Math.PI }, profile);

        return align({ modes: ['center', 'center', 'min'] }, rotate([Math.PI / 2, 0, 0], baseArch));
      } else {
        // 2D
        const baseArchPath = path2.close(arc({ radius: arcRad, endAngle: Math.PI, segments: 48 }));
        return geom2.fromPoints(path2.toPoints(baseArchPath));
      }
    },
    /**
     * Builds a two-centre pointed arch.
     * @param {Object} opts 
     * @param {number} opts.arcRadius - arc radius 
     * @param {number} opts.archWidth - arch width 
     * @param {number} opts.profileWidth - width of 2D cross-section profile 
     * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
     */
    twoPt: (opts) => {
      const { path2, geom2 } = jscadInstance.geometries
      const { extrudeRotate } = jscadInstance.extrusions
      const { cuboid, arc } = jscadInstance.primitives
      const { translate, mirror, rotate, align } = jscadInstance.transforms
      const { union, subtract, intersect } = jscadInstance.booleans

      const arcRad = opts.arcRadius;
      const archWth = opts.archWidth;

      if (opts.geomProfile) {
        // 3D
        // profileWidth prop may not be necessary.
        // Can probably use Math.max(bboxLen1, bboxLen2) of the input geomProfile
        const profileWth = opts.profileWidth;

        const profile = translate([arcRad, 0, 0], opts.geomProfile);
        const baseArch = extrudeRotate({ segments: 48, angle: Math.PI }, profile);

        const cutawaySize = Math.max(archWth, arcRad) * 2;
        const mirrorAxis = arcRad - (archWth / 2);
        const cutawayOffset = (cutawaySize / -2) + mirrorAxis;
        const archCutaway = translate([cutawayOffset, cutawaySize / 2, 0], cuboid(
          {
            size: [cutawaySize, cutawaySize, profileWth * 1.25],
            center: [0, 0, 0]
          }
        ))
        const cutArch = subtract(baseArch, archCutaway);
        const reflectedArch = mirror({ normal: [1, 0, 0], origin: [mirrorAxis, 0, 0] }, cutArch);

        return align({ modes: ['center', 'center', 'min'] }, rotate([Math.PI / 2, 0, 0], union(cutArch, reflectedArch)));
      } else {
        // 2D
        const baseArchPath = path2.close(arc({ radius: arcRad, endAngle: Math.PI, segments: 48 }));
        const baseArch = geom2.fromPoints(path2.toPoints(baseArchPath));
        const mirrorAxis = arcRad - (archWth / 2);
        const reflectedArch = mirror({ normal: [1, 0, 0], origin: [mirrorAxis, 0, 0] }, baseArch);
        return align({ modes: ['center', 'min', 'min'] }, intersect(baseArch, reflectedArch));
      }
    },
    threePt: (opts) => {
      if (opts.geomProfile) {
        // 3D
        return null;
      } else {
        // 2D
        return null;
      }
    },
    fourPt: (opts) => {
      if (opts.geomProfile) {
        // 3D
        return null;
      } else {
        // 2D
        return null;
      }
    },
  }
}

/**
 * Builds circle-based arches. Input 2D profiles must be centred at (0, 0, 0)
 * @module archBuilder
 * @version 2.0.0
 */
module.exports = { init: archBuilderInit }