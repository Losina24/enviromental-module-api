"use strict";
/**
 * Name: MeasureMqttRouter.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the MQTT interactions of the measure feature
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
const EnviromentalDevice_1 = __importDefault(require("../enviromental-device/EnviromentalDevice"));
const EnviromentalDeviceLogic_1 = __importDefault(require("../enviromental-device/EnviromentalDeviceLogic"));
const GatewayLogic_1 = __importDefault(require("../gateways/GatewayLogic"));
const MqttRouter_1 = __importDefault(require("../MqttRouter"));
const Sensor_1 = __importDefault(require("../sensor/Sensor"));
const SensorLogic_1 = __importDefault(require("../sensor/SensorLogic"));
const Measure_1 = __importDefault(require("./Measure"));
const MeasureLogic_1 = __importDefault(require("./MeasureLogic"));
class MeasureMqttRouter extends MqttRouter_1.default {
    // Constructor
    constructor() {
        super();
        this.measureLogic = new MeasureLogic_1.default();
        this.updateOTA = () => {
            this.publish("46701/ambiental/2", "UPDATE");
        };
        /**
         * Save a new measure
         * GET postalcode/ambiental/1/#
         *
         * Body: {
         *  "deviceEui": 1,
         *  "value": 10.32,
         *  "unit": "ppm"
         *  "type": "CO2"
         * }
         *
         */
        this.addSensorMeasure = () => {
            this.suscribe('measure/send');
            this.client.on("message", (topic, message) => __awaiter(this, void 0, void 0, function* () {
                let deviceLogic = new EnviromentalDeviceLogic_1.default();
                const msg = message.toString();
                let jsonData = JSON.parse(msg);
                console.log(jsonData);
                let measureLogic = new MeasureLogic_1.default();
                let sensorLogic = new SensorLogic_1.default();
                if (topic == 'measure/send') {
                    let deviceByDevEui = yield deviceLogic.getDeviceByDeviceEUI(jsonData.deviceEui).catch((err) => {
                        console.log(err);
                    });
                    console.log("deviceByDevEui", deviceByDevEui);
                    // Si existe el device
                    if (deviceByDevEui.http == 200) {
                        let res = yield sensorLogic.getSensorByName(jsonData.deviceEui + "-" + jsonData.name).catch((err) => {
                        });
                        console.log("getSensorByName", res);
                        let sensor;
                        if (res.http == 200) {
                            // si existe el sensor guardo los datos
                            sensor = res.result;
                        }
                        else if (res.http == 204) {
                            // si no existe CREO el sensor y añado la medida
                            let sensorToCreate = new Sensor_1.default();
                            sensorToCreate.setDeviceEUI(jsonData.deviceEui);
                            sensorToCreate.setDeviceId(deviceByDevEui.result.id);
                            console.log('123321', jsonData.type);
                            sensorToCreate.setName(jsonData.deviceEui + "-" + jsonData.name);
                            sensorToCreate.setStatus(false);
                            let typeId = this.getSensorTypeId(jsonData.type);
                            sensorToCreate.setType(typeId);
                            let sensorInsertedId = yield sensorLogic.storeSensor(sensorToCreate).catch((err) => {
                                console.log(err);
                            });
                            console.log("*** RESULT FROM storeSensor() ***", sensorInsertedId);
                            sensor = yield sensorLogic.getSensorById(sensorInsertedId.result).catch((err) => {
                                console.log(err);
                            });
                            console.log("*** sensorInserted ***", sensor);
                            sensor = sensor.result;
                        }
                        let measure = new Measure_1.default();
                        let date = new Date(Date.now()).toJSON().replace("T", " ").slice(0, -5);
                        if (jsonData.value > 800) {
                            measure.setDanger('red');
                        }
                        else if (jsonData.value > 500) {
                            measure.setDanger('yellow');
                        }
                        else {
                            measure.setDanger('green');
                        }
                        measure.setDate(date);
                        measure.setUnit(jsonData.unit);
                        measure.setValue(jsonData.value);
                        measure.setSensorId(sensor.getId());
                        yield measureLogic.insertMeasure(measure).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                }
            }));
        };
        /**
         * Save a new measure
         * GET postalcode/ambiental/1/#
         *
         * Body: {
         *  "deviceEui": 1,
         *  "value": 10.32,
         *  "unit": "ppm"
         *  "type": "CO2"
         * }
         *
         */
        this.syncDevice = () => {
            this.suscribe('deviceSync');
            // When a message arrives
            this.client.on("message", (topic, message) => __awaiter(this, void 0, void 0, function* () {
                if (topic == 'deviceSync') {
                    const msg = message.toString();
                    let gatewayLogic = new GatewayLogic_1.default();
                    let deviceLogic = new EnviromentalDeviceLogic_1.default();
                    let sensorLogic = new SensorLogic_1.default();
                    let jsonData = JSON.parse(msg);
                    console.log(jsonData);
                    console.log(jsonData.device);
                    let gatewayMac = jsonData.gatewayMac;
                    let gatewayAndAdminIdJSON = yield gatewayLogic.getGatewayByMacAndAdminId(gatewayMac).catch((err) => {
                        console.log(err);
                    });
                    let device = new EnviromentalDevice_1.default();
                    device.setDeviceEUI(jsonData.device.deviceEui);
                    device.setName(jsonData.device.name);
                    device.setCoords([jsonData.device.latitude, jsonData.device.longitude]);
                    device.setStatus(true);
                    device.setGatewayId(gatewayAndAdminIdJSON.gatewayId);
                    console.log(device);
                    let deviceByDevEui = yield deviceLogic.getDeviceByDeviceEUI(jsonData.device.deviceEui).catch((err) => {
                        console.log(err);
                    });
                    console.log("deviceByDevEui", deviceByDevEui);
                    if (deviceByDevEui.http == 200) {
                    }
                    else if (deviceByDevEui.http == 204) {
                        let deviceInsertRes = yield deviceLogic.storeDevice(device, gatewayAndAdminIdJSON.adminId).catch((err) => {
                            console.log(err);
                        });
                    }
                    /* console.log("device insert id")
                     console.log(deviceInsertRes.result)
                     // create device sensors
                     let sensors: Sensor[] = []
                     let contador: number = 0
                     jsonData.sensors.forEach((sensor: any) => {
                         let sensorObj: Sensor = new Sensor()
                         sensorObj.setName(sensor.name)
                         sensorObj.setDeviceEUI("deviceEUI-" + sensor.name)
                         sensorObj.setStatus(false)
                         sensorObj.setType("1")
                         sensorObj.setDeviceId(deviceInsertRes.result)
                         sensors.push(sensorObj)
                         contador++;
                     });
                     console.log("SENSORS TO CREATE MQTT")
                     console.log(sensors)
                     sensors.forEach(async sensor => {
                         await sensorLogic.storeSensor(sensor).then((res: any) => {
                             console.log(res)
                         }).catch((err: any) => {
                             console.log(err)
                         })
                     });*/
                    this.publish("deviceSync/" + jsonData.device.deviceEui, '{\n\"SYNCHRONIZED\":\"' + jsonData.device.deviceEui + '\"\n}');
                }
            }));
        };
        /**
         * Save a new measure
         * GET postalcode/ambiental/1/#
         *
         * Body: {
         *  "deviceEui": 1,
         *  "value": 10.32,
         *  "unit": "ppm"
         *  "type": "CO2"
         * }
         *
         */
        this.storeMeasure = () => {
            /*this.suscribe('46701/ambiental/1/#');
        
            // When a message arrives
            this.client.on("message", (topic: any, message: any) => {
                const msg = message.toString();
        
                let measure = new Measure();
                measure.formatPayload(msg)
        
                this.measureLogic.storeMeasure(measure)
                    .then(() => {
                    })
                    .catch(() => {
        
                    })
            });*/
            /*this.suscribe('46701/ambiental/1/#');
        
            // When a message arrives
            this.client.on("message", (topic: any, message: any) => {
                const msg = message.toString();
        
                let measure = new Measure();
                measure.formatPayload(msg)
        
                this.measureLogic.storeMeasure(measure)
                    .then(() => {
                    })
                    .catch(() => {
        
                    })
            });*/
        };
        this.connect();
        this.storeMeasure();
        this.syncDevice();
        this.addSensorMeasure();
    }
    getSensorTypeId(typeStr) {
        switch (typeStr) {
            case 'SOIL':
                return "1";
            case 'HCO':
                return "2";
            case 'VOC':
                return "3";
            case 'CO2':
                return "4";
            case 'C12':
                return "5";
            case 'H2':
                return "6";
            case 'H2S':
                return "7";
            case 'HCL':
                return "8";
            case 'HCN':
                return "9";
            case 'HF':
                return "10";
            case 'NH3':
                return "11";
            case 'NO2':
                return "12";
            case 'O3':
                return "13";
            case 'O2':
                return "14";
            case 'SO2':
                return "15";
            case 'TEMP':
                return "16";
            case 'NOISE':
                return "17";
            case 'EPSILON':
                return "18";
            default:
                return "4";
        }
    }
}
exports.default = MeasureMqttRouter;
