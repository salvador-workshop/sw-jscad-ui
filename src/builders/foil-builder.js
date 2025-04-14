"use strict"

/**
 * Builds a 2D n-foil opening
 * @param {Object} opts
 * @param {Object} opts.lib - `@jscad/modeling` instance 
 * @param {number} opts.numLobes - number of lobes
 * @param {number} opts.radius - radius of container circle
 * @param {string} opts.lobeRadiusType - "inSlice", "halfRadius", "mean"
 * @access private
 */
const buildFoil2d = (opts) => {
    const { union } = lib.booleans
    const { rotate, align } = lib.transforms
    const { circle } = lib.primitives

    // console.log(opts);
    // const containerCircle = circle({ radius: opts.radius });
    const centralAngle = Math.PI * 2 / opts.numLobes;
    const sinHalfCentral = Math.sin(centralAngle / 2);

    // this radius has zero overlap between lobe circles
    const lobeRadiusInSlice = sinHalfCentral / (1 + sinHalfCentral) * opts.radius;
    const lobeRadiusDiff = opts.radius / 2 - lobeRadiusInSlice;
    const lobeRadiusMean = lobeRadiusInSlice + (lobeRadiusDiff / 2);

    const lobeRadType = opts.lobeRadiusType || 'mean'
    let lobeRadius = lobeRadiusMean;
    if (lobeRadType === 'inSlice') {
        lobeRadius = lobeRadiusInSlice
    } else if (lobeRadType === 'halfRadius') {
        lobeRadius = opts.radius / 2
    }

    const lobeCircle = circle({ radius: lobeRadius });
    const alignedLobeCircle = align({ modes: ['none', 'min'], relativeTo: [0, -opts.radius] }, lobeCircle);
    let centreCircle = lobeCircle;
    if (opts.numLobes === 3) {
        // special case for trefoils
        if (lobeRadType === 'mean') {
            centreCircle = circle({ radius: opts.radius * 0.435 });
        }
        else if (lobeRadType === 'inSlice') {
            centreCircle = circle({ radius: opts.radius * 0.3 });
        }
    }

    const rotationAngles = [];
    for (let index = 1; index < opts.numLobes; index++) {
        rotationAngles.push(centralAngle * index);
    }
    // console.log(rotationAngles);

    const rotatedLobes = rotationAngles.map(angle => {
        return rotate([0, 0, angle], alignedLobeCircle);
    });

    return union(centreCircle, alignedLobeCircle, ...rotatedLobes);
}

/**
 * Builds a 3D n-foil opening using a given 2D cross-section profile
 * @param {Object} opts
 * @param {Object} opts.lib - `@jscad/modeling` instance 
 * @param {number} opts.numLobes - number of lobes
 * @param {number} opts.radius - radius of container circle
 * @param {string} opts.lobeRadiusType - "inSlice", "halfRadius", "mean"
 * @param {boolean} opts.cutCentre - if true, cuts a circular hole in centre of opening
 * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
 * @access private
 */
const buildFoil3d = (opts) => {
    const { measureBoundingBox } = lib.measurements
    const { extrudeRotate } = lib.extrusions
    const { union, subtract, scission } = lib.booleans
    const { translate, mirror, rotate, align } = lib.transforms
    const { cuboid, rectangle } = lib.primitives

    console.log(opts);
    // const containerCircle = circle({ radius: opts.radius });
    const centralAngle = Math.PI * 2 / opts.numLobes;
    const sinHalfCentral = Math.sin(centralAngle / 2);
    const isCentreCut = opts.cutCentre || true;

    // this radius has zero overlap between lobe circles
    const lobeRadiusInSlice = sinHalfCentral / (1 + sinHalfCentral) * opts.radius;
    const lobeRadiusDiff = opts.radius / 2 - lobeRadiusInSlice;
    const lobeRadiusMean = lobeRadiusInSlice + (lobeRadiusDiff / 2);

    const lobeRadType = opts.lobeRadiusType || 'mean'
    let lobeRadius = lobeRadiusMean;
    if (lobeRadType === 'inSlice') {
        lobeRadius = lobeRadiusInSlice
    } else if (lobeRadType === 'halfRadius') {
        lobeRadius = opts.radius / 2
    }

    const translatedProfile = translate([lobeRadius, 0, 0], opts.geomProfile);
    const lobeCircle = extrudeRotate({ segments: 48 }, translatedProfile);
    const alignedLobeCircle = translate([0, -(opts.radius - lobeRadius), 0], lobeCircle);

    const lobeCircleBbox = measureBoundingBox(alignedLobeCircle);
    const cutBlockThickness = (lobeCircleBbox[1][2] - lobeCircleBbox[0][2]) * 2;
    const cutBlock1 = rotate([0, 0, centralAngle / 2], align({ modes: ['min', 'center', 'none'] }, cuboid({ size: [lobeRadius, opts.radius * 2, cutBlockThickness] })));
    const cutBlock2 = mirror({ normal: [1, 0, 0] }, cutBlock1);
    const cutBlock = union(cutBlock1, cutBlock2);
    let cutLobe = subtract(alignedLobeCircle, cutBlock);

    const profileBbox = measureBoundingBox(opts.geomProfile);
    console.log(profileBbox);
    const profileSize = [profileBbox[1][0] - profileBbox[0][0], profileBbox[1][1] - profileBbox[0][1]];
    console.log(profileSize);
    const negProfile = subtract(rectangle({ size: [profileSize[0] + 1, profileSize[1] + 1] }), opts.geomProfile);
    const negProfileCut = subtract(negProfile, translate([(profileSize[0] + 2) / 2, 0, 0], rectangle({ size: [profileSize[0] + 2, profileSize[1] + 2] })));
    const negProfileAdj = translate([profileSize[0] / 2, 0, 0], negProfileCut);

    let centreCircle = extrudeRotate({ segments: 48 }, translate([lobeRadius, 0, 0], negProfileAdj));
    if (opts.numLobes === 3) {
        // special case for trefoils
        if (lobeRadType === 'mean') {
            centreCircle = extrudeRotate({ segments: 48 }, translate([opts.radius * 0.435, 0, 0], negProfileCut));
        }
        else if (lobeRadType === 'inSlice') {
            centreCircle = extrudeRotate({ segments: 48 }, translate([opts.radius * 0.3, 0, 0], negProfileCut));
        }
        else if (lobeRadType === 'halfRadius') {
            centreCircle = extrudeRotate({ segments: 48 }, translate([opts.radius * 0.5, 0, 0], negProfileCut));
        }
    }

    if (isCentreCut) {
        cutLobe = scission(subtract(cutLobe, centreCircle))[0];
    }

    const rotationAngles = [];
    for (let index = 1; index < opts.numLobes; index++) {
        rotationAngles.push(centralAngle * index);
    }

    const rotatedLobes = rotationAngles.map(angle => {
        return rotate([0, 0, angle], cutLobe);
    });

    return union(cutLobe, ...rotatedLobes)
}

