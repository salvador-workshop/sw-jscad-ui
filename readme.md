# sw-jscad

Salvador Workshop's JSCAD utilities and toolkit.

Online viewer: https://sw-jscad-viewer.netlify.app/  
Docs: https://salvador-workshop.github.io/sw-jscad/  
NPM package: https://www.npmjs.com/package/sw-jscad

## Usage

Works with JSCAD, however you consume it.

```javascript
//---------------
// Initializing

const jscad = require('@jscad/modeling')
const swJscad = require('sw-jscad').init({ lib: jscad });

const { translate } = jscad.transforms;

const {
    walls,
    layout,
} = swJscad


//-------
// Main

const main = () => {
    const layoutOpts = {
        column: true,
        relativeTo: [0, -75, 0],
        layoutMargin: 15,
    }

    const wall1 = walls.build({
        height: 100,
        thickness: 10,
        length: 90,
        trimOpts: ['base', 'dado'],
        baseUnits: 1,
        trimUnitHeight: 4,
        trimUnitDepth: 1.25,
    });
    layout.addToLayout({ name: 'Wall (1)', desc: 'Base + dado trim', geom: wall1, layoutOpts });

    const wall2 = walls.build({
        height: 100,
        thickness: 10,
        length: 80,
        trimOpts: ['base', 'crown'],
        crownUnits: 1,
        baseUnits: 2,
        trimUnitHeight: 4,
        trimUnitDepth: 1.25,
    });
    layout.addToLayout({ name: 'Wall (2)', desc: 'Base + crown trim', geom: wall2, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
```
