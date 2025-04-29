"use strict"

const mouldBuilderInit = (jscadInstance) => {
  /**
   * Builds a cuboid with given 2D profile placed on one edge.
   * @param {Object} opts
   * @param {number[]} opts.size - size (x, y, z)
   * @param {geom2.Geom2} opts.geomProfile - 2D positive cross-section profile
   * @param {string} opts.alignment - where to align when profile size differs from
   *     base cuboid ('top' | 'middle' | 'bottom'). Defaults to 'middle'
   */
  const cuboidOneEdge = (opts) => {
    const { measureBoundingBox } = jscadInstance.measurements
    const { extrudeLinear } = jscadInstance.extrusions
    const { union } = jscadInstance.booleans
    const { rotate, align } = jscadInstance.transforms
    const { cuboid } = jscadInstance.primitives

    const profileBbox = measureBoundingBox(opts.geomProfile);
    const profileSize = [profileBbox[1][0] - profileBbox[0][0], profileBbox[1][1] - profileBbox[0][1]];

    const baseBlock = cuboid({ size: [opts.size[0] - profileSize[0], opts.size[1], opts.size[2]] });
    const edgeBlock = rotate([Math.PI / 2, 0, 0], extrudeLinear({ height: opts.size[1] }, opts.geomProfile));
    const baseBlockBbox = measureBoundingBox(baseBlock);
    const alignedEdgeBlock = align({ modes: ['min', 'max', 'none'], relativeTo: baseBlockBbox[1] }, edgeBlock);

    return align({ modes: ['center', 'center', 'none'] }, union(baseBlock, alignedEdgeBlock));
  }

  /**
   * Builds positive mouldings and negative moulds for various ornaments.
   * These would then be subtracted from a shape to produce the final result.
   * Input 2D profiles must be centred at (0, 0, 0)
   * @module mouldBuilder
   * @version 1.0.0
   */
  module.exports = {
    cuboidOneEdge,
    /**
     * Positive moulding for a cuboid with the given 2D profile placed onto all the side edges.
     * @param {Object} opts
     * @param {number[]} opts.size - size (x, y, z)
     * @param {geom2.Geom2} opts.geomProfile - 2D positive cross-section profile
     */
    cuboidEdge: (opts) => {
      const { union, intersect } = jscadInstance.booleans
      const { rotate, align, mirror } = jscadInstance.transforms


      // // X axis
      const xHalfSize = [opts.size[0] / 2, opts.size[1], opts.size[2]];
      const xHalfBlock = align({ modes: ['min', 'center', 'none'] }, cuboidOneEdge({ lib: jscadInstance, size: xHalfSize, geomProfile: opts.geomProfile }));
      const xBlock = union(xHalfBlock, mirror({ normal: [1, 0, 0] }, xHalfBlock));

      // // Y axis
      const yHalfSize = [opts.size[0], opts.size[1] / 2, opts.size[2]];
      const yHalfBlock = rotate([0, 0, Math.PI / -2], cuboidOneEdge({ lib: jscadInstance, size: yHalfSize, geomProfile: opts.geomProfile }));
      const yHalfBlockAdj = align({ modes: ['center', 'max', 'none'] }, yHalfBlock);
      const yBlock = union(yHalfBlockAdj, mirror({ normal: [0, 1, 0] }, yHalfBlockAdj));

      return intersect(xBlock, yBlock);
    },
    /**
     * Positive moulding for a polygonal prism with the given 2D profile placed onto all the side edges.
     * @param {Object} opts
     * @param {number} opts.numSides - number of sides in prism
     * @param {number} opts.radius - prism radius (apothem). Distance from centre to midpoint of side
     * @param {number} opts.height - prism height.
     * @param {geom2.Geom2} opts.geomProfile - 2D positive cross-section profile
     */
    polygonalEdge: (opts) => {
      const { union, subtract } = jscadInstance.booleans
      const { rotate, align } = jscadInstance.transforms
      const { cuboid, cylinder } = jscadInstance.primitives

      const sideLength = opts.radius * 1.25;
      const circumradius = opts.radius / Math.cos(Math.PI / opts.numSides);

      const block = cuboidOneEdge({ lib: jscadInstance, size: [opts.radius, sideLength, opts.height], geomProfile: opts.geomProfile });
      const adjustedBlock = align({ modes: ['min', 'center', 'none'] }, block);
      const mouldBlock = align({ modes: ['min', 'center', 'none'] }, cuboid({ size: [circumradius + 1, sideLength, opts.height] }));
      const mould = subtract(mouldBlock, adjustedBlock);

      const centralAngle = Math.PI * 2 / opts.numSides;
      const rotationAngles = [];
      for (let index = 1; index < opts.numSides; index++) {
        rotationAngles.push(centralAngle * index);
      }
      const rotatedMoulds = rotationAngles.map(angle => {
        return rotate([0, 0, angle], mould);
      })
      const finalMould = union(mould, ...rotatedMoulds);
      const blank = cylinder({ radius: circumradius, height: opts.height });

      return subtract(blank, finalMould)
    },
    /**
     * Positive moulding for a cylinder with the given 2D profile placed onto the edge.
     * @param {Object} opts
     * @param {number} opts.radius - Cylinder radius.
     * @param {number} opts.height - Cylinder height.
     * @param {geom2.Geom2} opts.geomProfile - 2D positive cross-section profile
     */
    circularEdge: (opts) => {
      const { measureBoundingBox } = jscadInstance.measurements
      const { extrudeRotate } = jscadInstance.extrusions
      const { union } = jscadInstance.booleans
      const { translate } = jscadInstance.transforms
      const { cylinder } = jscadInstance.primitives

      const profileBbox = measureBoundingBox(opts.geomProfile);
      const profileSize = [profileBbox[1][0] - profileBbox[0][0], profileBbox[1][1] - profileBbox[0][1]];
      const baseCylRad = opts.radius - profileSize[0];
      // cylinder expanded by a tiny amount to ensure no gaps
      const baseCyl = cylinder({ radius: baseCylRad + 0.05, height: opts.height });

      const adjProfile = translate([baseCylRad + profileSize[0] / 2], opts.geomProfile);
      const edgeMoulding = extrudeRotate({ segments: 48 }, adjProfile);

      return union(baseCyl, edgeMoulding);
    },
    /**
     * Negative mould for a rectangular sunken panel, to be placed on a wall/ceiling surface
     * @param {Object} opts
     * @param {number[]} opts.edge - size (x, y)
     * @param {geom2.Geom2} opts.geomProfile - 2D positive cross-section profile for edge
     */
    sunkenPanelRect: (opts) => {
      return null;
    },
    /**
     * Negative mould for a circular sunken panel, to be placed on a wall/ceiling surface
     * @param {Object} opts
     * @param {number} opts.radius - panel radius
     * @param {geom2.Geom2} opts.geomProfile - 2D positive cross-section profile for edge
     */
    sunkenPanelCirc: (opts) => {
      return null;
    },
  }
}

/**
 * Builds positive mouldings and negative moulds for various ornaments.
 * These would then be subtracted from a shape to produce the final result.
 * Input 2D profiles must be centred at (0, 0, 0)
 * @module mouldBuilder
 * @version 1.0.0
 */
module.exports = { init: mouldBuilderInit }
