/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the logic of the enviromental device feature
 */

import EnviromentalDeviceDatabaseHandler from "./EnviromentalDeviceDatabaseHandler";
import EnviromentalDevice from "./EnviromentalDevice";
import CouncilLogic from "../councils/CouncilLogic";
import GatewayLogic from "../gateways/GatewayLogic";
import MeasureLogic from "../measures/MeasureLogic";
import * as childs from "child_process"
import fs from 'fs'
import SensorLogic from "../sensor/SensorLogic";
import Sensor from "../sensor/Sensor";
import MeasureMqttRouter from "../measures/MeasureMqttRouter";

export default class EnviromentaDeviceLogic {

    // This atribute is used to manage the db interactions in the logic
    private enviromentalDeviceDB: EnviromentalDeviceDatabaseHandler = new EnviromentalDeviceDatabaseHandler();
    private measureMqttRouter : MeasureMqttRouter = new MeasureMqttRouter()

    // Constructor
    constructor() {
    }

    // Logic Methods 
    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     * 
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns 
     */
    public async getDeviceById(deviceId: number): Promise<EnviromentalDevice> {
        return new Promise<EnviromentalDevice>((resolve, reject) => {
            this.enviromentalDeviceDB.getDeviceByIdFromDB(deviceId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    public async getDeviceByDeviceEUI(deviceEUI: string): Promise<EnviromentalDevice> {
        return new Promise<EnviromentalDevice>((resolve, reject) => {
            this.enviromentalDeviceDB.getDeviceByDeviceEUIFromDB(deviceEUI)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
    * Get the information about a enviromental device given their ID
    * userId: N -> getDeviceById() -> EnviromentalDevice
    * 
    * @param deviceId - ID of the enviromental device you want to get data from
    * @returns 
    */
    public async getMapJsonDataUser(userId: number, councilId: number): Promise<EnviromentalDevice> {
        let spawn: any = childs.spawn('python3', ['../enviromental-module-api/src/map/mapa.py'])

        let councilLogic = new CouncilLogic();
        let gatewayLogic = new GatewayLogic();
        let deviceLogic = new EnviromentaDeviceLogic();
        let measureLogic = new MeasureLogic();

        let gateways: any = await gatewayLogic.getUserGateways(userId).catch(err => {
            console.log(err)
        })
        console.log("****** gateways ******")
        console.log(gateways.result)
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

        let devices: any = await deviceLogic.getAllUserDevices(userId).catch(err => {
            console.log(err)
        })
        console.log("****** devices ******")
        console.log(devices.result)
        let devicesFORMATED: any[] = []
        for (const device of devices.result) {

            let measuresResponse: any = await measureLogic.getAllMeasuresByDeviceId(device.id)
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

        let councils: any = await councilLogic.getCouncilById(councilId).catch(err => {
            console.log(err)
        })
        console.log("****** councils ******")
        console.log(councils.result)
        let councilsFORMATED: any = {
            name: councils.result.name,
            radius: 30,
            lat: gatewaysFORMATED[0].lat,
            lng: gatewaysFORMATED[0].lng
        }

        let formatedJsonResponse = {
            councils: councilsFORMATED,
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

    /**
    * Get the information about a enviromental device given their ID
    * userId: N -> getDeviceById() -> EnviromentalDevice
    * 
    * @param deviceId - ID of the enviromental device you want to get data from
    * @returns 
    */
    public async getMapJsonDataRoot(): Promise<EnviromentalDevice> {
        let spawn: any = childs.spawn('python3', ['../enviromental-module-api/src/map/mapa.py'])

        let councilLogic = new CouncilLogic();
        let gatewayLogic = new GatewayLogic();
        let deviceLogic = new EnviromentaDeviceLogic();
        let measureLogic = new MeasureLogic();
        let sensorLogic = new SensorLogic();

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
            let deviceSensors: any = await sensorLogic.getDeviceSensors(device.id)
            let sensorMeasurements: any[] = []
            //console.log("deviceSensors", deviceSensors)
            if (deviceSensors.http == 200) {
                for (const sensor of deviceSensors.result) {
                    let lastSensorMeasure: any = await measureLogic.getLastSensorMeasure(sensor.id)
                    if (lastSensorMeasure.result) {
                        sensorMeasurements.push(lastSensorMeasure.result)
                    }
                }
            }
            devicesFORMATED.push({
                name: device.name,
                measurements: sensorMeasurements,
                lat:device.coords[0],
                lng:device.coords[1]
            })
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
*//*
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
    public async getAllUserDevices(userId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllUserDevicesFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    public async updateOTA(): Promise<void> {
        this.measureMqttRouter.updateOTA()
    }

    /**
    * Get all enviroment devices of root ( * COUNT * )
    * getAllUserDevices() -> [EnviromentalDevice]
    *
    * @returns
    */
    public async getAllRootDevicesCount(): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllRootDevicesCountFromDB()
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
    * Get all enviroment devices of admin ( * COUNT * )
    * councilId: N -> getAllUserDevices() -> [EnviromentalDevice]
    *
    * @param councilId - ID of the council you want to get all enviromental devices from
    * @returns
    */
    public async getAllAdminDevicesCount(councilId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllAdminDevicesCountFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    public async getAllAdminDevices(councilId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllAdminDevicesFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all enviroment devices of a user ( * COUNT * )
     * userId: N -> getAllUserDevices() -> [EnviromentalDevice]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    public async getAllUserDevicesCount(userId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllUserDevicesCountFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
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
    public async getUserDevicePagination(userId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getUserDevicePaginationFromDB(userId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all enviromental devices from a council
     * councilId: N -> getAllCouncilDevices() -> [EnviromentalDevice]
     * 
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns 
     */
    public async getAllCouncilDevices(councilId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllCouncilDevicesFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get enviromental devices of a gateway
     * gatewayId: N -> getGatewayDevices() -> [EnviromentalDevice]
     * 
     * @param gatewayId - ID of the gateway that you want to get all enviromental devices
     * @returns 
     */
    public async getAllGatewayDevices(gatewayId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getGatewayDevicesFromDB(gatewayId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDevice() -> boolean
     * 
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns 
     */
    public async storeDevice(enviromentalDevice: EnviromentalDevice, userId: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            await this.enviromentalDeviceDB.storeDeviceInDB(enviromentalDevice, userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDevice() -> boolean
     * 
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns 
     */
    public async updateDevice(enviromentalDevice: EnviromentalDevice): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            await this.enviromentalDeviceDB.updateEnviromentalDevice(enviromentalDevice)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
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
    public async getRootDevicePagination(adminId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getRootDevicePaginationFromDB(adminId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
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
    public async getCouncilDevicePagination(councilId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getCouncilDevicePaginationFromDB(councilId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Remove a device
     * deviceId: N -> removeDevice()
     *
     * @param deviceId - ID of the device we want to delete
     * @returns
     */
    public async removeDevice(deviceId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.enviromentalDeviceDB.removeDeviceInDB(deviceId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
