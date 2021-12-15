/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the rest rules of the sensor feature
 */

import { Router, Request, Response } from 'express';
import Utils from "../Utils";
import SensorLogic from "./SensorLogic";
import Sensor from "./Sensor";

class SensorRestRouter {

    private sensorLogic = new SensorLogic();

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
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
    public getSensorById = () => this.router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.sensorLogic.getSensorById(id)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getAllUserSensors = () => this.router.get('/list/:userId', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);

        this.sensorLogic.getAllUserSensors(userId)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getAllRootSensorsCount = () => this.router.get('/count/root/:id', (req: Request, res: Response) => {
        this.sensorLogic.getAllRootSensorsCount()
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getAllAdminSensorsCount = () => this.router.get('/count/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);

        this.sensorLogic.getAllAdminSensorsCount(councilId)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getAllUserSensorsCount = () => this.router.get('/count/user/:userId', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);

        this.sensorLogic.getAllUserSensorsCount(userId)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getUserSensorPagination = () => this.router.get('/list/user/:userId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.sensorLogic.getUserSensorPagination(userId, pageSize, pageIndex)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getAllCouncilSensors = () => this.router.get('/list/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);

        this.sensorLogic.getAllCouncilSensors(councilId)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getCouncilSensorPagination = () => this.router.get('/list/council/:councilId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.sensorLogic.getCouncilSensorPagination(councilId, pageSize, pageIndex)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public storeSensor = () => this.router.post('/', (req: Request, res: Response) => {
        let sensor = new Sensor()
        sensor.setDeviceId(req.body.deviceId)
        sensor.setName(req.body.name)
        sensor.setDeviceEUI(req.body.deviceEUI)
        sensor.setType(req.body.type)
        sensor.setStatus(req.body.status)
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

                console.log(Utils.sendRestResponse(response, res))
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getAdminSensorPagination = () => this.router.get('/list/admin/:adminId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const adminId = parseInt(req.params.adminId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.sensorLogic.getAdminSensorPagination(adminId, pageSize, pageIndex)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getAdminAllSensors = () => this.router.get('/list/admin/:adminId', (req: Request, res: Response) => {
        const adminId = parseInt(req.params.adminId);

        this.sensorLogic.getAdminAllSensors(adminId)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
    public getDeviceSensors = () => this.router.get('/device/:deviceId', (req: Request, res: Response) => {
        const deviceId = parseInt(req.params.deviceId);

        this.sensorLogic.getDeviceSensors(deviceId)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

    /**
     * Remove sensor with the given id
     * Delete /sensors/:sensorId
     * Response: {
         "http": 200,
         "status": "OK",
         "response": true
     }
     */
    public removeSensor = () => this.router.delete('/:sensorId', (req: Request, res: Response) => {
        const sensorId = parseInt(req.params.sensorId);

        this.sensorLogic.removeSensor(sensorId)
            .then(response => {
                // Sending the response
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })
}

const sensorRestRouter = new SensorRestRouter();
export default sensorRestRouter.router;
