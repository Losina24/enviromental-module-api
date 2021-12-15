"use strict";
/**
 * Name: Utils.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
 */
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
    static sendRestResponse(output, res) {
        console.log(output);
        res.status(output.http).send({
            http: output.http,
            message: output.message,
            result: output.result
        });
    }
    static generateLogicError(message, error) {
        return {
            http: 400,
            message: message,
            result: error
        };
    }
    static generateLogicSuccess(message, result) {
        return {
            http: 200,
            message: message,
            result: result
        };
    }
    static generateLogicSuccessEmpty(message) {
        return {
            http: 204,
            message: message,
        };
    }
}
exports.default = Utils;
