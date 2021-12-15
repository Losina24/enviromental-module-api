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
const Utils_1 = __importDefault(require("../Utils"));
class EnviromentalDeviceDatabaseHandler {
    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    queryResultsToEnviromentalDevices(results) {
        let enviromentalDevices = [];
        results.forEach((element) => {
            let device = new EnviromentalDevice_1.default();
            device.setId(element.id);
            device.setName(element.name);
            device.setDeviceEUI(element.device_EUI);
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
            const query = "SELECT * FROM device WHERE id = " + deviceId;
            console.log(query);
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting device", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting device", err));
                        }
                        try {
                            if (results.length != 0) {
                                let device = new EnviromentalDevice_1.default();
                                device.setId(results[0].id);
                                device.setName(results[0].name);
                                device.setDeviceEUI(results[0].device_EUI);
                                device.setGatewayId(results[0].gateway_id);
                                device.setCoords([results[0].latitude, results[0].longitude]);
                                device.setStatus(results[0].status);
                                resolve(Utils_1.default.generateLogicSuccess("device found with the given id", device));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting device", error));
                        }
                        resolve(Utils_1.default.generateLogicSuccessEmpty("no device found with the given id"));
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
                    reject(Utils_1.default.generateLogicError("error getting all user devices", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting all user devices", err));
                    }
                    try {
                        console.log(results);
                        if (results.length != 0) {
                            let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                            resolve(Utils_1.default.generateLogicSuccess("user devices retrieved succesfully", enviromentalDevices));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("user has no related devices"));
                        }
                    }
                    catch (error) {
                        reject(Utils_1.default.generateLogicError("error getting all user devices", error));
                    }
                });
            });
        });
    }
    /**
     * Get all root enviromental devices from the database ( * COUNT * )
     * userId: N -> getAllUserDevicesFromDB() -> [JSON]
     *
     * @returns
     */
    getAllRootDevicesCountFromDB() {
        var query = "SELECT count(*) as count FROM device;";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error getting root user devices count", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting root user devices count", err));
                    }
                    try {
                        console.log("results.count");
                        console.log(results[0].count);
                        if (results[0].count != 0) {
                            resolve(Utils_1.default.generateLogicSuccess("root user devices count retrieved succesfully", results[0].count));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("root user has no related devices"));
                        }
                    }
                    catch (error) {
                        reject(Utils_1.default.generateLogicError("error getting root user devices count", error));
                    }
                });
            });
        });
    }
    /**
 * Get all admin enviromental devices from the database ( * COUNT * )
 * userId: N -> getAllUserDevicesFromDB() -> [JSON]
 *
 * @param userId - ID of the user that you want to get all enviromental devices
 * @returns
 */
    getAllAdminDevicesCountFromDB(councilId) {
        var query = "SELECT COUNT(*) as count FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id  WHERE gateway.council_id=" + councilId + ";";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error getting admin user devices count", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting admin user devices count", err));
                    }
                    try {
                        console.log("results.count");
                        console.log(results[0].count);
                        if (results[0].count != 0) {
                            resolve(Utils_1.default.generateLogicSuccess("admin user devices count retrieved succesfully", results[0].count));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("admin user has no related devices"));
                        }
                    }
                    catch (error) {
                        reject(Utils_1.default.generateLogicError("error getting admin user devices count", err));
                    }
                });
            });
        });
    }
    /**
     * Get all enviromental devices of a user from the database ( * COUNT * )
     * userId: N -> getAllUserDevicesFromDB() -> [JSON]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    getAllUserDevicesCountFromDB(userId) {
        var query = "SELECT count(*) as count FROM device AS d INNER JOIN user_device AS ud ON d.id = ud.device_id WHERE ud.user_id = " + userId;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error getting user devices count", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting user devices count", err));
                    }
                    try {
                        console.log("results.count");
                        console.log(results[0].count);
                        if (results[0].count != 0) {
                            resolve(Utils_1.default.generateLogicSuccess("user devices count retrieved succesfully", results[0].count));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("user has no related devices"));
                        }
                    }
                    catch (error) {
                        reject(error);
                    }
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
                        reject(Utils_1.default.generateLogicError("error getting user devices", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting user devices", err));
                        }
                        try {
                            if (results.length != 0) {
                                let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                                resolve(Utils_1.default.generateLogicSuccess("user devices retrieved succesfully", enviromentalDevices));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("user has no related devices"));
                            }
                        }
                        catch (error) {
                            reject(error);
                        }
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
                    reject(Utils_1.default.generateLogicError("error getting council devices", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting council devices", err));
                    }
                    try {
                        if (results.length != 0) {
                            let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                            resolve(Utils_1.default.generateLogicSuccess("council devices retrieved succesfully", enviromentalDevices));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("council has no related devices"));
                        }
                    }
                    catch (error) {
                        reject(error);
                    }
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
                    reject(Utils_1.default.generateLogicError("error getting gateway devices", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting gateway devices", err));
                    }
                    try {
                        if (results.length != 0) {
                            let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                            resolve(Utils_1.default.generateLogicSuccess("gateway devices retrieved succesfully", enviromentalDevices));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("gateway has no related devices"));
                        }
                    }
                    catch (error) {
                        reject(error);
                    }
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
    storeDeviceInDB(enviromentalDevice, userId) {
        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO device (device_EUI, gateway_id, name, latitude, longitude, status) VALUES ('" + enviromentalDevice.getDeviceEUI() + "'," + enviromentalDevice.getGatewayId() + ", '" + enviromentalDevice.getName() + "', " + enviromentalDevice.getCoords().latitude + ", " + enviromentalDevice.getCoords().longitude + ", 0)";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error storing device", error));
                }
                conn.query(query, (err, results) => __awaiter(this, void 0, void 0, function* () {
                    // Si la consulta falla
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error storing device", err));
                    }
                    try {
                        if (results.insertId) {
                            let lastInsertDeviceId = results.insertId;
                            yield this.linkDeviceToUser(lastInsertDeviceId, userId).then(res => {
                                if (res.http == 200) {
                                    console.log("Creation succeded");
                                    resolve(Utils_1.default.generateLogicSuccess("device created and linked to user succesfully", lastInsertDeviceId));
                                }
                                else {
                                    this.removeDeviceInDB(lastInsertDeviceId);
                                    resolve(Utils_1.default.generateLogicSuccessEmpty("device removed: couldnt be linked to user "));
                                }
                            });
                        }
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
            });
        });
    }
    /**
     * Create link between user and device
     * enviromentalDevice: EnviromentalDevice -> linkDeviceToUser() ->
     *
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns
     */
    linkDeviceToUser(deviceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
            var query = "INSERT INTO `user_device` (`user_id`, `device_id`) VALUES (" + userId + ", " + deviceId + ")";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error linking device to user", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        console.log("**** results ****");
                        console.log(results);
                        // Si la consulta falla
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error linking device to user", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("device linked successfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("device couldnt be linked"));
                            }
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                });
            });
        });
    }
    /**
     * Remove a device
     * deviceId: N -> removeDevice()
     *
     * @param deviceId - ID of the sensor we want to delete
     * @returns
     */
    removeDeviceInDB(deviceId) {
        var query = "DELETE FROM `device` WHERE `id`=" + deviceId + ";";
        console.log(query);
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error removing device", error));
                }
                if (conn) {
                    conn.query(query, (err, results) => {
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error linking device to user", err));
                        }
                        try {
                            if (results.affectedRows == 0) {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("no device was found with given id"));
                            }
                            resolve(Utils_1.default.generateLogicSuccess("device deleted succesfully", undefined));
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                }
                else {
                    reject(Utils_1.default.generateLogicError("error getting council devices", undefined));
                }
            });
        });
    }
    /**
     * Get enviromental devices from an admin
     * adminId: N, pageSize: N, pageIndex: N -> getRootDevicePaginationFromDB() -> [JSON]
     *
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getRootDevicePaginationFromDB(adminId, pageSize, pageIndex) {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);
        var query = "SELECT * FROM device ORDER BY device.id DESC LIMIT " + firstValue + ', ' + secondValue;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error removing device", error));
                }
                if (conn) {
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error removing device", err));
                        }
                        try {
                            if (results.length != 0) {
                                let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                                resolve(Utils_1.default.generateLogicSuccess("admin devices retrieved succesfully", enviromentalDevices));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("admin has no related devices"));
                            }
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                }
                else {
                    reject(Utils_1.default.generateLogicError("error getting council devices", undefined));
                }
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
    updateEnviromentalDevice(enviromentalDevice) {
        var query = "UPDATE device SET device_EUI = '" + enviromentalDevice.getDeviceEUI() + "', gateway_id= '" + enviromentalDevice.getGatewayId() +
            "', name = '" + enviromentalDevice.getName() + "', latitude='" + enviromentalDevice.getLatitude() + "', longitude='" +
            enviromentalDevice.getLongitude() + "', status='" + enviromentalDevice.getStatus() + "' WHERE id = " + enviromentalDevice.getId() + ";";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error updating device", error));
                }
                if (conn) {
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error updating device", err));
                        }
                        try {
                            if (results.affectedRows == 1) {
                                resolve(Utils_1.default.generateLogicSuccess("device updated successfully", enviromentalDevice));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("device has not been updated"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error updating device", err));
                        }
                    });
                }
                else {
                    reject(Utils_1.default.generateLogicError("error updating device", undefined));
                }
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
                    reject(Utils_1.default.generateLogicError("error getting council devices", error));
                }
                if (conn) {
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting council devices", err));
                        }
                        try {
                            if (results.length != 0) {
                                let enviromentalDevices = this.queryResultsToEnviromentalDevices(results);
                                resolve(Utils_1.default.generateLogicSuccess("council devices retrieved succesfully", enviromentalDevices));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("council has no related devices"));
                            }
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                }
                else {
                    reject(Utils_1.default.generateLogicError("error getting council devices", undefined));
                }
            });
        });
    }
}
exports.default = EnviromentalDeviceDatabaseHandler;
