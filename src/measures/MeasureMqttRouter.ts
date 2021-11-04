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

    // Methods
    public storeMeasure = () => {

        this.suscribe('46701/ambiental/1/#');
        
        // When a message arrives
		this.client.on("message", (topic: any, message: any) => {
            const msg = message.toString();
			console.log('Payload', msg);

            let measure = new Measure();
            measure.formatPayload(msg)
            console.log('Measure', measure);
            
            this.measureLogic.storeMeasure(measure)
		});
    }
}