/**
 * Builds "foil" shapes such as trefoils, quatrefoils, cinquefoils, etc. Input 2D profiles must be centred at (0, 0, 0)
 * @module foilBuilder
 * @version 2.0.0
 */
module.exports = {
    buildFoil2d,
    buildFoil3d,
    /**
     * Builds a trefoil opening using a given 2d cross-section profile
     * @param {Object} opts
     * @param {Object} opts.lib - `@jscad/modeling` instance 
     * @param {number} opts.radius - radius of container circle
     * @param {string} opts.lobeRadiusType - "inSlice", "halfRadius", "mean"
     * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
     * @param {boolean} opts.cutCentre - if true, cuts a circular hole in centre of opening (only for 3D)
     */
    trefoil: (opts) => {
        if (opts.geomProfile) {
            return buildFoil3d({ ...opts, numLobes: 3 });
        } else {
            return buildFoil2d({ ...opts, numLobes: 3 });
        }
    },
    /**
     * Builds a quatrefoil opening using a given 2d cross-section profile
     * @param {Object} opts
     * @param {Object} opts.lib - `@jscad/modeling` instance 
     * @param {number} opts.radius - radius of container circle
     * @param {string} opts.lobeRadiusType - "inSlice", "halfRadius", "mean"
     * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
     * @param {boolean} opts.cutCentre - if true, cuts a circular hole in centre of opening (only for 3D)
     */
    quatrefoil: (opts) => {
        if (opts.geomProfile) {
            return buildFoil3d({ ...opts, numLobes: 4 });
        } else {
            return buildFoil2d({ ...opts, numLobes: 4 });
        }
    },
    /**
     * Builds a cinquefoil opening using a given 2d cross-section profile
     * @param {Object} opts
     * @param {Object} opts.lib - `@jscad/modeling` instance 
     * @param {number} opts.radius - radius of container circle
     * @param {string} opts.lobeRadiusType - "inSlice", "halfRadius", "mean"
     * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
     * @param {boolean} opts.cutCentre - if true, cuts a circular hole in centre of opening (only for 3D)
     */
    cinquefoil: (opts) => {
        if (opts.geomProfile) {
            return buildFoil3d({ ...opts, numLobes: 5 });
        } else {
            return buildFoil2d({ ...opts, numLobes: 5 });
        }
    },
    /**
     * Builds a sexfoil opening using a given 2d cross-section profile
     * @param {Object} opts
     * @param {Object} opts.lib - `@jscad/modeling` instance 
     * @param {number} opts.radius - radius of container circle
     * @param {string} opts.lobeRadiusType - "inSlice", "halfRadius", "mean"
     * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
     * @param {boolean} opts.cutCentre - if true, cuts a circular hole in centre of opening (only for 3D)
     */
    sexfoil: (opts) => {
        if (opts.geomProfile) {
            return buildFoil3d({ ...opts, numLobes: 6 });
        } else {
            return buildFoil2d({ ...opts, numLobes: 6 });
        }
    },
    /**
     * Builds an octofoil opening using a given 2d cross-section profile
     * @param {Object} opts
     * @param {Object} opts.lib - `@jscad/modeling` instance 
     * @param {number} opts.radius - radius of container circle
     * @param {string} opts.lobeRadiusType - "inSlice", "halfRadius", "mean"
     * @param {geom2.Geom2} opts.geomProfile - 2D cross-section profile
     * @param {boolean} opts.cutCentre - if true, cuts a circular hole in centre of opening (only for 3D)
     */
    octofoil: (opts) => {
        if (opts.geomProfile) {
            return buildFoil3d({ ...opts, numLobes: 8 });
        } else {
            return buildFoil2d({ ...opts, numLobes: 8 });
        }
    },
}
