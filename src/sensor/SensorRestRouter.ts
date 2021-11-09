/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the rest rules of the sensor feature
 */

import { Router, Request, Response } from 'express';
import Utils from "../utils";
import SensorLogic from "./SensorLogic";
import Sensor from "./Sensor";

class SensorRestRouter {
    // HAY QUE CAMBIAR LAS URL, NO CONCUERDAN CON LAS URL DE LOS DISPOSITIVOS, FALTA EL COMENTARIO DEL BODY EN EL MÉTODO DE STORESENSOR
    private sensorLogic = new SensorLogic();

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getSensorById();
        this.getAllUserSensors();
        this.getUserSensorPagination();
        this.getAllCouncilSensors();
        this.storeSensor();
        this.getAdminSensorPagination();
        this.getAdminAllSensors();
        this.getCouncilSensorPagination();
        this.getDeviceSensors();
        this.removeSensor();
        // Falta el metodo para editar un sensor
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
            .then( response => {
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
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
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

    /**
     * Get all sensors from a user with pagination
     * GET /sensors/user/:userId/:pageSize/:pageIndex
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
    public getUserSensorPagination = () => this.router.get('/user/:userId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.sensorLogic.getUserSensorPagination(userId,pageSize,pageIndex)
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
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
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
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
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

    /**
     * Store a sensor in db
     * POST /sensors/add
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
    public storeSensor = () => this.router.post('/add', (req: Request, res: Response) => {

        let sensor = new Sensor()

        sensor.setDeviceId(req.body.deviceId)
        sensor.setName(req.body.name)
        sensor.setDeviceEUI(req.body.deviceEUI)
        sensor.setType(req.body.type)
        sensor.setStatus(req.body.status)

        this.sensorLogic.storeSensor(sensor)
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: "Sensor created succesfully",
                    lastInsertId: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
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
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
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
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
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
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

    /**
     * Remove sensor with the given id
     * Delete /sensors/delete/:sensorId
     * Response: {
         "http": 200,
         "status": "OK",
         "response": true
     }
     */
    public removeSensor = () => this.router.delete('/delete/:sensorId', (req: Request, res: Response) => { // HAY QUE CAMBIARLO POR "/"
        const sensorId = parseInt(req.params.sensorId);

        this.sensorLogic.removeSensor(sensorId)
            .then( response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: "Sensor was deleted succesfully"
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })
}

const sensorRestRouter = new SensorRestRouter();
export default sensorRestRouter.router;
