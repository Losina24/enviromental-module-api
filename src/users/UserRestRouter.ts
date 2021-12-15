/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the rest rules of the sensor feature
 */

import { Router, Request, Response } from 'express';
import Utils from "../Utils";
import User from './User';
import UserLogic from './UserLogic';

class UserRestRouter {

    private userLogic = new UserLogic();

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getUserById();
        this.getCouncilUsers();
        this.getCouncilUsersCount();
        this.getAllUsersCount();
        this.createUser();
        this.editUser();
        this.removeUser();
        this.login();
        this.getAllUsersPaginated();
    }

    /**
     * Get user information by given id
     * GET /users/:id
     *
     * Response: {
            "http": 200,
            "status": "OK",
            "response": {
            }
     * }
     *
     */
    public getCouncilUsersCount = () => this.router.get('/count/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);
        this.userLogic.getCouncilUsersCount(councilId)
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
     * Get all users paginated
     * GET /users/:id
     *
     * Response: {
            "http": 200,
            "status": "OK",
            "response": {
            }
     * }
     *
     */
    public getAllUsersPaginated = () => this.router.get('/root/:pageSize/:pageIndex', (req: Request, res: Response) => {
        const pageSize = parseInt(req.params.pageSize);
        const pageIndex = parseInt(req.params.pageIndex);

        this.userLogic.getAllUsersPaginated(pageSize, pageIndex)
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
* GET /users/:id
*
* Response: {
    "http": 200,
    "status": "OK",
    "response": {
    }
* }
*
*/
    public getAllUsersCount = () => this.router.get('/count/root/:id', (req: Request, res: Response) => {
        this.userLogic.getAllUsersCount()
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
     * Login check
     * POST /users/login
     *
     Response: {
        "http": 200,
        "status": "OK",
        "response": {
            "userId": 1,
            "name": "root",
            "role": "root",
            "councilId": 1
        }
     }
     *
     */
    public login = () => this.router.post('/login', (req: Request, res: Response) => {
        var bodyParams = req.body
        this.userLogic.login(bodyParams.email, bodyParams.password)
            .then(response => {
                console.log(response)
                if (response) {
                    res.status(200).send({
                        http: 200,
                        status: 'OK',
                        response: response
                    })
                } else {
                    res.status(204).send({
                        http: 204,
                        status: 'OK',
                        response: response
                    })
                }
            })
            .catch(err => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

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
    public getUserById = () => this.router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.userLogic.getUserById(id)
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

    /**
     * Get all users from a council
     * GET /users/council/:userId
     *
     * Response: {
            "http": 200,
            "status": "OK",
            "response": [{
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
            }]
     * }
     *
     */
    public getCouncilUsers = () => this.router.get('/council/:councilId', (req: Request, res: Response) => {
        const councilId = parseInt(req.params.councilId);

        this.userLogic.getCouncilUsers(councilId)
            .then(response => {
                // Sending the response
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
    public createUser = () => this.router.post('/', (req: Request, res: Response) => {

        let user = new User()

        user.setId(req.body.id)
        user.setRoleId(req.body.roleId)
        user.setCouncilId(req.body.councilId)
        user.setName(req.body.name);
        user.setSurnames(req.body.surnames);
        user.setPassword(req.body.password);
        user.setAddress(req.body.address);
        user.setPhone(req.body.phoneNumber);
        user.setEmail(req.body.email);
        user.setPostalCode(req.body.postalCode);

        this.userLogic.createUser(user)
            .then((response: any) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch((err: any) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
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
    public editUser = () => this.router.put('/', (req: Request, res: Response) => {

        let user = new User()

        user.setId(req.body.id)
        user.setRoleId(req.body.roleId)
        user.setCouncilId(req.body.councilId)
        user.setName(req.body.name);
        user.setSurnames(req.body.surnames);
        user.setPassword(req.body.password);
        user.setAddress(req.body.address);
        user.setPhone(req.body.phoneNumber);
        user.setEmail(req.body.email);
        user.setPostalCode(req.body.postalCode);

        this.userLogic.editUser(user)
            .then((response: any) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch((err: any) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
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
    public removeUser = () => this.router.delete('/:id', (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);

        this.userLogic.removeUser(userId)
            .then((response: any) => {
                // Sending the response
                res.status(200).send({
                    http: 200,
                    status: 'OK',
                    response: response
                })
            })
            .catch((err: any) => {
                res.status(401).send({
                    http: 401,
                    status: 'Error',
                    error: err
                })
            })
    })

}

const sensorRestRouter = new UserRestRouter();
export default sensorRestRouter.router;
