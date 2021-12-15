"use strict";
/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the rest rules of the sensor feature
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Utils_1 = __importDefault(require("../Utils"));
const SensorLogic_1 = __importDefault(require("./SensorLogic"));
const Sensor_1 = __importDefault(require("./Sensor"));
class SensorRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.sensorLogic = new SensorLogic_1.default();
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
        /**
         * Get the information about a sensor
         * GET /sensors/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {
                "_id": 1,
                "_deviceEUI": "AS63126",
                "_deviceId": 1,
                "_name": "ambientalSensor1",
                "_type": 1,
                "_status": 1
            }
         * }
         *
         */
        this.getSensorById = () => this.router.get('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            this.sensorLogic.getSensorById(id)
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
         * Get all sensors from a user
         * GET /sensors/list/:userId
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": [
            {
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
        this.getAllUserSensors = () => this.router.get('/list/:userId', (req, res) => {
            const userId = parseInt(req.params.userId);
            this.sensorLogic.getAllUserSensors(userId)
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
         * Get all sensors from root ( * COUNT * )
         * GET /sensors/list/:userId
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": [
            {
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
        this.getAllRootSensorsCount = () => this.router.get('/count/root/:id', (req, res) => {
            this.sensorLogic.getAllRootSensorsCount()
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
         * Get all sensors from admin ( * COUNT * )
         * GET /sensors/list/:userId
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": [
            {
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
        this.getAllAdminSensorsCount = () => this.router.get('/count/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            this.sensorLogic.getAllAdminSensorsCount(councilId)
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
         * Get all sensors from a user ( * COUNT * )
         * GET /sensors/list/:userId
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": [
            {
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
        this.getAllUserSensorsCount = () => this.router.get('/count/user/:userId', (req, res) => {
            const userId = parseInt(req.params.userId);
            this.sensorLogic.getAllUserSensorsCount(userId)
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
         * Get all sensors from a user with pagination
         * GET /sensors/list/user/:userId/:pageSize/:pageIndex
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": [
            {
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
        this.getUserSensorPagination = () => this.router.get('/list/user/:userId/:pageSize/:pageIndex', (req, res) => {
            const userId = parseInt(req.params.userId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.sensorLogic.getUserSensorPagination(userId, pageSize, pageIndex)
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
         * Get all council sensors from a user
         * GET /sensors/list/council/:councilId
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": [
            {
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
        this.getAllCouncilSensors = () => this.router.get('/list/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            this.sensorLogic.getAllCouncilSensors(councilId)
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
         * Get all sensors related to a council
         * GET /sensors/list/council/:councilId/:pageSize/:pageIndex
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
        this.getCouncilSensorPagination = () => this.router.get('/list/council/:councilId/:pageSize/:pageIndex', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.sensorLogic.getCouncilSensorPagination(councilId, pageSize, pageIndex)
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
         * Store a sensor in db
         * POST /sensors/
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {
                "http": 200,
                "status": "OK"
         *  }
         *
         */
        this.storeSensor = () => this.router.post('/', (req, res) => {
            let sensor = new Sensor_1.default();
            sensor.setDeviceId(req.body.deviceId);
            sensor.setName(req.body.name);
            sensor.setDeviceEUI(req.body.deviceEUI);
            sensor.setType(req.body.type);
            sensor.setStatus(req.body.status);
            /*if(req.body.deviceId && req.body.name && req.body.deviceEUI && req.body.type && req.body.status){
                sensor.setDeviceId(req.body.deviceId)
                sensor.setName(req.body.name)
                sensor.setDeviceEUI(req.body.deviceEUI)
                sensor.setType(req.body.type)
                sensor.setStatus(req.body.status)
            } else {
                Utils.sendRestResponse(Utils.generateLogicSuccessEmpty("No body params found"), res)
            }*/
            this.sensorLogic.storeSensor(sensor)
                .then(response => {
                // Sending the response
                console.log(response);
                console.log(Utils_1.default.sendRestResponse(response, res));
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get all admin related sensors with pagination
         * GET /sensors/list/admin/:adminId/:pageSize/:pageIndex
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
        this.getAdminSensorPagination = () => this.router.get('/list/admin/:adminId/:pageSize/:pageIndex', (req, res) => {
            const adminId = parseInt(req.params.adminId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.sensorLogic.getAdminSensorPagination(adminId, pageSize, pageIndex)
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
         * Get all admin related sensors
         * GET /sensors/list/admin/:adminId
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
        this.getAdminAllSensors = () => this.router.get('/list/admin/:adminId', (req, res) => {
            const adminId = parseInt(req.params.adminId);
            this.sensorLogic.getAdminAllSensors(adminId)
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
         * Get all device related sensors
         * GET /sensors/device/:deviceId
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
        this.getDeviceSensors = () => this.router.get('/device/:deviceId', (req, res) => {
            const deviceId = parseInt(req.params.deviceId);
            this.sensorLogic.getDeviceSensors(deviceId)
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
         * Remove sensor with the given id
         * Delete /sensors/:sensorId
         * Response: {
             "http": 200,
             "status": "OK",
             "response": true
         }
         */
        this.removeSensor = () => this.router.delete('/:sensorId', (req, res) => {
            const sensorId = parseInt(req.params.sensorId);
            this.sensorLogic.removeSensor(sensorId)
                .then(response => {
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        this.getSensorById();
        this.getAllUserSensors();
        this.getAllUserSensorsCount();
        this.getAllAdminSensorsCount();
        this.getAllRootSensorsCount();
        this.getUserSensorPagination();
        this.getAllCouncilSensors();
        this.storeSensor();
        this.getAdminSensorPagination();
        this.getAdminAllSensors();
        this.getCouncilSensorPagination();
        this.getDeviceSensors();
        this.removeSensor();
    }
}
const sensorRestRouter = new SensorRestRouter();
exports.default = sensorRestRouter.router;
