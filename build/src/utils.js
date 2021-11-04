"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    /**
     * This method parse an array of enviromental devices to an array of objects
     * enviromentalDevices: [EnviromentalDevice] -> enviromentalDevicesToObjects() -> [object]
     *
     * @param enviromentalDevices
     * @returns
     */
    static enviromentalDevicesToObjects(enviromentalDevices) {
        let res = [];
        // Generating an object for each enviromental device
        enviromentalDevices.forEach((element) => {
            res.push(element.toObject());
        });
        return res;
    }
}
exports.default = Utils;
