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
const Gateway_1 = __importDefault(require("./Gateway"));
const GatewayLogic_1 = __importDefault(require("./GatewayLogic"));
class GatewayRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        // falta put gateway
        this.gatewayLogic = new GatewayLogic_1.default();
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
        /**
         * Get gateway information by given id
         * GET /gateway/:id
         *
         * Response: {
                "http": 200,
                "status": "OK",
                "response": {
                }
         * }
         *
         */
        this.getGatewayById = () => this.router.get('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            this.gatewayLogic.getGatewayById(id)
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
        /**
         * Get user related gateways
         * GET /gateway/fromUser/:id
         *
         * Response: {
                "http": 200,
                "status": "OK",
                "response": {
                }
         * }
         *
         */
        this.getUserGateways = () => this.router.get('/fromUser/:userId', (req, res) => {
            const id = parseInt(req.params.userId);
            this.gatewayLogic.getUserGateways(id)
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
        /**
         * Get user related gateways ( * COUNT * )
         * GET /gateway/count/fromUser/:id
         *
         * Response: {
                "http": 200,
                "status": "OK",
                "response": {
                }
         * }
         *
         */
        this.getUserGatewaysCount = () => this.router.get('/count/fromUser/:userId', (req, res) => {
            const id = parseInt(req.params.userId);
            this.gatewayLogic.getUserGatewaysCount(id)
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
        /**
         * Get all council related gateways
         * GET /gateway/fromCouncil/list/:id
         *
         * Response: {
                "http": 200,
                "status": "OK",
                "response": {
                }
         * }
         *
         */
        this.getAllCouncilGateways = () => this.router.get('/fromCouncil/list/:id', (req, res) => {
            console.log("getAllCouncilGateways");
            const id = parseInt(req.params.id);
            this.gatewayLogic.getAllCouncilGateways(id)
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
        /**
         * Get all council related gateways with pagination
         * GET /gateway/fromCouncil/list/:councilId/:pageSize/:pageIndex
         *
         * Response: {
                "http": 200,
                "status": "OK",
                "response": {
                }
         * }
         *
         */
        this.getCouncilGatewayPagination = () => this.router.get('/fromCouncil/list/:councilId/:pageSize/:pageIndex', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            const pageSize = parseInt(req.params.pageSize);
            const pageIndex = parseInt(req.params.pageIndex);
            this.gatewayLogic.getCouncilGatewayPagination(councilId, pageSize, pageIndex)
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
        /**
         * Get network server related gateways
         * GET /gateway/fromNS/list/:networkServerId
         *
         * Response: {
                "http": 200,
                "status": "OK",
                "response": {
                }
         * }
         *
         */
        this.getGatewaysFromNetworkServerInDB = () => this.router.get('/fromNS/list/:id', (req, res) => {
            const networkServerId = parseInt(req.params.id);
            this.gatewayLogic.getGatewaysFromNetworkServer(networkServerId)
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
        /**
         * Create a new gateway
         * POST /gateway/
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK"
         * }
         *
         */
        this.storeGateway = () => this.router.post('/', (req, res) => {
            let gateway = new Gateway_1.default();
            gateway.setMac(req.body.mac);
            gateway.setName(req.body.name);
            gateway.setCouncilId(req.body.councilId);
            gateway.setCoords([req.body.latitude, req.body.longitude]);
            gateway.setStatus(req.body.status);
            this.gatewayLogic.storeGateway(gateway)
                .then((response) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                });
            })
                .catch((err) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                });
            });
        });
        /**
         * Links a network server to gateway
         * POST /gateway/NS/link/:gatewayId/:networkServerId
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK"
         * }
         *
         */
        this.addNetworkServerToGateway = () => this.router.post('/NS/link/:gatewayId/:networkServerId', (req, res) => {
            var params = req.params;
            this.gatewayLogic.addNetworkServersToGateway(parseInt(params.gatewayId), parseInt(params.networkServerId))
                .then((response) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                });
            })
                .catch((err) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                });
            });
        });
        /**
         * Edit gateway info
         * PUT /gateway/:id
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
        this.editGateway = () => this.router.put('/:id', (req, res) => {
            const gatewayId = parseInt(req.params.id);
            let gateway = new Gateway_1.default();
            gateway.setId(req.body.id);
            gateway.setMac(req.body.mac);
            gateway.setName(req.body.name);
            gateway.setCouncilId(req.body.councilId);
            gateway.setCoords([req.body.latitude, req.body.longitude]);
            gateway.setStatus(req.body.status);
            this.gatewayLogic.editGateway(gateway)
                .then((response) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                });
            })
                .catch((err) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                });
            });
        });
        /**
         * Remove link between network server and gateway
         * DELETE /gateway/NS/link/:gatewayId/:networkServerId
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {}
         * }
         *
         */
        this.removeNetworkServerFromGateway = () => this.router.delete('/NS/link/:gatewayId/:networkServerId', (req, res) => {
            const gatewayId = parseInt(req.params.gatewayId);
            const networkServerId = parseInt(req.params.networkServerId);
            this.gatewayLogic.removeNetworkServerFromGateway(gatewayId, networkServerId)
                .then((response) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                });
            })
                .catch((err) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                });
            });
        });
        /**
         * Remove a gateway by given id
         * DELETE /gateway/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "response": {}
         * }
         *
         */
        this.removeGateway = () => this.router.delete('/:id', (req, res) => {
            const gatewayId = parseInt(req.params.id);
            this.gatewayLogic.removeGateway(gatewayId)
                .then((response) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                });
            })
                .catch((err) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                });
            });
        });
        this.getGatewayById();
        this.getUserGateways();
        this.getUserGatewaysCount();
        this.getAllCouncilGateways();
        this.getCouncilGatewayPagination();
        this.editGateway();
        this.getGatewaysFromNetworkServerInDB();
        this.storeGateway();
        this.addNetworkServerToGateway();
        this.removeNetworkServerFromGateway();
        this.removeGateway();
    }
}
const sensorRestRouter = new GatewayRestRouter();
exports.default = sensorRestRouter.router;