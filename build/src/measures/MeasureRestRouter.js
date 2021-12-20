"use strict";
/**
 * Name: MeasureRestRouter.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the measure feature
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Measure_1 = __importDefault(require("./Measure"));
const MeasureLogic_1 = __importDefault(require("./MeasureLogic"));
const Utils_1 = __importDefault(require("../Utils"));
class MeasureRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.measureLogic = new MeasureLogic_1.default(); // FIX: este atributo está mal en el diseño
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
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
        this.insertMeasure = () => this.router.post('/', (req, res) => {
            const userId = parseInt(req.params.userId);
            let date = new Date(Date.now()).toJSON().replace("T", " ").slice(0, -5);
            let measure = new Measure_1.default();
            measure.setSensorId(req.body.sensorId);
            measure.setValue(req.body.value);
            measure.setDate(date);
            measure.setUnit(req.body.unit);
            this.measureLogic.insertMeasure(measure)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getDeviceMeasures = () => this.router.get('/device/:deviceId', (req, res) => {
            const deviceId = parseInt(req.params.deviceId);
            this.measureLogic.getAllMeasuresByDeviceId(deviceId)
                .then((response) => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch((err) => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getUserMeasures = () => this.router.get('/user/:userId', (req, res) => {
            const userId = parseInt(req.params.userId);
            this.measureLogic.getUserMeasures(userId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getAdminMeasures = () => this.router.get('/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            this.measureLogic.getAdminMeasures(councilId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getRootMeasures = () => this.router.get('/root/:id', (req, res) => {
            this.measureLogic.getRootMeasures()
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getUserMeasuresCount = () => this.router.get('/count/user/:userId', (req, res) => {
            const userId = parseInt(req.params.userId);
            this.measureLogic.getUserMeasuresCount(userId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getAdminMeasuresCount = () => this.router.get('/count/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            this.measureLogic.getAdminMeasuresCount(councilId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getRootMeasuresCount = () => this.router.get('/count/root/:id', (req, res) => {
            this.measureLogic.getRootMeasuresCount()
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getUserMeasuresPaginated = () => this.router.get('/user/:userId/:pageSize/:pageIndex', (req, res) => {
            const userId = parseInt(req.params.userId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.measureLogic.getUserMeasuresPaginated(userId, pageSize, pageIndex)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getAdminMeasuresPaginated = () => this.router.get('/council/:councilId/:pageSize/:pageIndex', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.measureLogic.getAdminMeasuresPaginated(councilId, pageSize, pageIndex)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getRootMeasuresPaginated = () => this.router.get('/root/:id/:pageSize/:pageIndex', (req, res) => {
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.measureLogic.getRootMeasuresPaginated(pageSize, pageIndex)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
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
        this.getAllMeasuresByDeviceId = () => this.router.get('/:deviceId', (req, res) => {
            const deviceId = parseInt(req.params.deviceId);
            this.measureLogic.getAllMeasuresByDeviceId(deviceId)
                .then(response => {
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                });
            })
                .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                });
            });
        });
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
        this.getDeviceMeasures();
        this.insertMeasure();
    }
}
const measureRestRouter = new MeasureRestRouter();
exports.default = measureRestRouter.router;
