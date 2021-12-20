"use strict";
/**
 * Name: SensorNotification.ts
 * Date: 02 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Database connection handler for sensor notifications
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
const Utils_1 = __importDefault(require("../Utils"));
const SensorNotification_1 = __importDefault(require("./SensorNotification"));
class SensorNotificationDatabaseHandler {
    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    queryResultsToEnviromentalDevices(results) {
        let notifications = [];
        results.forEach((element) => {
            let notification = new SensorNotification_1.default();
            notification.setId(element.id);
            notification.setSensorId(element.sensor_id);
            notification.setBody(element.body);
            notification.setSubject(element.subject);
            notification.setMagnitude(element.magnitude);
            notifications.push(notification);
        });
        return notifications;
    }
    // Methods
    /**
     * Get the user related notifications
     * userId: N -> getRootNotificationsCountFromDB() -> notification: SensorNotification[]
     *
     * @param userId - the id of the user you want to get the notifications from
     * @returns
     */
    getRootNotificationsCountFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM notification;";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting root notifications count", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting root notifications count", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("root notifications count retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("root notifications couldnt be retrieved"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting root notifications count", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get the user related notifications
     * councilId: N -> getNotificationsByUserIdFromDB() -> notification: SensorNotification[]
     *
     * @param councilId - the id of the user you want to get the notifications from
     * @returns
     */
    getAdminNotificationsCountFromDB(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id INNER JOIN " +
                "sensor ON sensor.device_id=device.id INNER JOIN notification ON sensor.id=notification.sensor_id WHERE gateway.council_id="
                + councilId + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user notifications count", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting user notifications count", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("user notifications count retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("user notifications couldnt be retrieved"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting user notifications count", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get the user related notifications
     * userId: N -> getNotificationsByUserIdFromDB() -> notification: SensorNotification[]
     *
     * @param userId - the id of the user you want to get the notifications from
     * @returns
     */
    getAdminSensorNotificationsPaginatedFromDB(councilId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstValue = (pageSize * pageIndex) - pageSize;
            const secondValue = (pageSize * pageIndex);
            var query = "SELECT * FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id INNER JOIN " +
                "sensor ON sensor.device_id=device.id INNER JOIN notification ON sensor.id=notification.sensor_id WHERE gateway.council_id="
                + councilId + " ORDER BY notification.id DESC LIMIT " + firstValue + ', ' + secondValue;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting admin notifications", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting admin notifications", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("admin notifications retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("admin notifications couldnt be retrieved"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting admin notifications", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get the user related notifications
     * userId: N -> getNotificationsByUserIdFromDB() -> notification: SensorNotification[]
     *
     * @param userId - the id of the user you want to get the notifications from
     * @returns
     */
    getUserSensorNotificationsPaginatedFromDB(userId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstValue = (pageSize * pageIndex) - pageSize;
            const secondValue = (pageSize * pageIndex);
            var query = "SELECT * FROM `user_device` INNER JOIN `device` ON" +
                " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
                " INNER JOIN notification ON sensor.id=notification.sensor_id WHERE `user_device`.`user_id` = " + userId +
                " ORDER BY notification.id DESC LIMIT " + firstValue + ', ' + secondValue;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user notifications", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting user notifications", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("user notifications retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("user notifications couldnt be retrieved"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting user notifications", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get the user related notifications
     * userId: N -> getNotificationsByUserIdFromDB() -> notification: SensorNotification[]
     *
     * @param userId - the id of the user you want to get the notifications from
     * @returns
     */
    getUserNotificationsCountFromDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM `user_device` INNER JOIN `device` ON" +
                " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
                " INNER JOIN notification ON sensor.id=notification.sensor_id WHERE `user_device`.`user_id` = " + userId + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting user notifications count", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting user notifications count", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("user notifications count retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("user notifications couldnt be retrieved"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting user notifications count", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get the user related notifications
     * userId: N -> getNotificationsByUserIdFromDB() -> notification: SensorNotification[]
     *
     * @param userId - the id of the user you want to get the notifications from
     * @returns
     */
    getRootSensorNotificationsPaginatedFromDB(pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstValue = (pageSize * pageIndex) - pageSize;
            const secondValue = (pageSize * pageIndex);
            var query = "SELECT * FROM notification ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting root notifications", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting root notifications", err));
                        }
                        try {
                            if (results) {
                                resolve(Utils_1.default.generateLogicSuccess("root notifications retrieved succesfully", results));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("root notifications couldnt be retrieved"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting root notifications", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get the user related notifications
     * userId: N -> getNotificationsByUserIdFromDB() -> notification: SensorNotification[]
     *
     * @param userId - the id of the user you want to get the notifications from
     * @returns
     */
    getNotificationsByUserIdFromDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT notification.* FROM user_device INNER JOIN sensor ON user_device.device_id=sensor.device_id " +
                "INNER JOIN notification ON sensor.id=notification.sensor_id WHERE user_device.user_id = " + userId + ";";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting admin notifications", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting admin notifications", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("admin notifications retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("admin notifications couldnt be retrieved"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting admin notifications", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get the information about a notification by given id
     * notificationId: N -> getSensorNotificationByIdFromDB() -> notification: SensorNotification
     *
     * @param notificationId - notification ID
     * @returns
     */
    getSensorNotificationByIdFromDB(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT * FROM notification WHERE id = " + notificationId;
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
                        let notification = new SensorNotification_1.default();
                        notification.setId(results[0].id);
                        notification.setSensorId(results[0].sensor_id);
                        notification.setBody(results[0].body);
                        notification.setSubject(results[0].subject);
                        notification.setMagnitude(results[0].magnitude);
                        resolve(notification);
                    });
                });
            });
        });
    }
    /**
     * Get all the sensor notifications by given sensor id
     * sensorId: N -> getSensorNotificationsBySensorIdFromDB() -> notifications: SensorNotification[]
     *
     * @param sensorId - ID of the sensor we want to get the notifications from
     * @returns
     */
    getSensorNotificationsBySensorIdFromDB(sensorId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT * FROM notification WHERE sensor_id = " + sensorId;
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
                        let notifications = this.queryResultsToEnviromentalDevices(results);
                        resolve(notifications);
                    });
                });
            });
        });
    }
    /**
     * Create a new notification
     * notification: SensorNotification -> createSensorNotificationInDB() ->
     *
     * @param notification - The notification we want to store
     * @returns
     */
    createSensorNotificationInDB(notification) {
        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO `notification` (`sensor_id`, `body`, `subject`, `magnitude`) VALUES (" + notification.getSensorId()
            + ", '" + notification.getBody() + "', '" + notification.getSubject() + "', '" + notification.getMagnitude() + "')";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(error);
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // Si la consulta falla
                    if (err) {
                        reject(err);
                    }
                    console.log(results);
                    resolve(results);
                });
            });
        });
    }
    /**
     * Edit notification data
     * notification: SensorNotification -> editSensorNotificationInDB() ->
     *
     * @param notification - new notification
     * @returns
     */
    editSensorNotificationInDB(notification) {
        var query = "UPDATE notification" +
            " SET sensor_id = " + notification.getSensorId() + ", body = '" + notification.getBody() + "', subject = '" + notification.getSubject() +
            "', magnitude = '" + notification.getMagnitude() + "' WHERE id=" + notification.getId() + ";";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(error);
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(err);
                    }
                    console.log(query);
                    console.log(results);
                    resolve(results);
                });
            });
        });
    }
    /**
     * Get all enviromental devices from a council
     * notificationId: N -> removeNotificationInDB() ->
     *
     * @param notificationId - ID of the notification we want to remove
     * @returns
     */
    removeNotificationInDB(notificationId) {
        var query = "DELETE FROM `notification` WHERE id =" + notificationId + ";";
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
                    resolve(Utils_1.default.generateLogicSuccess("notification removed succesfully", results));
                });
            });
        });
    }
}
exports.default = SensorNotificationDatabaseHandler;
