const _arrCartesianProduct = (a, b) => a.reduce((acc, x) => [...acc, ...b.map(y => [x, y])], []);
const _objColl = (acc, curr) => {
    if (acc == null) {
        return curr;
    }
    return union(acc, curr);
};

const utils = {
    isEven: (n) => {
        return n % 2 == 0;
    },
    isOdd: (n) => {
        return Math.abs(n % 2) == 1;
    },
    arrayCartesianProduct: _arrCartesianProduct,
    convertInchesToMm: (numInches) => numInches * INCHES_MM_FACTOR,
    convertMmToInches: (numMils) => numMils / INCHES_MM_FACTOR,
    objCollector: _objColl,
    combineGeometries: (geoms) => {
        return geoms.reduce(_objColl, null);
    },
    geo: {
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
}
