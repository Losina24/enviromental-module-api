/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
 */

import { Router, Request, Response, response } from 'express';
import EnviromentalDeviceLogic from './EnviromentalDeviceLogic';
import EnviromentalDevice from './EnviromentalDevice';

import Utils from "../Utils";

class EnviromentalDeviceRestRouter {

    private enviromentalDeviceLogic = new EnviromentalDeviceLogic(); // FIX: este atributo está mal en el diseño

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getDeviceById();
        this.getAllUserDevices();
        this.getAllUserDevicesCount();
        this.getAllAdminDevicesCount();
        this.getAllRootDevicesCount();
        this.getUserDevicePagination();
        this.getAllCouncilDevices();
        this.getAllGatewayDevices();
        this.storeDevice();
        this.updateDevice();
        this.getAdminDevicePagination();
        this.getCouncilDevicePagination();
        this.removeDevice();
    }

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
    public getDeviceById = () => this.router.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        await this.enviromentalDeviceLogic.getDeviceById(id)
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
    public getAllUserDevices = () => this.router.get('/user/:userId', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);

        this.enviromentalDeviceLogic.getAllUserDevices(userId)
            .then(response => {
                // Sending the response
                console.log(response);
                
                Utils.sendRestResponse(response, res)
            })
            .catch(err => {
                // Sending the response
                Utils.sendRestResponse(err, res)
            })
    })

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
     public getAllRootDevicesCount = () => this.router.get('/count/root/:id', (req: Request, res: Response) => {

        this.enviromentalDeviceLogic.getAllRootDevicesCount()
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
     public getAllAdminDevicesCount = () => this.router.get('/count/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);

        this.enviromentalDeviceLogic.getAllAdminDevicesCount(councilId)
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
    public getAllUserDevicesCount = () => this.router.get('/count/user/:userId', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);

        this.enviromentalDeviceLogic.getAllUserDevicesCount(userId)
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
    public getUserDevicePagination = () => this.router.get('/user/:userId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.enviromentalDeviceLogic.getUserDevicePagination(userId, pageSize, pageIndex)
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
    public getAllCouncilDevices = () => this.router.get('/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);

        this.enviromentalDeviceLogic.getAllCouncilDevices(councilId)
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
    public getAllGatewayDevices = () => this.router.get('/gateway/:gatewayId', (req: Request, res: Response) => {
        const gatewayId = parseInt(req.params.gatewayId);

        this.enviromentalDeviceLogic.getAllGatewayDevices(gatewayId)
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
    public storeDevice = () => this.router.post('/:userId', (req: Request, res: Response) => {

        let enviromentalDevice = new EnviromentalDevice();
        enviromentalDevice.setName(req.body.name);
        enviromentalDevice.setDeviceEUI(req.body.deviceEUI);
        enviromentalDevice.setGatewayId(req.body.gatewayId);
        enviromentalDevice.setCoords([parseFloat(req.body.latitude), parseFloat(req.body.longitude)]);

        this.enviromentalDeviceLogic.storeDevice(enviromentalDevice, req.params.userId)
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
     public updateDevice = () => this.router.put('/:deviceId', (req: Request, res: Response) => {
        console.log("router reached updateDevice()")
        let enviromentalDevice = new EnviromentalDevice();
        enviromentalDevice.setId(parseInt(req.params.deviceId));
        enviromentalDevice.setName(req.body.name);
        enviromentalDevice.setDeviceEUI(req.body.deviceEUI);
        enviromentalDevice.setGatewayId(req.body.gatewayId);
        enviromentalDevice.setCoords([parseFloat(req.body.latitude), parseFloat(req.body.longitude)]);
        enviromentalDevice.setStatus(req.body.status);

        this.enviromentalDeviceLogic.updateDevice(enviromentalDevice)
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
    public getAdminDevicePagination = () => this.router.get('/admin/:adminId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const adminId = parseInt(req.params.adminId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.enviromentalDeviceLogic.getAdminDevicePagination(adminId, pageSize, pageIndex)
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
    public getCouncilDevicePagination = () => this.router.get('/council/:councilId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.enviromentalDeviceLogic.getCouncilDevicePagination(councilId, pageSize, pageIndex)
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
     * Remove device with the given id
     * Delete enviromental/devices/:sensorId
     * Response: {
         "http": 200,
         "status": "OK",
         "response": true
     }
     */
    public removeDevice = () => this.router.delete('/:deviceId', async (req: Request, res: Response) => {
        const deviceId = parseInt(req.params.deviceId);
        await this.enviromentalDeviceLogic.removeDevice(deviceId)
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

const enviromentalDeviceRestRouter = new EnviromentalDeviceRestRouter();
export default enviromentalDeviceRestRouter.router;
