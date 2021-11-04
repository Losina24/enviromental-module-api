"use strict";
/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
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
const EnviromentalDevice_1 = __importDefault(require("./EnviromentalDevice"));
class EnviromentalDeviceDatabaseHandler {
    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    queryResultsToEnviromentalDevices(results) {
        let enviromentalDevices = [];
        results.forEach((element) => {
            let device = new EnviromentalDevice_1.default();
            device.setId(element.id);
            device.setName(element.name);
            device.setMac(element.identifier);
            device.setGatewayId(element.gateway_id);
            device.setCoords([element.latitude, element.longitude]);
            device.setStatus(element.status);
            enviromentalDevices.push(device);
        });
        return enviromentalDevices;
    }
    // Methods 
    /**
     * Get the information about a enviromental device given their ID from the database
     * deviceId: N -> getDeviceByIdFromDB() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getDeviceByIdFromDB(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT * FROM device WHERE id = " + deviceId;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject();
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject();
                        }
                        let device = new EnviromentalDevice_1.default();
                        device.setId(results[0].id);
                        device.setName(results[0].name);
                        device.setMac(results[0].identifier);
                        device.setGatewayId(results[0].gateway_id);
                        device.setCoords([results[0].latitude, results[0].longitude]);
                        device.setStatus(results[0].status);
                        resolve(device);
                    });
                });
            });
        });
    }
    /**
     * Get all enviroment devices of a user from the database
     * userId: N -> getAllUserDevicesFromDB() -> [JSON]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    getAllUserDevicesFromDB(userId) {
        var query = "SELECT d.* FROM device AS d INNER JOIN user_device AS ud ON d.id = ud.device_id WHERE ud.user_id = " + userId;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject();
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject();
                    }
                    let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                    resolve(enviromentalDevices);
                });
            });
        });
    }
    /**
     * Get enviromental devices from a user in a pagination format
     * userId: N, pageSize: N, pageIndex: N -> getUserDevicePaginationFromDB() -> [JSON]
     *
     * @param userId - ID of the user u want to get devices from
     * @param pageSize - Number of devices returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getUserDevicePaginationFromDB(userId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstValue = (pageSize * pageIndex) - pageSize;
            const secondValue = (pageSize * pageIndex);
            var query = "SELECT d.* FROM device AS d INNER JOIN user_device AS u ON d.id = u.device_id WHERE u.user_id = " + userId + " ORDER BY d.id DESC LIMIT " + firstValue + ', ' + secondValue;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject();
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err || results == undefined || results.length == 0) {
                            reject();
                        }
                        let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                        resolve(enviromentalDevices);
                    });
                });
            });
        });
    }
    /**
     * Get all enviromental devices from a council
     * councilId: N -> getAllCouncilDevicesFromDB() -> [JSON]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns
     */
    getAllCouncilDevicesFromDB(councilId) {
        var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id WHERE g.council_id = " + councilId;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject();
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject();
                    }
                    let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                    resolve(enviromentalDevices);
                });
            });
        });
    }
    /**
     * Get enviromental devices of a gateway
     * gatewayId: N -> getGatewayDevicesFromDB() -> [JSON]
     *
     * @param gatewayId - ID of the gateway that you want to get all enviromental devices
     * @returns
     */
    getGatewayDevicesFromDB(gatewayId) {
        var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id WHERE g.id = " + gatewayId;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject();
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject();
                    }
                    let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                    resolve(enviromentalDevices);
                });
            });
        });
    }
    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDeviceInDB() -> boolean
     *
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns
     */
    storeDeviceInDB(enviromentalDevice) {
        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO device (identifier, gateway_id, name, latitude, longitude, status) VALUES ('" + enviromentalDevice.getMac() + "'," + enviromentalDevice.getGatewayId() + ", '" + enviromentalDevice.getName() + "', " + enviromentalDevice.getCoords().latitude + ", " + enviromentalDevice.getCoords().longitude + ", 0)";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(false);
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // Si la consulta falla
                    if (err) {
                        reject(false);
                    }
                    resolve(true);
                });
            });
        });
    }
    /**
     * Get enviromental devices from an admin
     * adminId: N, pageSize: N, pageIndex: N -> getAdminDevicePaginationFromDB() -> [JSON]
     *
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getAdminDevicePaginationFromDB(adminId, pageSize, pageIndex) {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);
        var query = "SELECT d.* FROM device ORDER BY d.id DESC LIMIT " + firstValue + ', ' + secondValue;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject();
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err || results == undefined || results.length == 0) {
                        reject();
                    }
                    let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                    resolve(enviromentalDevices);
                });
            });
        });
    }
    /**
     * Get all enviromental devices from a council
     * councilId: N, pageSize: N, pageIndex: N -> getAllAdminDevicesFromDB() -> [JSON]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getCouncilDevicePaginationFromDB(councilId, pageSize, pageIndex) {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);
        var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id INNER JOIN council AS c ON c.id = g.council_id WHERE c.id = " + councilId + " ORDER BY d.id DESC LIMIT " + firstValue + ', ' + secondValue;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject();
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err || results == undefined || results.length == 0) {
                        reject();
                    }
                    let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                    resolve(enviromentalDevices);
                });
            });
        });
    }
}
exports.default = EnviromentalDeviceDatabaseHandler;
