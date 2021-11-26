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
const User_1 = __importDefault(require("./User"));
const UserLogic_1 = __importDefault(require("./UserLogic"));
class UserRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.userLogic = new UserLogic_1.default();
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
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
        this.login = () => this.router.post('/login', (req, res) => {
            var bodyParams = req.body;
            this.userLogic.login(bodyParams.email, bodyParams.password)
                .then(response => {
                console.log(response);
                if (response) {
                    res.status(200).send({
                        http: 200,
                        status: 'OK',
                        response: response
                    });
                }
                else {
                    res.status(204).send({
                        http: 204,
                        status: 'OK',
                        response: response
                    });
                }
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
        this.getUserById = () => this.router.get('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            this.userLogic.getUserById(id)
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
        this.getCouncilUsers = () => this.router.get('/council/:councilId', (req, res) => {
            const councilId = parseInt(req.params.councilId);
            this.userLogic.getCouncilUsers(councilId)
                .then(response => {
                // Sending the response
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
        this.getAllUsers = () => this.router.get('/', (req, res) => {
            this.userLogic.getAllUsers()
                .then(response => {
                // Sending the response
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
         * Create a new user
         * POST /users/
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK"
         * }
         *
         */
        this.createUser = () => this.router.post('/', (req, res) => {
            let user = new User_1.default();
            user.setId(req.body.id);
            user.setRoleId(req.body.roleId);
            user.setCouncilId(req.body.councilId);
            user.setName(req.body.name);
            user.setSurnames(req.body.surnames);
            user.setPassword(req.body.password);
            user.setAddress(req.body.address);
            user.setPhone(req.body.phoneNumber);
            user.setEmail(req.body.email);
            user.setPostalCode(req.body.postalCode);
            this.userLogic.createUser(user)
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
        this.editUser = () => this.router.put('/', (req, res) => {
            let user = new User_1.default();
            user.setId(req.body.id);
            user.setRoleId(req.body.roleId);
            user.setCouncilId(req.body.councilId);
            user.setName(req.body.name);
            user.setSurnames(req.body.surnames);
            user.setPassword(req.body.password);
            user.setAddress(req.body.address);
            user.setPhone(req.body.phoneNumber);
            user.setEmail(req.body.email);
            user.setPostalCode(req.body.postalCode);
            this.userLogic.editUser(user)
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
        this.removeUser = () => this.router.delete('/:id', (req, res) => {
            const userId = parseInt(req.params.id);
            this.userLogic.removeUser(userId)
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
        this.getUserById();
        this.getAllUsers();
        this.getCouncilUsers();
        this.createUser();
        this.editUser();
        this.removeUser();
        this.login();
    }
}
const sensorRestRouter = new UserRestRouter();
exports.default = sensorRestRouter.router;
