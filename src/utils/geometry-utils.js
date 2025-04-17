"use strict"

/**
 * TODO
 * + regPolygon
 *     - sideLength()
 *     - apothem()
 *     - circumradius()
 *     - interiorAngle()
 */

const _arrCartesianProduct = (a, b) => a.reduce((acc, x) => [...acc, ...b.map(y => [x, y])], []);

const geometryUtils = {
    getTriangularPtsInArea: (x, y, radius) => {
        const diam = radius * 2;
        const allPoints = [];

        const allYCoords = [];
        let yCoordCtr = 0;
        do {
            allYCoords.push(yCoordCtr);
            yCoordCtr = diam * 0.86603 + yCoordCtr;
        } while (yCoordCtr <= y);

        let yIdxCtr = 0;
        do {
            let xCtr = 0;
            do {
                if (utils.isEven(yIdxCtr)) {
                    allPoints.push({ x: xCtr, y: allYCoords[yIdxCtr] });
                } else {
                    allPoints.push({ x: radius + xCtr, y: allYCoords[yIdxCtr] });
                }
                xCtr = xCtr + diam;
            } while (xCtr <= x);
            yIdxCtr = yIdxCtr + 1;
        } while (yIdxCtr <= allYCoords.length);

        return allPoints;
    },
    getSquarePtsInArea: (x, y, radius) => {
        const diam = radius * 2;
        const allXCoords = [];
        let xCtr = 0;
        do {
            allXCoords.push(xCtr);
            xCtr = xCtr + diam;
        } while (xCtr <= x);

        const allYCoords = [];
        let yCtr = 0;
        do {
            allYCoords.push(yCtr);
            yCtr = yCtr + diam;
        } while (yCtr <= y);

        console.log(allXCoords, allYCoords);
        const allPoints = _arrCartesianProduct(allXCoords, allYCoords);

        return allPoints.map(pt => { return { x: pt[0], y: pt[1] } });
    }
}

module.exports = geometryUtils;
