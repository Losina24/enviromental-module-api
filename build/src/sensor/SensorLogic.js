"use strict";
/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the logic of the sensor feature
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
const SensorDatabaseHandler_1 = __importDefault(require("./SensorDatabaseHandler"));
class SensorLogic {
    // Constructor
    constructor() {
        // This atribute is used to manage the db interactions in the logic
        this.sensorDB = new SensorDatabaseHandler_1.default();
    }
    // Logic Methods 
    /**
     * Get the information about a sensor given their ID
     * sensorId: N -> getSensorById() -> Sensor
     *
     * @param sensorId - ID of the sensor you want to get data from
     * @returns
     */
    getSensorById(sensorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getSensorByIdFromDB(sensorId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all user sensors
     * userId: N -> getAllUserSensors() -> [Sensor]
     *
     * @param userId - ID of the user that you want to get all sensors from
     * @returns
     */
    getAllUserSensors(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getAllUserSensorsFromDB(userId)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all user sensors ( * COUNT * )
     * userId: N -> getAllUserSensors() -> [Sensor]
     *
     * @param userId - ID of the user that you want to get all sensors from
     * @returns
     */
    getAllUserSensorsCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getAllUserSensorsCountFromDB(userId)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get sensors from a user in a pagination format
     * userId: N, pageSize: N, pageIndex: N -> getUserSensorPagination() -> [Sensor]
     *
     * @param userId - ID of the user u want to get sensors from
     * @param pageSize - Number of devices returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getUserSensorPagination(userId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getUserSensorPaginationFromDB(userId, pageSize, pageIndex)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all sensors from a council
     * councilId: N -> getAllCouncilSensors() -> [Sensor]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns
     */
    getAllCouncilSensors(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getAllCouncilSensorsFromDB(councilId)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Store new sensor on database
     * sensor: Sensor -> storeSensor()
     *
     * @param sensor - Sensor we want to store
     * @returns
     */
    storeSensor(sensor) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.storeSensorInDB(sensor)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all admin related sensors with pagination format
     * adminId: N, pageSize: N, pageIndex: N -> getAdminSensorPagination() -> [Sensor]
     *
     * @param adminId - ID of the admin that you want to get all sensors from
     * @param pageSize - Number of sensors returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getAdminSensorPagination(adminId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getAdminSensorPaginationFromDB(adminId, pageSize, pageIndex)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all admin sensors
     * adminId: N -> getAdminAllSensors() -> [Sensor]
     *
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @returns
     */
    getAdminAllSensors(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getAdminAllSensorsFromDB(adminId)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all council sensors with pagination format
     * councilId:N, pageSize:N, pageIndex:N -> getCouncilSensorPagination() -> [Sensor]
     *
     * @param councilId - ID of the council you want to get the sensors from
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getCouncilSensorPagination(councilId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getCouncilSensorPaginationFromDB(councilId, pageSize, pageIndex)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all device related sensors
     * deviceID: N -> getDeviceSensors() -> [Sensor]
     *
     * @param deviceId - ID of the device we want to get the sensors from
     * @returns
     */
    getDeviceSensors(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.getDeviceSensorsFromDB(deviceId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Remove a sensor
     * sensorId: N -> removeSensor()
     *
     * @param sensorId - ID of the sensor we want to delete
     * @returns
     */
    removeSensor(sensorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.sensorDB.removeSensorInDB(sensorId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
}
exports.default = SensorLogic;
