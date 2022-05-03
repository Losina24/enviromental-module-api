"use strict";
/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
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
const express_1 = require("express");
const EnviromentalDeviceLogic_1 = __importDefault(require("./EnviromentalDeviceLogic"));
const EnviromentalDevice_1 = __importDefault(require("./EnviromentalDevice"));
const Utils_1 = __importDefault(require("../Utils"));
class EnviromentalDeviceRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.enviromentalDeviceLogic = new EnviromentalDeviceLogic_1.default(); // FIX: este atributo está mal en el diseño
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
        /**
         * Get the information about a enviromental device
         * GET enviromental/devices /device/:id
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
        this.getMapJsonDataUser = () => this.router.get('/map/user/:userId/:councilId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const councilId = parseInt(req.params.councilId);
            yield this.enviromentalDeviceLogic.getMapJsonDataUser(userId, councilId)
                .then(response => {
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        }));
        /**
         * Get the information about a enviromental device
         * GET enviromental/devices /device/:id
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
         */ /*
       public getMapJsonDataAdmin = () => this.router.get('/map/admin/:councilId', async (req: Request, res: Response) => {
           const councilId = parseInt(req.params.councilId);
   
   
           await this.enviromentalDeviceLogic.getMapJsonDataAdmin(councilId)
               .then(response => {
                   // Sending the response
                   Utils.sendRestResponse(response, res)
               })
               .catch(err => {
                   // Sending the response
                   Utils.sendRestResponse(err, res)
               })
       })*/
        /**
         * Get the information about a enviromental device
         * GET enviromental/devices /device/:id
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
        this.getMapJsonDataRoot = () => this.router.get('/map/root/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.enviromentalDeviceLogic.getMapJsonDataRoot()
                .then(response => {
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        }));
        this.updateOTA = () => this.router.get('/ota/update/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.enviromentalDeviceLogic.getMapJsonDataRoot()
                .then(response => {
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        }));
        /**
         * Get the information about a enviromental device
         * GET enviromental/devices /device/:id
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
        this.getDeviceById = () => this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield this.enviromentalDeviceLogic.getDeviceById(id)
                .then(response => {
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        }));
        this.getDeviceByDeviceEUI = () => this.router.get('/deviceEUI/:deveui', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const deveui = req.params.deveui;
            yield this.enviromentalDeviceLogic.getDeviceByDeviceEUI(deveui)
                .then(response => {
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        }));
        /**
         * Get all enviromental devices from a user
         * GET enviromental/devices/user/:userId
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
                // Sending the response
                console.log(response);
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get all enviromental devices from root ( * COUNT * )
         * GET enviromental/devices/count
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
        this.getAllRootDevicesCount = () => this.router.get('/count/root/:id', (req, res) => {
            this.enviromentalDeviceLogic.getAllRootDevicesCount()
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
         * Get all enviromental devices from admin ( * COUNT * )
         * GET enviromental/devices/count/council/:councilId
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
        this.getAllAdminDevicesCount = () => this.router.get('/count/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            this.enviromentalDeviceLogic.getAllAdminDevicesCount(councilId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        this.getAllAdminDevices = () => this.router.get('/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            this.enviromentalDeviceLogic.getAllAdminDevices(councilId)
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
         * Get all enviromental devices from a user ( * COUNT * )
         * GET enviromental/devices/count/user/:userId
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
        this.getAllUserDevicesCount = () => this.router.get('/count/user/:userId', (req, res) => {
            const userId = parseInt(req.params.userId);
            this.enviromentalDeviceLogic.getAllUserDevicesCount(userId)
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
         * Get enviromental devices from a user in pagination format
         * GET enviromental/devices/user/:userId/:pageSize/:pageIndex
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
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get all enviromental devices from a council
         * GET enviromental/devices/council/:councilId
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
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Get all enviromental devices from a gateway
         * GET enviromental/devices/gateway/:gatewayId
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
         * POST enviromental/devices/
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
        this.storeDevice = () => this.router.post('/:userId', (req, res) => {
            let enviromentalDevice = new EnviromentalDevice_1.default();
            enviromentalDevice.setName(req.body.name);
            enviromentalDevice.setDeviceEUI(req.body.deviceEUI);
            enviromentalDevice.setGatewayId(req.body.gatewayId);
            enviromentalDevice.setCoords([parseFloat(req.body.latitude), parseFloat(req.body.longitude)]);
            this.enviromentalDeviceLogic.storeDevice(enviromentalDevice, req.params.userId)
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
         * Update a enviromental device
         * PUT enviromental/devices/:deviceId
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
         *  "response": "Enviromental device updated succesfully."
         * }
         *
         */
        this.updateDevice = () => this.router.put('/:deviceId', (req, res) => {
            console.log("router reached updateDevice()");
            let enviromentalDevice = new EnviromentalDevice_1.default();
            enviromentalDevice.setId(parseInt(req.params.deviceId));
            enviromentalDevice.setName(req.body.name);
            enviromentalDevice.setDeviceEUI(req.body.deviceEUI);
            enviromentalDevice.setGatewayId(req.body.gatewayId);
            enviromentalDevice.setCoords([parseFloat(req.body.latitude), parseFloat(req.body.longitude)]);
            enviromentalDevice.setStatus(req.body.status);
            this.enviromentalDeviceLogic.updateDevice(enviromentalDevice)
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
         * Get enviromental devices of an admin in pagination format
         * GET enviromental/devices/admin/:adminId/:pageSize/:pageIndex
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
        this.getRootDevicePagination = () => this.router.get('/root/:rootId/:pageSize/:pageIndex', (req, res) => {
            const rootId = parseInt(req.params.rootId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.enviromentalDeviceLogic.getRootDevicePagination(rootId, pageSize, pageIndex)
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
         * Get enviromental devices of a council in pagination format
         * GET enviromental/devices/council/:councilId/:pageSize/:pageIndex
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
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        /**
         * Remove device with the given id
         * Delete enviromental/devices/:sensorId
         * Response: {
             "http": 200,
             "status": "OK",
             "response": true
         }
         */
        this.removeDevice = () => this.router.delete('/:deviceId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const deviceId = parseInt(req.params.deviceId);
            yield this.enviromentalDeviceLogic.removeDevice(deviceId)
                .then(response => {
                // Sending the response
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        }));
        this.getDeviceById();
        this.getDeviceByDeviceEUI();
        this.getAllUserDevices();
        this.getAllUserDevicesCount();
        this.getAllAdminDevicesCount();
        this.getAllAdminDevices();
        this.getAllRootDevicesCount();
        this.getUserDevicePagination();
        this.getAllCouncilDevices();
        this.getAllGatewayDevices();
        this.storeDevice();
        this.updateDevice();
        this.getRootDevicePagination();
        this.getCouncilDevicePagination();
        this.removeDevice();
        this.getMapJsonDataUser();
        //this.getMapJsonDataAdmin();
        this.getMapJsonDataRoot();
        this.updateOTA();
    }
}
const enviromentalDeviceRestRouter = new EnviromentalDeviceRestRouter();
exports.default = enviromentalDeviceRestRouter.router;
