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
        //this.getLastDeviceMeasure();
        this.getUserMeasuresPaginated();
        this.getAdminMeasuresPaginated();
        this.getRootMeasuresPaginated();
        this.getUserMeasures();
        this.getAdminMeasures();
        this.getRootMeasures();
        this.getUserMeasuresCount();
        this.getAdminMeasuresCount();
        this.getRootMeasuresCount();
        this.insertMeasure();
    }

    /**
     * Insert measure
     * POST /measures
     *
     * Response: {
            "http": 200,
            "status": "OK",
            "response": {
            }
    * }
    *
    */
    public insertMeasure = () => this.router.post('/', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        let date: string = new Date(Date.now()).toJSON().replace("T", " ").slice(0, -5)
        let measure: Measure = new Measure()
        measure.setSensorId(req.body.sensorId)
        measure.setValue(req.body.value)
        measure.setDate(date);
        measure.setUnit(req.body.unit);
        this.measureLogic.insertMeasure(measure)
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
     * Get user measures
     * GET /measures/user/:userId
     *
     * Response: {
            "http": 200,
            "status": "OK",
            "response": {
            }
    * }
    *
    */
    public getUserMeasures = () => this.router.get('/user/:userId', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        this.measureLogic.getUserMeasures(userId)
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
    * Get council measures
    * GET /measures/council/:councilId
    *
    * Response: {
    "http": 200,
    "status": "OK",
    "response": {
    }
    * }
    *
    */
    public getAdminMeasures = () => this.router.get('/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);
        this.measureLogic.getAdminMeasures(councilId)
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
     * Get all measures
     * GET /measures/root/:id
     *
     * Response: {
     "http": 200,
    "status": "OK",
    "response": {
    }
    * }
    *
    */
    public getRootMeasures = () => this.router.get('/root/:id', (req: Request, res: Response) => {
        this.measureLogic.getRootMeasures()
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
    * Get user measures ( * COUNT * )
    * GET /measures/user/:userId
    *
    * Response: {
           "http": 200,
           "status": "OK",
           "response": {
           }
   * }
   *
   */
    public getUserMeasuresCount = () => this.router.get('/count/user/:userId', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        this.measureLogic.getUserMeasuresCount(userId)
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
    * Get council measures ( * COUNT * )
    * GET /measures/council/:councilId
    *
    * Response: {
    "http": 200,
    "status": "OK",
    "response": {
    }
    * }
    *
    */
    public getAdminMeasuresCount = () => this.router.get('/count/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);
        this.measureLogic.getAdminMeasuresCount(councilId)
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
     * Get all measures ( * COUNT * )
     * GET /measures/root/:id
     *
     * Response: {
     "http": 200,
    "status": "OK",
    "response": {
    }
    * }
    *
    */
    public getRootMeasuresCount = () => this.router.get('/count/root/:id', (req: Request, res: Response) => {
        this.measureLogic.getRootMeasuresCount()
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
* Get user measures ( * PAGINATED * )
* GET /measures/user/:userId
*
* Response: {
   "http": 200,
   "status": "OK",
   "response": {
   }
* }
*
*/
    public getUserMeasuresPaginated = () => this.router.get('/user/:userId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.measureLogic.getUserMeasuresPaginated(userId, pageSize, pageIndex)
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
    * Get council measures ( * PAGINATED * )
    * GET /measures/council/:councilId
    *
    * Response: {
    "http": 200,
    "status": "OK",
    "response": {
    }
    * }
    *
    */
    public getAdminMeasuresPaginated = () => this.router.get('/council/:councilId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.measureLogic.getAdminMeasuresPaginated(councilId, pageSize, pageIndex)
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
     * Get all measures ( * PAGINATED * )
     * GET /measures/root/:id
     *
     * Response: {
     "http": 200,
    "status": "OK",
    "response": {
    }
    * }
    *
    */
    public getRootMeasuresPaginated = () => this.router.get('/root/:id/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.measureLogic.getRootMeasuresPaginated(pageSize, pageIndex)
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
            .then(response => {
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
}

const measureRestRouter = new MeasureRestRouter();
export default measureRestRouter.router;
