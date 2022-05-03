"use strict";
/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the logic of the enviromental device feature
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const EnviromentalDeviceDatabaseHandler_1 = __importDefault(require("./EnviromentalDeviceDatabaseHandler"));
const CouncilLogic_1 = __importDefault(require("../councils/CouncilLogic"));
const GatewayLogic_1 = __importDefault(require("../gateways/GatewayLogic"));
const MeasureLogic_1 = __importDefault(require("../measures/MeasureLogic"));
const childs = __importStar(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const SensorLogic_1 = __importDefault(require("../sensor/SensorLogic"));
class EnviromentaDeviceLogic {
    // Constructor
    constructor() {
        // This atribute is used to manage the db interactions in the logic
        this.enviromentalDeviceDB = new EnviromentalDeviceDatabaseHandler_1.default();
    }
    // Logic Methods 
    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getDeviceById(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getDeviceByIdFromDB(deviceId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    getDeviceByDeviceEUI(deviceEUI) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getDeviceByDeviceEUIFromDB(deviceEUI)
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
    getMapJsonDataUser(userId, councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            let spawn = childs.spawn('python3', ['../enviromental-module-api/src/map/mapa.py']);
            let councilLogic = new CouncilLogic_1.default();
            let gatewayLogic = new GatewayLogic_1.default();
            let deviceLogic = new EnviromentaDeviceLogic();
            let measureLogic = new MeasureLogic_1.default();
            let gateways = yield gatewayLogic.getUserGateways(userId).catch(err => {
                console.log(err);
            });
            console.log("****** gateways ******");
            console.log(gateways.result);
            let gatewaysFORMATED = [];
            gateways.result.forEach((gateway) => {
                let councilName;
                if (gateway.councilId == 1) {
                    councilName = "root council";
                }
                else if (gateway.councilId == 2) {
                    councilName = "ayuntamiento gandia";
                }
                else if (gateway.councilId == 3) {
                    councilName = "ayuntamiento alcoy";
                }
                gatewaysFORMATED.push({
                    name: gateway.name,
                    lat: gateway.coords[0],
                    lng: gateway.coords[1],
                    councilName: councilName,
                    radius: 15
                });
            });
            let devices = yield deviceLogic.getAllUserDevices(userId).catch(err => {
                console.log(err);
            });
            console.log("****** devices ******");
            console.log(devices.result);
            let devicesFORMATED = [];
            for (const device of devices.result) {
                let measuresResponse = yield measureLogic.getAllMeasuresByDeviceId(device.id);
                let measurements = [];
                measuresResponse.result.forEach((measure) => {
                    measurements.push({
                        name: device.name,
                        measurements: [{
                                type: "o2",
                                value: measure.value,
                                unit: measure.unit,
                                dangerous: measure.danger,
                                date: measure.timestamp.toJSON().slice(0, 16).replace("T", " ")
                            }]
                    });
                });
                devicesFORMATED.push({
                    name: device.name,
                    measurements: measurements
                });
            }
            let councils = yield councilLogic.getCouncilById(councilId).catch(err => {
                console.log(err);
            });
            console.log("****** councils ******");
            console.log(councils.result);
            let councilsFORMATED = {
                name: councils.result.name,
                radius: 30,
                lat: gatewaysFORMATED[0].lat,
                lng: gatewaysFORMATED[0].lng
            };
            let formatedJsonResponse = {
                councils: councilsFORMATED,
                gateways: gatewaysFORMATED,
                devices: devicesFORMATED
            };
            fs_1.default.writeFile('../enviromental-module-api/src/map/data.json', JSON.stringify(formatedJsonResponse), function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("File created!");
            });
            spawn.on('close', (code) => {
                //console.log(`child process close all stdio with code ${code}`);
                // send data to browser
                console.log("***** PY CODE *****");
                console.log(code);
                //res.send(dataToSend)
            });
            console.log(formatedJsonResponse);
            return new Promise((resolve, reject) => {
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
    getMapJsonDataRoot() {
        return __awaiter(this, void 0, void 0, function* () {
            let spawn = childs.spawn('python3', ['../enviromental-module-api/src/map/mapa.py']);
            let councilLogic = new CouncilLogic_1.default();
            let gatewayLogic = new GatewayLogic_1.default();
            let deviceLogic = new EnviromentaDeviceLogic();
            let measureLogic = new MeasureLogic_1.default();
            let sensorLogic = new SensorLogic_1.default();
            let gateways = yield gatewayLogic.getAllGatewaysRootPagination(9999, 1).catch(err => {
                console.log(err);
            });
            console.log("****** gateways ******");
            console.log(gateways);
            let gatewaysFORMATED = [];
            gateways.forEach((gateway) => {
                let councilName;
                if (gateway.councilId == 1) {
                    councilName = "root council";
                }
                else if (gateway.councilId == 2) {
                    councilName = "ayuntamiento gandia";
                }
                else if (gateway.councilId == 3) {
                    councilName = "ayuntamiento alcoy";
                }
                gatewaysFORMATED.push({
                    name: gateway.name,
                    lat: gateway.coords[0],
                    lng: gateway.coords[1],
                    councilName: councilName,
                    radius: 15
                });
            });
            let devices = yield deviceLogic.getRootDevicePagination(1, 9999, 1).catch(err => {
                console.log(err);
            });
            console.log("****** devices ******");
            console.log(devices.result);
            let devicesFORMATED = [];
            for (const device of devices.result) {
                let deviceSensors = yield sensorLogic.getDeviceSensors(device.id);
                let sensorMeasurements = [];
                //console.log("deviceSensors", deviceSensors)
                if (deviceSensors.http == 200) {
                    for (const sensor of deviceSensors.result) {
                        let lastSensorMeasure = yield measureLogic.getLastSensorMeasure(sensor.id);
                        if (lastSensorMeasure.result) {
                            sensorMeasurements.push(lastSensorMeasure.result);
                        }
                    }
                }
                devicesFORMATED.push({
                    name: device.name,
                    measurements: sensorMeasurements,
                    lat: device.coords[0],
                    lng: device.coords[1]
                });
            }
            /*
            let allSensorsRes: any = await sensorLogic.getDeviceSensors(deve)
            let allSensorsArray: any[] = allSensorsRes.result
            console.log("allSensorsArray", allSensorsArray)
            let measurements: any[] = []
            for (const sensor of allSensorsArray) {
                let lastSensorMeasure: any = await measureLogic.getLastSensorMeasure(sensor.id)
                if (lastSensorMeasure.result) {
                    measurements.push(lastSensorMeasure)
                }
            }
            console.log("measurements", measurements)*/
            /*
            for (const device of devices.result) {
                let measuresResponse: any = await measureLogic.getRootMeasures()
                let measurements: any[] = []
                measuresResponse.result.forEach((measure: any) => {
                    measurements.push({
                        name: device.name,
                        measurements: [{
                            type: "o2",
                            value: measure.value,
                            unit: measure.unit,
                            dangerous: measure.danger,
                            date: measure.timestamp.toJSON().slice(0, 16).replace("T", " ")
                        }]
                    })
                });
                devicesFORMATED.push({
                    name: device.name,
                    measurements: measurements
                })
            }*/
            let councils = yield councilLogic.getRootCouncilsPagination(9999, 1).catch(err => {
                console.log(err);
            });
            console.log("****** councils ******");
            console.log(councils.result);
            let councilsFormated = [];
            councils.result.forEach((council) => {
                councilsFormated.push({
                    name: council.name,
                    radius: 30,
                    lat: gatewaysFORMATED[0].lat,
                    lng: gatewaysFORMATED[0].lng
                });
            });
            let formatedJsonResponse = {
                councils: councilsFormated,
                gateways: gatewaysFORMATED,
                devices: devicesFORMATED
            };
            fs_1.default.writeFile('../enviromental-module-api/src/map/data.json', JSON.stringify(formatedJsonResponse), function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("File created!");
            });
            spawn.on('close', (code) => {
                //console.log(`child process close all stdio with code ${code}`);
                // send data to browser
                console.log("***** PY CODE *****");
                console.log(code);
                //res.send(dataToSend)
            });
            console.log(formatedJsonResponse);
            return new Promise((resolve, reject) => {
            });
        });
    }
    /*
    public async getMapJsonDataRoot(): Promise<EnviromentalDevice> {
            let spawn: any = childs.spawn('python3', ['../enviromental-module-api/src/map/mapa.py'])
    
            let councilLogic = new CouncilLogic();
            let gatewayLogic = new GatewayLogic();
            let deviceLogic = new EnviromentaDeviceLogic();
            let measureLogic = new MeasureLogic();
    
            let gateways: any = await gatewayLogic.getAllGatewaysRootPagination(9999, 1).catch(err => {
                console.log(err)
            })
            console.log("****** gateways ******")
            console.log(gateways)
            let gatewaysFORMATED: any[] = []
            gateways.forEach((gateway: any) => {
                let councilName;
                if (gateway.councilId == 1) {
                    councilName = "root council"
                } else if (gateway.councilId == 2) {
                    councilName = "ayuntamiento gandia"
                } else if (gateway.councilId == 3) {
                    councilName = "ayuntamiento alcoy"
                }
                gatewaysFORMATED.push({
                    name: gateway.name,
                    lat: gateway.coords[0],
                    lng: gateway.coords[1],
                    councilName: councilName,
                    radius: 15
                })
            });
    
            let devices: any = await deviceLogic.getRootDevicePagination(1, 9999, 1).catch(err => {
                console.log(err)
            })
            console.log("****** devices ******")
            console.log(devices.result)
            let devicesFORMATED: any[] = []
            for (const device of devices.result) {
    
                let measuresResponse: any = await measureLogic.getRootMeasures()
                let measurements: any[] = []
                measuresResponse.result.forEach((measure: any) => {
                    measurements.push({
                        name: device.name,
                        measurements: [{
                            type: "o2",
                            value: measure.value,
                            unit: measure.unit,
                            dangerous: measure.danger,
                            date: measure.timestamp.toJSON().slice(0, 16).replace("T", " ")
                        }]
                    })
                });
                devicesFORMATED.push({
                    name: device.name,
                    measurements: measurements
                })
            }
    
            let councils: any = await councilLogic.getRootCouncilsPagination(9999, 1).catch(err => {
                console.log(err)
            })
            console.log("****** councils ******")
            console.log(councils.result)
            let councilsFormated: any[] = []
    
            councils.result.forEach((council: any) => {
                councilsFormated.push({
                    name: council.name,
                    radius: 30,
                    lat: gatewaysFORMATED[0].lat,
                    lng: gatewaysFORMATED[0].lng
                })
            });
            let formatedJsonResponse = {
                councils: councilsFormated,
                gateways: gatewaysFORMATED,
                devices: devicesFORMATED
            }
            fs.writeFile('../enviromental-module-api/src/map/data.json', JSON.stringify(formatedJsonResponse), function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("File created!");
            });
            spawn.on('close', (code: any) => {
                //console.log(`child process close all stdio with code ${code}`);
                // send data to browser
                console.log("***** PY CODE *****")
                console.log(code)
                //res.send(dataToSend)
            });
            console.log(formatedJsonResponse)
            return new Promise<EnviromentalDevice>((resolve, reject) => {
            })
        }
    
        */
    /**
* Get the information about a enviromental device given their ID
* userId: N -> getDeviceById() -> EnviromentalDevice
*
* @param deviceId - ID of the enviromental device you want to get data from
* @returns
*/ /*
                            public async getMapJsonDataAdmin(councilId: number): Promise<EnviromentalDevice> {
                                let spawn: any = childs.spawn('python3', ['../enviromental-module-api/src/map/mapa.py'])
                        
                                let councilLogic = new CouncilLogic();
                                let gatewayLogic = new GatewayLogic();
                                let deviceLogic = new EnviromentaDeviceLogic();
                                let measureLogic = new MeasureLogic();
                        
                                let gateways: any = await gatewayLogic.getAdminGateways(councilId).catch(err => {
                                    console.log(err)
                                })
                                console.log("****** gateways ******")
                                console.log(gateways)
                                let gatewaysFORMATED: any[] = []
                                gateways.result.forEach((gateway: any) => {
                                    let councilName;
                                    if (gateway.councilId == 1) {
                                        councilName = "root council"
                                    } else if (gateway.councilId == 2) {
                                        councilName = "ayuntamiento gandia"
                                    } else if (gateway.councilId == 3) {
                                        councilName = "ayuntamiento alcoy"
                                    }
                                    gatewaysFORMATED.push({
                                        name: gateway.name,
                                        lat: gateway.coords[0],
                                        lng: gateway.coords[1],
                                        councilName: councilName,
                                        radius: 15
                                    })
                                });
                        
                                let devices: any = await deviceLogic.getAllAdminDevices(councilId).catch(err => {
                                    console.log(err)
                                })
                                console.log("****** devices ******")
                                console.log(devices)
                                let devicesFORMATED: any[] = []
                                for (const device of devices.result) {
                        
                                    let measuresResponse: any = await measureLogic.getAdminMeasures(adminId)
                                    let measurements: any[] = []
                                    measuresResponse.result.forEach((measure: any) => {
                                        measurements.push({
                                            name: device.name,
                                            measurements: [{
                                                type: "o2",
                                                value: measure.value,
                                                unit: measure.unit,
                                                dangerous: measure.danger,
                                                date: measure.timestamp.toJSON().slice(0, 16).replace("T", " ")
                                            }]
                                        })
                                    });
                                    devicesFORMATED.push({
                                        name: device.name,
                                        measurements: measurements
                                    })
                                }
                        
                                let councils: any = await councilLogic.admin(9999, 1).catch(err => {
                                    console.log(err)
                                })
                                console.log("****** councils ******")
                                console.log(councils.result)
                                let councilsFormated: any[] = []
                        
                                councils.result.forEach((council: any) => {
                                    councilsFormated.push({
                                        name: council.name,
                                        radius: 30,
                                        lat: gatewaysFORMATED[0].lat,
                                        lng: gatewaysFORMATED[0].lng
                                    })
                                });
                                let formatedJsonResponse = {
                                    councils: councilsFormated,
                                    gateways: gatewaysFORMATED,
                                    devices: devicesFORMATED
                                }
                                fs.writeFile('../enviromental-module-api/src/map/data.json', JSON.stringify(formatedJsonResponse), function (err) {
                                    if (err) {
                                        return console.error(err);
                                    }
                                    console.log("File created!");
                                });
                                spawn.on('close', (code: any) => {
                                    //console.log(`child process close all stdio with code ${code}`);
                                    // send data to browser
                                    console.log("***** PY CODE *****")
                                    console.log(code)
                                    //res.send(dataToSend)
                                });
                                console.log(formatedJsonResponse)
                                return new Promise<EnviromentalDevice>((resolve, reject) => {
                                })
                            }*/
    /**
     * Get all enviroment devices of a user
     * userId: N -> getAllUserDevices() -> [EnviromentalDevice]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    getAllUserDevices(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getAllUserDevicesFromDB(userId)
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
    * Get all enviroment devices of root ( * COUNT * )
    * getAllUserDevices() -> [EnviromentalDevice]
    *
    * @returns
    */
    getAllRootDevicesCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getAllRootDevicesCountFromDB()
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
    * Get all enviroment devices of admin ( * COUNT * )
    * councilId: N -> getAllUserDevices() -> [EnviromentalDevice]
    *
    * @param councilId - ID of the council you want to get all enviromental devices from
    * @returns
    */
    getAllAdminDevicesCount(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getAllAdminDevicesCountFromDB(councilId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    getAllAdminDevices(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getAllAdminDevicesFromDB(councilId)
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
     * Get all enviroment devices of a user ( * COUNT * )
     * userId: N -> getAllUserDevices() -> [EnviromentalDevice]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    getAllUserDevicesCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getAllUserDevicesCountFromDB(userId)
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
     * Get enviromental devices from a user in a pagination format
     * userId: N, pageSize: N, pageIndex: N -> getUserDevicePagination() -> [EnviromentalDevice]
     *
     * @param userId - ID of the user u want to get devices from
     * @param pageSize - Number of devices returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getUserDevicePagination(userId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getUserDevicePaginationFromDB(userId, pageSize, pageIndex)
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
     * councilId: N -> getAllCouncilDevices() -> [EnviromentalDevice]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns
     */
    getAllCouncilDevices(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getAllCouncilDevicesFromDB(councilId)
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
     * Get enviromental devices of a gateway
     * gatewayId: N -> getGatewayDevices() -> [EnviromentalDevice]
     *
     * @param gatewayId - ID of the gateway that you want to get all enviromental devices
     * @returns
     */
    getAllGatewayDevices(gatewayId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getGatewayDevicesFromDB(gatewayId)
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
    storeDevice(enviromentalDevice, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.enviromentalDeviceDB.storeDeviceInDB(enviromentalDevice, userId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            }));
        });
    }
    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDevice() -> boolean
     *
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns
     */
    updateDevice(enviromentalDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.enviromentalDeviceDB.updateEnviromentalDevice(enviromentalDevice)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            }));
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
    getRootDevicePagination(adminId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getRootDevicePaginationFromDB(adminId, pageSize, pageIndex)
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
    getCouncilDevicePagination(councilId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.getCouncilDevicePaginationFromDB(councilId, pageSize, pageIndex)
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
     * Remove a device
     * deviceId: N -> removeDevice()
     *
     * @param deviceId - ID of the device we want to delete
     * @returns
     */
    removeDevice(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.enviromentalDeviceDB.removeDeviceInDB(deviceId)
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
exports.default = EnviromentaDeviceLogic;
