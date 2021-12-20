"use strict";
/**
 * Name: SensorNotification.ts
 * Date: 02 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages sensor notifications logic
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
const SensorNotificationDatabaseHandler_1 = __importDefault(require("./SensorNotificationDatabaseHandler"));
class SensorNotificationLogic {
    // Constructor
    constructor() {
        // This atribute is used to manage the db interactions in the logic
        this.notificationDB = new SensorNotificationDatabaseHandler_1.default();
    }
    // Logic Methods 
    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getUserNotificationsCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getUserNotificationsCountFromDB(userId)
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
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getUserSensorNotificationsPaginated(userId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getUserSensorNotificationsPaginatedFromDB(userId, pageSize, pageIndex)
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
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getAdminSensorNotificationsPaginated(adminId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getAdminSensorNotificationsPaginatedFromDB(adminId, pageSize, pageIndex)
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
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getRootSensorNotificationsPaginated(pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getRootSensorNotificationsPaginatedFromDB(pageSize, pageIndex)
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
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getAdminNotificationsCount(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getAdminNotificationsCountFromDB(councilId)
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
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getRootNotificationsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getRootNotificationsCountFromDB()
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
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getNotificationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getNotificationsByUserIdFromDB(userId)
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
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getSensorNotificationById(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getSensorNotificationByIdFromDB(notificationId)
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
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getSensorNotificationsBySensorId(sensorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.getSensorNotificationsBySensorIdFromDB(sensorId)
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
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDevice() -> boolean
     *
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns
     */
    createSensorNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.createSensorNotificationInDB(notification)
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
     * Get enviromental devices from an admin
     * adminId: N, pageSize: N, pageIndex: N -> getAdminDevicePagination() -> [EnviromentalDevice]
     *
     * @param adminId - ID of the root admin that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    editSensorNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.editSensorNotificationInDB(notification)
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
     * Get all enviromental devices from a council
     * councilId: N, pageSize: N, pageIndex: N -> getAllAdminDevices() -> [EnviromentalDevice]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    removeNotification(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.notificationDB.removeNotificationInDB(notificationId)
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
exports.default = SensorNotificationLogic;
