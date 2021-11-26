"use strict";
/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EnviromentalDeviceLogic_1 = __importDefault(require("./EnviromentalDeviceLogic"));
const EnviromentalDevice_1 = __importDefault(require("./EnviromentalDevice"));
const utils_1 = __importDefault(require("../utils"));
class EnviromentalDeviceRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.enviromentalDeviceLogic = new EnviromentalDeviceLogic_1.default(); // FIX: este atributo está mal en el diseño
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
        this.getDeviceById = () => this.router.get('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            this.enviromentalDeviceLogic.getDeviceById(id)
                .then(response => {
                let deviceInObject = response.toObject();
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: deviceInObject
                });
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
         * Get all enviromental devices from a user
         * GET /user/:userId
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
        this.getAllUserDevices = () => this.router.get('/user/:userId', (req, res) => {
            const userId = parseInt(req.params.userId);
            this.enviromentalDeviceLogic.getAllUserDevices(userId)
                .then(response => {
                let enviromentalDevices = [];
                // Generating an object for each enviromental device
                response.forEach(element => {
                    const device = {
                        id: element.getId(),
                        name: element.getName(),
                        mac: element.getDeviceEUI(),
                        gatewayId: element.getGatewayId(),
                        //sensors: element.getSensors(),
                        coords: element.getCoords(),
                        status: element.getStatus()
                    };
                    enviromentalDevices.push(device);
                });
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                });
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
         * Get enviromental devices from a user in pagination format
         * GET /user/:userId/:pageSize/:pageIndex
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
        this.getUserDevicePagination = () => this.router.get('/user/:userId/:pageSize/:pageIndex', (req, res) => {
            const userId = parseInt(req.params.userId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.enviromentalDeviceLogic.getUserDevicePagination(userId, pageSize, pageIndex)
                .then(response => {
                let enviromentalDevices = utils_1.default.enviromentalDevicesToObjects(response);
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                });
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
         * Get all enviromental devices from a council
         * GET /council/:councilId
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
        this.getAllCouncilDevices = () => this.router.get('/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            this.enviromentalDeviceLogic.getAllCouncilDevices(councilId)
                .then(response => {
                console.log(response);
                let enviromentalDevices = utils_1.default.enviromentalDevicesToObjects(response);
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                });
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
         * Get all enviromental devices from a gateway
         * GET /gateway/:gatewayId
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
        this.getAllGatewayDevices = () => this.router.get('/gateway/:gatewayId', (req, res) => {
            const gatewayId = parseInt(req.params.gatewayId);
            this.enviromentalDeviceLogic.getAllGatewayDevices(gatewayId)
                .then(response => {
                let enviromentalDevices = utils_1.default.enviromentalDevicesToObjects(response);
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                });
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
        this.storeDevice = () => this.router.post('/', (req, res) => {
            let enviromentalDevice = new EnviromentalDevice_1.default();
            enviromentalDevice.setName(req.body.name);
            enviromentalDevice.setDeviceEUI(req.body.deviceEUI);
            enviromentalDevice.setGatewayId(parseInt(req.body.gatewayId));
            enviromentalDevice.setCoords([parseFloat(req.body.latitude), parseFloat(req.body.longitude)]);
            console.log(123, enviromentalDevice);
            this.enviromentalDeviceLogic.storeDevice(enviromentalDevice)
                .then(response => {
                if (response == true) {
                    // Sending the response
                    res.status(200).send({
                        http: 200,
                        status: 'OK',
                        response: 'Enviromental device created succesfully'
                    });
                }
                else {
                    // Sending the response
                    res.status(204).send({
                        http: 204,
                        status: 'OK',
                        response: 'There are some problems creating a new enviromental device'
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
        this.getAdminDevicePagination = () => this.router.get('/admin/:adminId/:pageSize/:pageIndex', (req, res) => {
            const adminId = parseInt(req.params.adminId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.enviromentalDeviceLogic.getAdminDevicePagination(adminId, pageSize, pageIndex)
                .then(response => {
                let enviromentalDevices = utils_1.default.enviromentalDevicesToObjects(response);
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                });
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
         * Get enviromental devices of a council in pagination format
         * GET /council/:councilId/:pageSize/:pageIndex
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
        this.getCouncilDevicePagination = () => this.router.get('/council/:councilId/:pageSize/:pageIndex', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.enviromentalDeviceLogic.getCouncilDevicePagination(councilId, pageSize, pageIndex)
                .then(response => {
                let enviromentalDevices = utils_1.default.enviromentalDevicesToObjects(response);
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                });
            })
                .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                });
            });
        });
        this.getDeviceById();
        this.getAllUserDevices();
        this.getUserDevicePagination();
        this.getAllCouncilDevices();
        this.getAllGatewayDevices();
        this.storeDevice();
        this.getAdminDevicePagination();
        this.getCouncilDevicePagination();
    }
}
const enviromentalDeviceRestRouter = new EnviromentalDeviceRestRouter();
exports.default = enviromentalDeviceRestRouter.router;
