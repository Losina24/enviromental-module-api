/**
 * Name: MeasureMqttRouter.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the MQTT interactions of the measure feature
 */

import EnviromentalDevice from '../enviromental-device/EnviromentalDevice';
import EnviromentaDeviceLogic from '../enviromental-device/EnviromentalDeviceLogic';
import Gateway from '../gateways/Gateway';
import GatewayLogic from '../gateways/GatewayLogic';
import MqttRouter from '../MqttRouter';
import Sensor from '../sensor/Sensor';
import SensorLogic from '../sensor/SensorLogic';
import Measure from './Measure';
import MeasureLogic from "./MeasureLogic";

export default class MeasureMqttRouter extends MqttRouter {

    private measureLogic = new MeasureLogic();

    // Constructor
    constructor() {
        super();
        this.connect();
        this.storeMeasure();
        this.syncDevice();
        this.addSensorMeasure();
    }


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
    public addSensorMeasure = () => {
        this.suscribe('measure/send');
        this.client.on("message", async (topic: any, message: any) => {
            if (topic == 'measure/send') {
                const msg = message.toString();
                let jsonData: any = JSON.parse(msg)
                console.log(jsonData)
                let measureLogic: MeasureLogic = new MeasureLogic()
                let sensorLogic: SensorLogic = new SensorLogic()

                let res: any = await sensorLogic.getSensorByName(jsonData.name).catch((err: any) => {
                    console.log(err)
                })
                console.log(res)
                let sensor: Sensor = res.result
                let measure: Measure = new Measure()
                let date: string = new Date(Date.now()).toJSON().replace("T", " ").slice(0, -5)
                if (jsonData.value > 800) {
                    measure.setDanger('red')
                } else if (jsonData.value > 500) {
                    measure.setDanger('yellow')
                } else {
                    measure.setDanger('green')

                }
                measure.setDate(date)
                measure.setUnit(jsonData.unit)
                measure.setValue(jsonData.value)
                measure.setSensorId(sensor.getId())
                await measureLogic.insertMeasure(measure).then((res: any) => {
                    console.log(res)
                }).catch((err: any) => {
                    console.log(err)
                })
            }

        })
    }
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
    public syncDevice = () => {
        this.suscribe('deviceSync');

        // When a message arrives
        this.client.on("message", async (topic: any, message: any) => {
            if (topic == 'deviceSync') {

                const msg = message.toString();
                let gatewayLogic = new GatewayLogic()
                let deviceLogic = new EnviromentaDeviceLogic()
                let sensorLogic = new SensorLogic()

                let jsonData: any = JSON.parse(msg)
                console.log(jsonData)
                console.log(jsonData.device)

                let gatewayMac: string = jsonData.gatewayMac
                let gatewayAndAdminIdJSON: any = await gatewayLogic.getGatewayByMacAndAdminId(gatewayMac).catch((err: any) => {
                    console.log(err)
                })
                let device: EnviromentalDevice = new EnviromentalDevice();
                device.setDeviceEUI(jsonData.device.deviceEui)
                device.setName(jsonData.device.name)
                device.setCoords([jsonData.device.latitude, jsonData.device.longitude])
                device.setStatus(true)
                device.setGatewayId(gatewayAndAdminIdJSON.gatewayId)
                console.log(device)
                let deviceInsertRes: any = await deviceLogic.storeDevice(device, gatewayAndAdminIdJSON.adminId).catch((err: any) => {
                    console.log(err)
                })
                console.log("device insert id")
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
                });

                this.publish(jsonData.device.deviceEui + "/syncDone", "")
            }
        });
    }

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
    public storeMeasure = () => {
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
    }
}