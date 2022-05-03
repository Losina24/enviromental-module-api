"use strict";
/**
 * Name: MeasureDatabaseHandler.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the measures feature
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const fs = require('fs');
const Utils_1 = __importDefault(require("../Utils"));
class MeasureDatabaseHandler {
    /**
     * Get user measures
     * userId: N -> getUserMeasures() -> [Measure]
     *
     * @param userId id of the user we want to retrieve the measures from
     * @returns
     */
    getUserMeasuresFromDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT `measure`.*, sensor_type.name as sensor_type_name FROM `user_device` INNER JOIN `device` ON" +
                " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
                " INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` INNER JOIN sensor_type ON sensor_type.id=sensor.sensor_type_id WHERE `user_device`.`user_id` = " + userId + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting user measures", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("user measures retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no user measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all user measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get user measures
     * userId: N -> getUserMeasures() -> [Measure]
     *
     * @param userId id of the user we want to retrieve the measures from
     * @returns
     */
    getDeviceMeasuresFromDB(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT sensor.*, measure.*, sensor_type.name as sensor_type_name FROM measure INNER JOIN sensor ON sensor.id=measure.sensor_id INNER JOIN sensor_type ON sensor_type.id=sensor.id WHERE sensor.device_id = " + deviceId + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting device measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting device measures", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("device measures retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no device measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all device measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get council measures
     * sensorId: N -> getAdminMeasures() -> [Measure]
     *
     * @param sensorId id of the council we want to retrieve the measures from
     * @returns
     */
    getSensorLastMeasureFromDB(sensorId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT measure.* , sensor_type.name as sensor_type_name FROM `measure` INNER JOIN sensor ON sensor.id=measure.sensor_id INNER JOIN sensor_type ON sensor_type.id=sensor.sensor_type_id" +
                " WHERE sensor_id=" + sensorId + " ORDER BY timestamp DESC LIMIT 1;";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting last sensor measure", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting last sensor measure", err));
                        }
                        try {
                            if (results[0]) {
                                console.log(results[0]);
                                let mapFormatRes = {
                                    type: results[0].sensor_type_name,
                                    value: results[0].value,
                                    unit: results[0].unit,
                                    dangerous: results[0].danger,
                                    date: results[0].timestamp
                                };
                                resolve(Utils_1.default.generateLogicSuccess("sensor last measure retrieved succesfully", mapFormatRes));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting last sensor measure", error));
                        }
                    });
                });
            });
        });
    }
    /**
        * Get user measures
        * userId: N -> getUserMeasures() -> [Measure]
        *
        * @param userId id of the user we want to retrieve the measures from
        * @returns
        */
    insertMeasureInDB(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(measure);
            var query = "INSERT INTO `measure` (`sensor_id`, `value`, `timestamp`, `unit`, `danger`) VALUES ('" + measure.getSensorId()
                + "', '" + measure.getValue() + "', '" + measure.getDate() + "', '" + measure.getUnit() + "', '" + measure.getDanger() + "');";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error inserting measure", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error inserting measure", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("measure inserted succesfully", results.insertId));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("inserting measure didn't work"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error inserting measure", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get council measures
     * councilId: N -> getAdminMeasures() -> [Measure]
     *
     * @param councilId id of the council we want to retrieve the measures from
     * @returns
     */
    getAdminMeasuresFromDB(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT measure.*, sensor_type.name as sensor_type_name FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id INNER JOIN " +
                "sensor ON sensor.device_id=device.id INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` " +
                "INNER JOIN sensor_type ON sensor_type.id=sensor.sensor_type_id WHERE gateway.council_id=" + councilId + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting council measures", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("council measures retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no council measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all council measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get all measures
     * getRootMeasures() -> [Measure]
     *
     * @returns
     */
    getRootMeasuresFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT measure.*, sensor_type.name as sensor_type_name FROM `measure` INNER JOIN sensor ON sensor.id=measure.sensor_id INNER JOIN sensor_type ON sensor_type.id=sensor.sensor_type_id;";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting all measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting all measures", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("all measures retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no user measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
 * Get user measures
 * userId: N -> getUserMeasures() -> [Measure]
 *
 * @param userId id of the user we want to retrieve the measures from
 * @returns
 */
    getUserMeasuresCountFromDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM `user_device` INNER JOIN `device` ON" +
                " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
                " INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` WHERE `user_device`.`user_id` = " + userId + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting user measures", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("user measures retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no user measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all user measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get council measures
     * councilId: N -> getAdminMeasures() -> [Measure]
     *
     * @param councilId id of the council we want to retrieve the measures from
     * @returns
     */
    getAdminMeasuresCountFromDB(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id INNER JOIN " +
                "sensor ON sensor.device_id=device.id INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` " +
                "WHERE gateway.council_id=" + councilId + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting council measures", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("council measures retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no council measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all council measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get all measures
     * getRootMeasures() -> [Measure]
     *
     * @returns
     */
    getRootMeasuresCountFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM `measure`;";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting all measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting all measures", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("all measures retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no user measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
* Get user measures
* userId: N -> getUserMeasures() -> [Measure]
*
* @param userId id of the user we want to retrieve the measures from
* @returns
*/
    getUserMeasuresPaginatedFromDB(userId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstValue = (pageSize * pageIndex) - pageSize;
            const secondValue = (pageSize * pageIndex);
            var query = "SELECT `measure`.*, sensor_type.name as sensor_type_name FROM `user_device` INNER JOIN `device` ON" +
                " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
                " INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` INNER JOIN sensor_type ON sensor_type.id=sensor.sensor_type_id WHERE `user_device`.`user_id` = " + userId
                + " ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting user measures", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("user measures retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no user measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all user measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get council measures
     * councilId: N -> getAdminMeasures() -> [Measure]
     *
     * @param councilId id of the council we want to retrieve the measures from
     * @returns
     */
    getAdminMeasuresPaginatedFromDB(councilId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstValue = (pageSize * pageIndex) - pageSize;
            const secondValue = (pageSize * pageIndex);
            var query = "SELECT measure.*, sensor_type.name as sensor_type_name FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id INNER JOIN " +
                "sensor ON sensor.device_id=device.id INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` " +
                " INNER JOIN sensor_type ON sensor_type.id=sensor.sensor_type_id WHERE gateway.council_id=" + councilId + " ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting council measures", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("council measures retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no council measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all council measures", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get all measures
     * getRootMeasures() -> [Measure]
     *
     * @returns
     */
    getRootMeasuresPaginatedFromDB(pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstValue = (pageSize * pageIndex) - pageSize;
            const secondValue = (pageSize * pageIndex);
            var query = "SELECT measure.*, sensor_type.name as sensor_type_name FROM `measure` INNER JOIN sensor ON sensor.id=measure.sensor_id INNER JOIN sensor_type ON sensor_type.id=sensor.sensor_type_id ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting all measures", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting all measures", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("all measures retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no user measures found"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting all measures", error));
                        }
                    });
                });
            });
        });
    }
}
exports.default = MeasureDatabaseHandler;
