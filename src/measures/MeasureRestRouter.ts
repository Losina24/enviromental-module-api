/**
 * Name: MeasureRestRouter.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the measure feature
 */

import { Router, Request, Response } from "express";
import Measure from "./Measure";
import MeasureLogic from "./MeasureLogic";
import Utils from "../utils";

class MeasureRestRouter {

    private measureLogic = new MeasureLogic(); // FIX: este atributo está mal en el diseño

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getAllMeasuresByDeviceId();
        this.storeMeasure();
    }

    public getAllMeasuresByDeviceId = () => this.router.get('/:deviceId', (req: Request, res: Response) => {
        const deviceId = parseInt(req.params.deviceId);

        /*this.measureLogic.getDeviceById(id)
            .then( response => {
                let deviceInObject = response.toObject();

                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: deviceInObject
                })
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })*/
    })

    public storeMeasure = () => this.router.post('/', (req: Request, res: Response) => {
        /*let enviromentalDevice = new EnviromentalDevice();

        enviromentalDevice.setName(req.body.name);
        enviromentalDevice.setMac(req.body.mac);
        enviromentalDevice.setGatewayId(req.body.gatewayId);
        enviromentalDevice.setCoords([parseFloat(req.body.latitude), parseFloat(req.body.longitude)]);
        
        this.enviromentalDeviceLogic.storeDevice(enviromentalDevice)
            .then( response => {
                if(response == true) {
                    // Sending the response
                    res.status(200).send({
                        http: 200,
                        status: 'OK',
                        response: 'Enviromental device created succesfully'
                    })
                } else {
                    // Sending the response
                    res.status(204).send({
                        http: 204,
                        status: 'OK',
                        response: 'There are some problems creating a new enviromental device'
                    })
                }
            })
            .catch( err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })*/
    })
}

const measureRestRouter = new MeasureRestRouter();
export default measureRestRouter.router;
