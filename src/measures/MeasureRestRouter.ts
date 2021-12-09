/**
 * Name: MeasureRestRouter.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the measure feature
 */

import { Router, Request, Response } from "express";
import Measure from "./Measure";
import MeasureLogic from "./MeasureLogic";
import Utils from "../Utils";

class MeasureRestRouter {

    private measureLogic = new MeasureLogic(); // FIX: este atributo está mal en el diseño

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getAllMeasuresByDeviceId();
    }

    /**
     * Get measures
     * GET /measures/:deviceId
     * 
     * Response: {
     *  "http": 200,
     *  "status": "OK",
     *  "response": [{
     *      "sensorId": 32,
     *      "value": 12.25,
     *      "date": "21-10-2021 21:20:15",
     *      "unit": "ppm",
     *      "unit": "CO2" 
     *  }]
     * }
     * 
     */
    public getAllMeasuresByDeviceId = () => this.router.get('/:deviceId', (req: Request, res: Response) => {
        const deviceId = parseInt(req.params.deviceId);

        this.measureLogic.getAllMeasuresByDeviceId(deviceId)
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
}

const measureRestRouter = new MeasureRestRouter();
export default measureRestRouter.router;
