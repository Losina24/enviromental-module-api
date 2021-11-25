/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
 */

import {Router, Request, Response} from 'express';
import EnviromentalDeviceLogic from './EnviromentalDeviceLogic';
import EnviromentalDevice from './EnviromentalDevice';

import Utils from "../utils";

class EnviromentalDeviceRestRouter {

    private enviromentalDeviceLogic = new EnviromentalDeviceLogic(); // FIX: este atributo está mal en el diseño

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getDeviceById();
        this.getAllUserDevices();
        this.getUserDevicePagination();
        this.getAllCouncilDevices();
        this.getAllGatewayDevices();
        this.storeDevice();
        this.getAdminDevicePagination();
        this.getCouncilDevicePagination();
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
    public getDeviceById = () => this.router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        this.enviromentalDeviceLogic.getDeviceById(id)
            .then(response => {
                let deviceInObject = response.toObject();

                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: deviceInObject
                })
            })
            .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

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
    public getAllUserDevices = () => this.router.get('/user/:userId', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);

        this.enviromentalDeviceLogic.getAllUserDevices(userId)
            .then(response => {
                let enviromentalDevices: any = [];

                // Generating an object for each enviromental device
                response.forEach(element => {
                    const device = {
                        id: element.getId(),
                        name: element.getName(),
                        mac: element.getMac(),
                        gatewayId: element.getGatewayId(),
                        //sensors: element.getSensors(),
                        coords: element.getCoords(),
                        status: element.getStatus()
                    }

                    enviromentalDevices.push(device);
                });

                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                })
            })
            .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

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
    public getUserDevicePagination = () => this.router.get('/user/:userId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.enviromentalDeviceLogic.getUserDevicePagination(userId, pageSize, pageIndex)
            .then(response => {
                let enviromentalDevices: object[] = Utils.enviromentalDevicesToObjects(response)

                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                })
            })
            .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

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
    public getAllCouncilDevices = () => this.router.get('/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);

        this.enviromentalDeviceLogic.getAllCouncilDevices(councilId)
            .then(response => {
                let enviromentalDevices: object[] = Utils.enviromentalDevicesToObjects(response)

                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                })
            })
            .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

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
    public getAllGatewayDevices = () => this.router.get('/gateway/:gatewayId', (req: Request, res: Response) => {
        const gatewayId = parseInt(req.params.gatewayId);

        this.enviromentalDeviceLogic.getAllGatewayDevices(gatewayId)
            .then(response => {
                let enviromentalDevices: object[] = Utils.enviromentalDevicesToObjects(response)

                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                })
            })
            .catch(err => {
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
    public storeDevice = () => this.router.post('/', (req: Request, res: Response) => {
        console.log("*****")
        let enviromentalDevice = new EnviromentalDevice();

        enviromentalDevice.setName(req.body.name);
        enviromentalDevice.setDeviceEUI(req.body.deviceEUI);
        enviromentalDevice.setGatewayId(req.body.gatewayId);
        enviromentalDevice.setCoords([parseFloat(req.body.latitude), parseFloat(req.body.longitude)]);

        this.enviromentalDeviceLogic.storeDevice(enviromentalDevice)
            .then(response => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch(err => {
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
    public getAdminDevicePagination = () => this.router.get('/admin/:adminId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const adminId = parseInt(req.params.adminId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.enviromentalDeviceLogic.getAdminDevicePagination(adminId, pageSize, pageIndex)
            .then(response => {
                let enviromentalDevices: object[] = Utils.enviromentalDevicesToObjects(response)

                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                })
            })
            .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

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
    public getCouncilDevicePagination = () => this.router.get('/council/:councilId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.enviromentalDeviceLogic.getCouncilDevicePagination(councilId, pageSize, pageIndex)
            .then(response => {
                let enviromentalDevices: object[] = Utils.enviromentalDevicesToObjects(response)

                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: enviromentalDevices
                })
            })
            .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })
}

const enviromentalDeviceRestRouter = new EnviromentalDeviceRestRouter();
export default enviromentalDeviceRestRouter.router;
