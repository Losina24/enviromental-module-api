/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the rest rules of the sensor feature
 */

import { Router, Request, Response } from 'express';
import Utils from "../Utils";
import Council from './Council';
import CouncilLogic from './CouncilLogic';

class CouncilRestRouter {

    private councilLogic = new CouncilLogic();

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getCouncilById();
        this.createCouncil();
        this.editCouncil();
        this.removeCouncil();
        this.getCouncilCount();
        this.getRootCouncilsPagination();
    }

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
    public getCouncilById = () => this.router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.councilLogic.getCouncilById(id)
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
    public getCouncilCount = () => this.router.get('/count/root/:id', (req: Request, res: Response) => {
        this.councilLogic.getCouncilCount()
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
    public getRootCouncilsPagination = () => this.router.get('/pagination/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.councilLogic.getRootCouncilsPagination(pageSize,pageIndex)
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
     * Create a new user
     * POST /users/
     *
     * Response: {
     *  "http": 200,
     *  "status": "OK"
     * }
     *
     */
    public createCouncil = () => this.router.post('/', (req: Request, res: Response) => {

        let council = new Council()

        council.setName(req.body.name)
        council.setAddress(req.body.address)
        council.setPhone(req.body.phoneNumber);
        council.setEmail(req.body.email);
        council.setWeb(req.body.web);
        council.setPostalCode(req.body.postalCode);
        council.setIban(req.body.iban);

        this.councilLogic.createCouncil(council)
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
    public editCouncil = () => this.router.put('/:councilId', (req: Request, res: Response) => {
        let council = new Council()

        council.setId(parseInt(req.params.councilId))
        council.setName(req.body.name)
        council.setAddress(req.body.address)
        council.setPhone(req.body.phoneNumber);
        council.setEmail(req.body.email);
        council.setWeb(req.body.web);
        council.setPostalCode(req.body.postalCode);
        council.setIban(req.body.iban);

        this.councilLogic.editCouncil(council)
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
    public removeCouncil = () => this.router.delete('/:id', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.id);

        this.councilLogic.removeCouncil(councilId)
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

const sensorRestRouter = new CouncilRestRouter();
export default sensorRestRouter.router;
