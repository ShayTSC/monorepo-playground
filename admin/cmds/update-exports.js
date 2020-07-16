"use strict";

const fs = require("fs");
const { resolve } = require("path");

const sourceEthers = fs.readFileSync(resolve(__dirname, "../../packages/demo/src/index.ts")).toString();
const targets = sourceEthers.match(/export\s*{\s*((.|\s)*)}/)[1].trim();

const output = `"use strict";

// To modify this file, you must update ./admin/cmds/update-exports.js

import * as demo from "./demo";

try {
    const anyGlobal = (window as any);

    if (anyGlobal.demo == null) {
        anyGlobal.demo = demo;
    }
} catch (error) { }

export { demo };

export {
    ${ targets }
} from "./demo";
`;

fs.writeFileSync(resolve(__dirname, "../../packages/demo/src/index.ts"), output);
