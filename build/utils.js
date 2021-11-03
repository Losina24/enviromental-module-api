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
            const device = {
                id: element.getId(),
                name: element.getName(),
                mac: element.getMac(),
                gatewayId: element.getGatewayId(),
                //sensors: element.getSensors(),
                coords: element.getCoords(),
                status: element.getStatus(),
            };
            res.push(device);
        });
        return res;
    }
    /**
     * This method parse an array of enviromental devices to an array of objects
     * enviromentalDevice: EnviromentalDevice -> enviromentalDeviceToObject() -> object
     *
     * @param enviromentalDevice
     * @returns
     */
    static enviromentalDeviceToObject(enviromentalDevice) {
        // Generating an object by the enviromental device given
        let res = {
            id: enviromentalDevice.getId(),
            name: enviromentalDevice.getName(),
            mac: enviromentalDevice.getMac(),
            gatewayId: enviromentalDevice.getGatewayId(),
            //sensors: enviromentalDevice.getSensors(),
            coords: enviromentalDevice.getCoords(),
            status: enviromentalDevice.getStatus(),
        };
        return res;
    }
}
exports.default = Utils;
