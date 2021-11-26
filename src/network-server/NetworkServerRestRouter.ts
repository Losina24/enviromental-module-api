/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
 */

import { Router, Request, Response } from 'express';

import Utils from "../utils";
import NetworkServer from './NetworkServer';
import NetworkServerLogic from './NetworkServerLogic';

class NetworkServerRestRouter {

    private networkServerLogic = new NetworkServerLogic(); // FIX: este atributo está mal en el diseño

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getNetworkServerById();
        this.getUserNetworkServersById();
        this.getUserNetworkServersCountById();
        this.createNetworkServer();
        this.editNetworkServer();
        this.removeNetworkServer();
    }

    /**
     * Get the information about a enviromental device
     * GET /device/:id
     * 
     * Response: {
     *  "http": 200,
     *  "status": "OK",
     *  "response": {}
     * }
     * 
     */
    public getNetworkServerById = () => this.router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        this.networkServerLogic.getNetworkServerById(id)
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
     * Get user network servers
     * userId: N -> getUserNetworkServersById() -> networkServers: NetworkServer[]
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    public getUserNetworkServersById = () => this.router.get('/user/list/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        this.networkServerLogic.getUserNetworkServersById(id)
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
     * Get user network servers ( * COUNT * )
     * userId: N -> getUserNetworkServersById() -> networkServers: NetworkServer[]
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    public getUserNetworkServersCountById = () => this.router.get('/count/user/list/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        this.networkServerLogic.getUserNetworkServersCountById(id)
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
     public createNetworkServer = () => this.router.post('/', (req: Request, res: Response) => {
        let networkServer = new NetworkServer();

        networkServer.setMac(req.body.identifier)
        networkServer.setName(req.body.name);
        networkServer.setCentralized(req.body.centralized);
        networkServer.setStatus(req.body.status);
        networkServer.setUrl(req.body.url);
        networkServer.setType(req.body.type);
        networkServer.setToken(req.body.token);

        this.networkServerLogic.createNetworkServer(networkServer)
            .then( response => {
                if(res.status(200)) {
                    // Sending the response
                    res.status(200).send({
                        http: 200,
                        status: 'OK',
                        response: 'Network server created succesfully',
                        lastInsertId: response.insertId
                    })
                } else {
                    // Sending the response
                    res.status(204).send({
                        http: 204,
                        status: 'OK',
                        response: 'There are some problems creating a new network server'
                    })
                }
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
     * Edit network server data
     * PUT /NS/:adminId/:pageSize/:pageIndex
     * 
     * Response: {
     *  "http": 200,
     *  "status": "OK",
     *  "response": {}
     * }
     * 
     */
    public editNetworkServer = () => this.router.put('/:id', (req: Request, res: Response) => {
        let networkServer = new NetworkServer();

        networkServer.setId(parseInt(req.params.id))
        networkServer.setMac(req.body.identifier)
        networkServer.setName(req.body.name);
        networkServer.setCentralized(req.body.centralized);
        networkServer.setStatus(req.body.status);
        networkServer.setUrl(req.body.url);
        networkServer.setType(req.body.type);
        networkServer.setToken(req.body.token);
        networkServer.setProvider(req.body.provider);

        this.networkServerLogic.editNetworkServer(networkServer)
            .then( (response: any) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: "network server updated"
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
     * Remove a network server by given id
     * DELETE /NS/:id
     *
     * Response: {
     *  "http": 200,
     *  "status": "OK",
     *  "response": {}
     * }
     *
     */
    public removeNetworkServer = () => this.router.delete('/:id', (req: Request, res: Response) => {
        const gatewayId = parseInt(req.params.id);

        this.networkServerLogic.removeNetworkServer(gatewayId)
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

const enviromentalDeviceRestRouter = new NetworkServerRestRouter();
export default enviromentalDeviceRestRouter.router;
