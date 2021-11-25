/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
 */

import { Router, Request, Response } from 'express';

import Utils from "../utils";
import SensorNotification from './SensorNotification';
import SensorNotificationLogic from './SensorNotificationLogic';

class SensorNotificationRestRouter {

    private notificationLogic = new SensorNotificationLogic(); // FIX: este atributo está mal en el diseño

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getNotificationsByUserId();
        this.getSensorNotificationById();
        this.getSensorNotificationsBySensorId();
        this.createSensorNotification();
        this.editSensorNotification();
        this.removeNotification();
    }

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
    public getNotificationsByUserId = () => this.router.get('/listByUserId/:id', (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);

        this.notificationLogic.getNotificationsByUserId(userId)
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
    public getSensorNotificationById = () => this.router.get('/:id', (req: Request, res: Response) => {
        const notificationId = parseInt(req.params.id);

        this.notificationLogic.getSensorNotificationById(notificationId)
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
    public getSensorNotificationsBySensorId = () => this.router.get('/listBySensorId/:id', (req: Request, res: Response) => {
        const sensorId = parseInt(req.params.id);

        this.notificationLogic.getSensorNotificationsBySensorId(sensorId)
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
     public createSensorNotification = () => this.router.post('/', (req: Request, res: Response) => {
        let notification = new SensorNotification();

        notification.setId(req.body.id)
        notification.setSensorId(req.body.sensor_id);
        notification.setBody(req.body.body);
        notification.setSubject(req.body.subject);
        notification.setMagnitude(req.body.magnitude);

        this.notificationLogic.createSensorNotification(notification)
            .then( response => {
                if(res.status(200)) {
                    // Sending the response
                    res.status(200).send({
                        http: 200,
                        status: 'OK',
                        response: 'Network server created succesfully',
                        lastInsertId: response.insertId
                    })
                } else {
                    // Sending the response
                    res.status(204).send({
                        http: 204,
                        status: 'OK',
                        response: 'There are some problems creating a new network server'
                    })
                }
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
    public editSensorNotification = () => this.router.put('/:id', (req: Request, res: Response) => {
        let notification = new SensorNotification();

        notification.setId(parseInt(req.params.id))
        notification.setSensorId(req.body.sensor_id);
        notification.setBody(req.body.body);
        notification.setSubject(req.body.subject);
        notification.setMagnitude(req.body.magnitude);

        this.notificationLogic.editSensorNotification(notification)
            .then( (response: any) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: "network server updated"
                })
            })
            .catch( (err: any) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

    /**
     * Remove a user by given id
     * DELETE /users/:id
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
    public removeNotification = () => this.router.delete('/:id', (req: Request, res: Response) => {
        const notificationId = parseInt(req.params.id);

        this.notificationLogic.removeNotification(notificationId)
            .then( (response: any) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch( (err: any) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })
}

const enviromentalDeviceRestRouter = new SensorNotificationRestRouter();
export default enviromentalDeviceRestRouter.router;
