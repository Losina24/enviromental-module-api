/**
 * Name: MeasureMqttRouter.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the MQTT interactions of the measure feature
 */

import MqttRouter from '../MqttRouter';
import Measure from './Measure';
import MeasureLogic from "./MeasureLogic";

export default class MeasureMqttRouter extends MqttRouter {

    private measureLogic = new MeasureLogic();

    // Constructor
    constructor() {
        super();
        this.connect();
        this.storeMeasure();
    }

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
    public storeMeasure = () => {
        this.suscribe('46701/ambiental/1/#');
        
        // When a message arrives
		this.client.on("message", (topic: any, message: any) => {
            const msg = message.toString();

            let measure = new Measure();
            measure.formatPayload(msg)

            this.measureLogic.storeMeasure(measure)
                .then(() => {
                })
                .catch(() => {

                })
		});
    }
}