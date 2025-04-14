"use strict"

/**
 * Simple cuboid
 * @param {Object} opts
 * @param {Object} opts.lib - `@jscad/modeling` instance 
 * @param {number} opts.height - element height
 * @param {number} opts.radius - element radius
 */
const colCuboid = (opts) => {
  const { cuboid } = lib.primitives

  return cuboid({ size: [opts.radius * 2, opts.radius * 2, opts.height] });
}

/**
 * Simple cylinder
 * @param {Object} opts
 * @param {Object} opts.lib - `@jscad/modeling` instance 
 * @param {number} opts.height - element height
 * @param {number} opts.radius - element radius
 */
const colCylinder = (opts) => {
  const { cylinder } = lib.primitives

  return cylinder({ radius: opts.radius, height: opts.height });
}

/**
 * Simple round cylinder
 * @param {Object} opts
 * @param {Object} opts.lib - `@jscad/modeling` instance 
 * @param {number} opts.height - element height
 * @param {number} opts.radius - element radius
 * @param {number} opts.roundRadius - radius of cylinder edge
 */
const capRdCylinder = (opts) => {
  const { align } = lib.transforms
  const { cuboid, roundedCylinder } = lib.primitives
  const { subtract } = lib.booleans

  const rdRadius = opts.roundRadius || 0.75;
  const baseShape = roundedCylinder({ radius: opts.radius, height: opts.height * 2, roundRadius: rdRadius });
  const cutBlock = align(
    { modes: ['none', 'none', 'min'] },
    cuboid({ size: [opts.radius * 2.5, opts.radius * 2.5, opts.height * 2] })
  );

  return subtract(baseShape, cutBlock);
}

/**
 * Base round cylinder
 * @param {Object} opts
 * @param {Object} opts.lib - `@jscad/modeling` instance 
 * @param {number} opts.height - element height
 * @param {number} opts.radius - element radius
 * @param {number} opts.roundRadius - radius of cylinder edge
 */
const baseRdCylinder = (opts) => {
  const { align } = lib.transforms
  const { cuboid, roundedCylinder } = lib.primitives
  const { subtract } = lib.booleans

  const rdRadius = opts.roundRadius || 1;
  const baseShape = roundedCylinder({ radius: opts.radius, height: opts.height * 2, roundRadius: rdRadius });
  const cutBlock = align(
    { modes: ['none', 'none', 'max'] },
    cuboid({ size: [opts.radius * 2.5, opts.radius * 2.5, opts.height * 2] })
  );

  return subtract(baseShape, cutBlock);
}

/**
 * Simple extrude
 * @param {Object} opts
 * @param {Object} opts.lib - `@jscad/modeling` instance 
 * @param {number} opts.height - element height
 * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
 */
const colExtrude = (opts) => {
  const { extrudeLinear } = lib.extrusions

  return extrudeLinear({ height: opts.height }, opts.geomProfile);
}


/**
 * Defines the construction of column sub-components (base, shaft, capital).
 * All functions follow the function signature of base.cuboid().
 * @version 2.2.0
 * @access private
 */
const columnPartBuilder = {
  base: {
    cuboid: colCuboid,
    cylinder: colCylinder,
    roundCylinder: baseRdCylinder,
    extrude: colExtrude,
  },
  shaft: {
    cuboid: colCuboid,
    cylinder: colCylinder,
    extrude: colExtrude,
  },
  capital: {
    cuboid: colCuboid,
    cylinder: colCylinder,
    roundCylinder: capRdCylinder,
    extrude: colExtrude,
  },
}

/**
 * Builds columns. Input 2D profiles must be centred at (0, 0, 0)
 * @module columnBuilder
 * @version 3.0.0
 */
module.exports = {
  columnPartBuilder,
  /**
   * Builds a three-part column using the specified dimensions and styles.
   * @param {Object} opts
   * @param {Object} opts.lib - `@jscad/modeling` instance 
   * @param {Array<string|number|geom2.Geom2|null>} opts.base - specs for column base (style, height, radius, geomProfile)
   * @param {Array<string|number|geom2.Geom2|null>} opts.shaft - specs for column shaft (style, radius, geomProfile)
   * @param {Array<string|number|geom2.Geom2|null>} opts.capital - specs for column capital (style, height, radius, geomProfile)
   * @param {number} opts.height - total height of column
   */
  threePt: (opts) => {
    const { align } = lib.transforms
    const { measureBoundingBox } = lib.measurements
    const { union } = lib.booleans

    const baseStyle = opts.base[0];
    const shaftStyle = opts.shaft[0];
    const capitalStyle = opts.capital[0];

    const base = columnPartBuilder.base[baseStyle]({
      height: opts.base[1],
      radius: opts.base[2],
      geomProfile: opts.base[3],
    });

    const shaft = columnPartBuilder.shaft[shaftStyle]({
      height: opts.height,
      radius: opts.shaft[1],
      geomProfile: opts.shaft[2],
    });

    const capital = columnPartBuilder.capital[capitalStyle]({
      height: opts.capital[1],
      radius: opts.capital[2],
      geomProfile: opts.capital[3],
    });

    const shaftBbox = measureBoundingBox(shaft);
    const [shaftMin, shaftMax] = [shaftBbox[0][2], shaftBbox[1][2]];

    const alignedBase = align({ modes: ['center', 'center', 'min'], relativeTo: [0, 0, shaftMin] }, base)
    const alignedCap = align({ modes: ['center', 'center', 'max'], relativeTo: [0, 0, shaftMax] }, capital)

    return align({ modes: ['center', 'center', 'min'] }, union(alignedBase, shaft, alignedCap))
  }
}
