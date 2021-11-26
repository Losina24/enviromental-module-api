/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the rest rules of the sensor feature
 */

import { Router, Request, Response } from 'express';
import EnviromentalDevice from '../enviromental-device/EnviromentalDevice';
import Utils from "../utils";
import Gateway from './Gateway';
import GatewayLogic from './GatewayLogic';

class GatewayRestRouter {
    // falta put gateway
    private gatewayLogic = new GatewayLogic();

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getGatewayById();
        this.getAllCouncilGateways();
        this.getAllGateways();
        this.getCouncilGatewayPagination();
        this.editGateway()
        this.getGatewaysFromNetworkServerInDB();
        this.storeGateway();
        this.addNetworkServerToGateway();
        this.removeNetworkServerFromGateway();
        this.removeGateway();
    }

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
    public getGatewayById = () => this.router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.gatewayLogic.getGatewayById(id)
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
    public getAllCouncilGateways = () => this.router.get('/fromCouncil/list/:id', (req: Request, res: Response) => {
        console.log("getAllCouncilGateways")
        const id = parseInt(req.params.id);
        this.gatewayLogic.getAllCouncilGateways(id)
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

    public getAllGateways = () => this.router.get('/', (req: Request, res: Response) => {
        this.gatewayLogic.getAllGateways()
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
    public getCouncilGatewayPagination = () => this.router.get('/fromCouncil/list/:councilId/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.gatewayLogic.getCouncilGatewayPagination(councilId,pageSize,pageIndex)
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
    public getGatewaysFromNetworkServerInDB = () => this.router.get('/fromNS/list/:id', (req: Request, res: Response) => {
        const networkServerId = parseInt(req.params.id);
        this.gatewayLogic.getGatewaysFromNetworkServer(networkServerId)
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
     * Create a new gateway
     * POST /gateway/
     *
     * Response: {
     *  "http": 200,
     *  "status": "OK"
     * }
     *
     */
    public storeGateway = () => this.router.post('/', (req: Request, res: Response) => {
        let gateway = new Gateway()

        gateway.setMac(req.body.mac)
        gateway.setName(req.body.name)
        gateway.setCouncilId(req.body.councilId);
        gateway.setCoords([req.body.latitude,req.body.longitude]);
        gateway.setStatus(req.body.status);

        this.gatewayLogic.storeGateway(gateway)
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
    public addNetworkServerToGateway = () => this.router.post('/NS/link/:gatewayId/:networkServerId', (req: Request, res: Response) => {
        var params = req.params
        this.gatewayLogic.addNetworkServersToGateway(parseInt(params.gatewayId),parseInt(params.networkServerId))
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
    public editGateway = () => this.router.put('/:id', (req: Request, res: Response) => {
        const gatewayId = parseInt(req.params.id);
        let gateway = new Gateway()

        gateway.setId(req.body.id)
        gateway.setMac(req.body.mac)
        gateway.setName(req.body.name)
        gateway.setCouncilId(req.body.councilId);
        gateway.setCoords([req.body.latitude,req.body.longitude]);
        gateway.setStatus(req.body.status);

        this.gatewayLogic.editGateway(gateway)
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
    public removeNetworkServerFromGateway = () => this.router.delete('/NS/link/:gatewayId/:networkServerId', (req: Request, res: Response) => {
        const gatewayId = parseInt(req.params.gatewayId);
        const networkServerId = parseInt(req.params.networkServerId);

        this.gatewayLogic.removeNetworkServerFromGateway(gatewayId,networkServerId)
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
    public removeGateway = () => this.router.delete('/:id', (req: Request, res: Response) => {
        const gatewayId = parseInt(req.params.id);

        this.gatewayLogic.removeGateway(gatewayId)
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

const sensorRestRouter = new GatewayRestRouter();
export default sensorRestRouter.router;
