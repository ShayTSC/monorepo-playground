"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ms_1 = __importDefault(require("ms"));
var lunchtime_1 = __importDefault(require("./lunchtime"));
var millisecondsUntil_1 = __importDefault(require("./millisecondsUntil"));
function howLongUntilLunch(hours, minutes) {
    // lunch is at 12.30
    if (hours === undefined)
        hours = 12;
    if (minutes === undefined)
        minutes = 30;
    var millisecondsUntilLunchTime = millisecondsUntil_1.default(lunchtime_1.default(hours, minutes));
    return ms_1.default(millisecondsUntilLunchTime, { long: true });
}
exports.default = howLongUntilLunch;
//# sourceMappingURL=main.js.map