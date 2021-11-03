/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
 */

import { Router, Request, Response } from 'express';
import EnviromentalDeviceLogic from './EnviromentalDeviceLogic';

class EnviromentalDeviceRestRouter {

    private enviromentalDeviceLogic = new EnviromentalDeviceLogic(); // FIX: este atributo está mal en el diseño

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getDeviceById();
        this.getAllUserDevices();
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
            .then( response => {
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: {
                        id: response.getId(),
                        name: response.getName(),
                        mac: response.getMac(),
                        gatewayId: response.getGatewayId(),
                        //sensors: response.getSensors(),
                        coords: response.getCoords(),
                        status: response.getStatus()
                    }
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
        const id = parseInt(req.params.id);

        this.enviromentalDeviceLogic.getAllUserDevices(id)
            .then( response => {
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
            .catch( err => {
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