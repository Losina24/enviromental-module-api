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
const MeasureLogic_1 = __importDefault(require("./MeasureLogic"));
class MeasureRestRouter {
    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.measureLogic = new MeasureLogic_1.default(); // FIX: este atributo está mal en el diseño
        // This is Rest entry point that the express server uses.
        this.router = (0, express_1.Router)();
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
    }
}
const measureRestRouter = new MeasureRestRouter();
exports.default = measureRestRouter.router;
