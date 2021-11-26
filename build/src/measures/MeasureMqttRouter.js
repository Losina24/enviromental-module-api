"use strict";
/**
 * Name: MeasureMqttRouter.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the MQTT interactions of the measure feature
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MqttRouter_1 = __importDefault(require("../MqttRouter"));
const Measure_1 = __importDefault(require("./Measure"));
const MeasureLogic_1 = __importDefault(require("./MeasureLogic"));
class MeasureMqttRouter extends MqttRouter_1.default {
    // Constructor
    constructor() {
        super();
        this.measureLogic = new MeasureLogic_1.default();
        /**
         * Save a new measure
         * GET postalcode/ambiental/1/#
         *
         * Body: {
         *  "deviceEui": 1,
         *  "value": 10.32,
         *  "unit": "ppm"
         *  "type": "CO2"
         * }
         *
         */
        this.storeMeasure = () => {
            this.suscribe('46701/#');
            console.log('empieza');
            // When a message arrives
            this.client.on("message", (topic, message) => {
                const msg = message.toString();
                console.log(message);
                let measure = new Measure_1.default();
                measure.formatPayload(msg);
                this.measureLogic.storeMeasure(measure)
                    .then(() => {
                })
                    .catch(() => {
                });
            });
        };
        this.connect();
        this.storeMeasure();
    }
}
exports.default = MeasureMqttRouter;
