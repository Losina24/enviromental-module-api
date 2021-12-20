"use strict";
/**
 * Name: SensorNotification.ts
 * Date: 02 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Mannages sensor notifications routes
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Utils_1 = __importDefault(require("../Utils"));
const SensorNotification_1 = __importDefault(require("./SensorNotification"));
const SensorNotificationLogic_1 = __importDefault(require("./SensorNotificationLogic"));
class SensorNotificationRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.notificationLogic = new SensorNotificationLogic_1.default(); // FIX: este atributo está mal en el diseño
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
        /**
     * Get the information about a enviromental device
     * GET /device/:id
     *
     * Response: {
     *  "http": 200,
     *  "status": "OK",
     *  "response": {
     *      "id": 32,
     *      "name": "Device 32",
     *      "mac": "2c549188c9e3",
     *      "gatewayId": 6,
     *      "sensors": [100, 101, 102, 103, 104],
     *      "coords": [21.2222, -34.3333],
     *      "status": true
     *  }
     * }
     *
     */
        this.getUserSensorNotificationsPaginated = () => this.router.get('/user/:userId/:pageSize/:pageIndex', (req, res) => {
            const userId = parseInt(req.params.userId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.notificationLogic.getUserSensorNotificationsPaginated(userId, pageSize, pageIndex)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
    * Get the information about a enviromental device
    * GET /device/:id
    *
    * Response: {
    *  "http": 200,
    *  "status": "OK",
    *  "response": {
    *      "id": 32,
    *      "name": "Device 32",
    *      "mac": "2c549188c9e3",
    *      "gatewayId": 6,
    *      "sensors": [100, 101, 102, 103, 104],
    *      "coords": [21.2222, -34.3333],
    *      "status": true
    *  }
    * }
    *
    */
        this.getAdminSensorNotificationsPaginated = () => this.router.get('/admin/:adminId/:pageSize/:pageIndex', (req, res) => {
            const adminId = parseInt(req.params.adminId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.notificationLogic.getAdminSensorNotificationsPaginated(adminId, pageSize, pageIndex)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
     * Get the information about a enviromental device
     * GET /device/:id
     *
     * Response: {
     *  "http": 200,
     *  "status": "OK",
     *  "response": {
     *      "id": 32,
     *      "name": "Device 32",
     *      "mac": "2c549188c9e3",
     *      "gatewayId": 6,
     *      "sensors": [100, 101, 102, 103, 104],
     *      "coords": [21.2222, -34.3333],
     *      "status": true
     *  }
     * }
     *
     */
        this.getRootSensorNotificationsPaginated = () => this.router.get('/root/:pageSize/:pageIndex', (req, res) => {
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.notificationLogic.getRootSensorNotificationsPaginated(pageSize, pageIndex)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get the information about a enviromental device
         * GET /device/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {
         *      "id": 32,
         *      "name": "Device 32",
         *      "mac": "2c549188c9e3",
         *      "gatewayId": 6,
         *      "sensors": [100, 101, 102, 103, 104],
         *      "coords": [21.2222, -34.3333],
         *      "status": true
         *  }
         * }
         *
         */
        this.getUserSensorNotificationsCount = () => this.router.get('/count/user/:id', (req, res) => {
            const userId = parseInt(req.params.id);
            this.notificationLogic.getUserNotificationsCount(userId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get the information about a enviromental device
         * GET /device/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {
         *      "id": 32,
         *      "name": "Device 32",
         *      "mac": "2c549188c9e3",
         *      "gatewayId": 6,
         *      "sensors": [100, 101, 102, 103, 104],
         *      "coords": [21.2222, -34.3333],
         *      "status": true
         *  }
         * }
         *
         */
        this.getAdminSensorNotificationsCount = () => this.router.get('/count/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            console.log(councilId);
            this.notificationLogic.getAdminNotificationsCount(councilId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
        * Get the information about a enviromental device
        * GET /device/:id
        *
        * Response: {
        *  "http": 200,
        *  "status": "OK",
        *  "response": {
        *      "id": 32,
        *      "name": "Device 32",
        *      "mac": "2c549188c9e3",
        *      "gatewayId": 6,
        *      "sensors": [100, 101, 102, 103, 104],
        *      "coords": [21.2222, -34.3333],
        *      "status": true
        *  }
        * }
        *
        */
        this.getRootSensorNotificationsCount = () => this.router.get('/count/root/:id', (req, res) => {
            this.notificationLogic.getRootNotificationsCount()
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get the information about a enviromental device
         * GET /device/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {
         *      "id": 32,
         *      "name": "Device 32",
         *      "mac": "2c549188c9e3",
         *      "gatewayId": 6,
         *      "sensors": [100, 101, 102, 103, 104],
         *      "coords": [21.2222, -34.3333],
         *      "status": true
         *  }
         * }
         *
         */
        this.getNotificationsByUserId = () => this.router.get('/listByUserId/:id', (req, res) => {
            const userId = parseInt(req.params.id);
            this.notificationLogic.getNotificationsByUserId(userId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get the information about a enviromental device
         * GET /device/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {
         *      "id": 32,
         *      "name": "Device 32",
         *      "mac": "2c549188c9e3",
         *      "gatewayId": 6,
         *      "sensors": [100, 101, 102, 103, 104],
         *      "coords": [21.2222, -34.3333],
         *      "status": true
         *  }
         * }
         *
         */
        this.getSensorNotificationById = () => this.router.get('/:id', (req, res) => {
            const notificationId = parseInt(req.params.id);
            this.notificationLogic.getSensorNotificationById(notificationId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get the information about a enviromental device
         * GET /device/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {
         *      "id": 32,
         *      "name": "Device 32",
         *      "mac": "2c549188c9e3",
         *      "gatewayId": 6,
         *      "sensors": [100, 101, 102, 103, 104],
         *      "coords": [21.2222, -34.3333],
         *      "status": true
         *  }
         * }
         *
         */
        this.getSensorNotificationsBySensorId = () => this.router.get('/listBySensorId/:id', (req, res) => {
            const sensorId = parseInt(req.params.id);
            this.notificationLogic.getSensorNotificationsBySensorId(sensorId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Save a new enviromental device
         * POST /
         *
         * Body: {
         *  "name": "Device 235",
         *  "mac": "2c549188c9e3",
         *  "gatewayId": 21,
         *  "latitude": 20.123,
         *  "longitude": 43.321,
         * }
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": "Enviromental device created succesfully."
         * }
         *
         */
        this.createSensorNotification = () => this.router.post('/', (req, res) => {
            let notification = new SensorNotification_1.default();
            notification.setId(req.body.id);
            notification.setSensorId(req.body.sensor_id);
            notification.setBody(req.body.body);
            notification.setSubject(req.body.subject);
            notification.setMagnitude(req.body.magnitude);
            this.notificationLogic.createSensorNotification(notification)
                .then(response => {
                if (res.status(200)) {
                    // Sending the response
                    res.status(200).send({
                        http: 200,
                        status: 'OK',
                        response: 'Network server created succesfully',
                        lastInsertId: response.insertId
                    });
                }
                else {
                    // Sending the response
                    res.status(204).send({
                        http: 204,
                        status: 'OK',
                        response: 'There are some problems creating a new network server'
                    });
                }
            })
                .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                });
            });
        });
        /**
         * Get enviromental devices of an admin in pagination format
         * GET /admin/:adminId/:pageSize/:pageIndex
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": [{
         *      "id": 32,
         *      "name": "Device 32",
         *      "mac": "2c549188c9e3",
         *      "gatewayId": 6,
         *      "sensors": [100, 101, 102, 103, 104],
         *      "coords": [21.2222, -34.3333],
         *      "status": true
         *  }]
         * }
         *
         */
        this.editSensorNotification = () => this.router.put('/:id', (req, res) => {
            let notification = new SensorNotification_1.default();
            notification.setId(parseInt(req.params.id));
            notification.setSensorId(req.body.sensor_id);
            notification.setBody(req.body.body);
            notification.setSubject(req.body.subject);
            notification.setMagnitude(req.body.magnitude);
            this.notificationLogic.editSensorNotification(notification)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Remove a user by given id
         * DELETE /users/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": [{
                "_id": 1,
                "_deviceEUI": "AS63126",
                "_deviceId": 1,
                "_name": "ambientalSensor1",
                "_type": 1,
                "_status": 1
            }]
         * }
         *
         */
        this.removeNotification = () => this.router.delete('/:id', (req, res) => {
            const notificationId = parseInt(req.params.id);
            this.notificationLogic.removeNotification(notificationId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        this.getNotificationsByUserId();
        this.getSensorNotificationById();
        this.getSensorNotificationsBySensorId();
        this.createSensorNotification();
        this.editSensorNotification();
        this.removeNotification();
        this.getUserSensorNotificationsCount();
        this.getAdminSensorNotificationsCount();
        this.getRootSensorNotificationsCount();
        this.getUserSensorNotificationsPaginated();
        this.getAdminSensorNotificationsPaginated();
        this.getRootSensorNotificationsPaginated();
    }
}
const enviromentalDeviceRestRouter = new SensorNotificationRestRouter();
exports.default = enviromentalDeviceRestRouter.router;
