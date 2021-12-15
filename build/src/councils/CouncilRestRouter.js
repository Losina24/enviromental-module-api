"use strict";
/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the rest rules of the sensor feature
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Utils_1 = __importDefault(require("../Utils"));
const Council_1 = __importDefault(require("./Council"));
const CouncilLogic_1 = __importDefault(require("./CouncilLogic"));
class CouncilRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.councilLogic = new CouncilLogic_1.default();
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
        /**
         * Get user information by given id
         * GET /users/:id
         *
         * Response: {
                "http": 200,
                "status": "OK",
                "response": {
                    "_id": 1,
                    "_roleId": 1,
                    "_councilId": 1,
                    "_name": "root",
                    "_surname": "",
                    "_password": "1234",
                    "_address": null,
                    "_phone": "617499124",
                    "_email": "email1@hotmail.com",
                    "_postalCode": null
                }
         * }
         *
         */
        this.getCouncilById = () => this.router.get('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            this.councilLogic.getCouncilById(id)
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
         * Get user information by given id
         * GET /count/root/:id
         *
         * Response: {
                "http": 200,
                "status": "OK",
                "response": {
                }
         * }
         *
         */
        this.getCouncilCount = () => this.router.get('/count/root/:id', (req, res) => {
            this.councilLogic.getCouncilCount()
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
         * Create a new user
         * POST /users/
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK"
         * }
         *
         */
        this.createCouncil = () => this.router.post('/', (req, res) => {
            let council = new Council_1.default();
            council.setName(req.body.name);
            council.setAddress(req.body.address);
            council.setPhone(req.body.phoneNumber);
            council.setEmail(req.body.email);
            council.setWeb(req.body.web);
            council.setPostalCode(req.body.postalCode);
            council.setIban(req.body.iban);
            this.councilLogic.createCouncil(council)
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
         * Edit user data
         * PUT /users/
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
        this.editCouncil = () => this.router.put('/:councilId', (req, res) => {
            let council = new Council_1.default();
            council.setId(parseInt(req.params.councilId));
            council.setName(req.body.name);
            council.setAddress(req.body.address);
            council.setPhone(req.body.phoneNumber);
            council.setEmail(req.body.email);
            council.setWeb(req.body.web);
            council.setPostalCode(req.body.postalCode);
            council.setIban(req.body.iban);
            this.councilLogic.editCouncil(council)
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
        this.removeCouncil = () => this.router.delete('/:id', (req, res) => {
            const councilId = parseInt(req.params.id);
            this.councilLogic.removeCouncil(councilId)
                .then(response => {
                // Sending the response            
                Utils_1.default.sendRestResponse(response, res);
            })
                .catch(err => {
                // Sending the response
                Utils_1.default.sendRestResponse(err, res);
            });
        });
        this.getCouncilById();
        this.createCouncil();
        this.editCouncil();
        this.removeCouncil();
        this.getCouncilCount();
    }
}
const sensorRestRouter = new CouncilRestRouter();
exports.default = sensorRestRouter.router;
