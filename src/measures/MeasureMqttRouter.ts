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
             let deviceLogic = new EnviromentaDeviceLogic()
             const msg = message.toString();
             let jsonData: any = JSON.parse(msg)
             console.log(jsonData)
             let measureLogic: MeasureLogic = new MeasureLogic()
             let sensorLogic: SensorLogic = new SensorLogic()
 
             if (topic == 'measure/send') {
                 let deviceByDevEui: any = await deviceLogic.getDeviceByDeviceEUI(jsonData.deviceEui).catch((err: any) => {
                     console.log(err)
                 })
                 console.log("deviceByDevEui", deviceByDevEui)
                 // Si existe el device
                 if (deviceByDevEui.http == 200) {
                     let res: any = await sensorLogic.getSensorByName(jsonData.deviceEui + "-" + jsonData.name).catch((err: any) => {
                     })
                     console.log("getSensorByName", res)
 
                     let sensor: any
                     if (res.http == 200) {
                         // si existe el sensor guardo los datos
                         sensor = res.result
                     } else if (res.http == 204) {
                         // si no existe CREO el sensor y añado la medida
                         let sensorToCreate: Sensor = new Sensor()
                         sensorToCreate.setDeviceEUI(jsonData.deviceEui)
                         sensorToCreate.setDeviceId(deviceByDevEui.result.id)
                         sensorToCreate.setName(jsonData.deviceEui + "-" + jsonData.name)
                         sensorToCreate.setStatus(false)
                         let typeId: string = this.getSensorTypeId(jsonData.type)
                         sensorToCreate.setType(typeId)
                         let sensorInsertedId: any = await sensorLogic.storeSensor(sensorToCreate).catch((err: any) => {
                             console.log(err)
                         })
                         console.log("*** RESULT FROM storeSensor() ***", sensorInsertedId)
                         sensor = await sensorLogic.getSensorById(sensorInsertedId.result).catch((err: any) => {
                             console.log(err)
                         })
                         console.log("*** sensorInserted ***", sensor)
                         sensor = sensor.result
                     }
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
 
             }
 
         })
     }
 
     getSensorTypeId(typeStr: String): string {
         console.log('puta', typeStr)
         switch (typeStr) {
             case 'SOIL':
                 return "1"
             case 'HCO':
                 return "2"
             case 'VOC':
                 return "3"
             case 'CO':
                 return "4"
             case 'C12':
                 return "5"
             case 'H2':
                 return "6"
             case 'H2S':
                 return "7"
             case 'HCL':
                 return "8"
             case 'HCN':
                 return "9"
             case 'HF':
                 return "10"
             case 'NH3':
                 return "11"
             case 'NO2':
                 return "12"
             case 'O3':
                 return "13"
             case 'O2':
                 return "14"
             case 'SO2':
                 return "15"
             case 'TEMP':
                 return "16"
             case 'NOISE':
                 return "17"
             case 'EPSILON':
                 return "18"
             default:
                 break;
         }
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
                 let deviceByDevEui: any = await deviceLogic.getDeviceByDeviceEUI(jsonData.device.deviceEui).catch((err: any) => {
                     console.log(err)
                 })
                 console.log("deviceByDevEui", deviceByDevEui)
                 if (deviceByDevEui.http == 200) {
 
                 } else if (deviceByDevEui.http == 204) {
                     let deviceInsertRes: any = await deviceLogic.storeDevice(device, gatewayAndAdminIdJSON.adminId).catch((err: any) => {
                         console.log(err)
                     })
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
 
                 this.publish("deviceSync/" + jsonData.device.deviceEui,
                     '{\n\"SYNCHRONIZED\":\"' + jsonData.device.deviceEui + '\"\n}'
                 )
 
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