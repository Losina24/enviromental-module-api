"use strict";
/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class EnviromentalDeviceRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
        /**
         * Get the information about a enviromental device
         * GET /device/:id
         *
         * Response: {
         *  "http": 200,
         *  "status": "OK",
         *  "enviromentalDevice": {
         *      "": xx.xx
         *  }
         * }
         *
         */
        this.getDeviceById = () => this.router.get('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            console.log('id', id);
            res.status(200).send({
                "id": id
            });
            /* usersController.getUserInformation(id)
                .then( response => {
                    res.send(response)
                })
                .catch( err => {
                    res.send(err)
                }) */
        });
        this.getDeviceById();
    }
}
const enviromentalDeviceRestRouter = new EnviromentalDeviceRestRouter();
exports.default = enviromentalDeviceRestRouter.router;
