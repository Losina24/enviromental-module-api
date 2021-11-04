/**
 * Name: MqttRouter.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Parent class that handles the mqtt routes
 */

const mqtt = require("mqtt");

export default class MqttRouter {
	
    // Atributes
    protected client: any = null;
	protected host: string = "mqtt://broker.hivemq.com";
    protected port: number = 8000;
	protected username: string = "GTI3A-M2";
	protected password: string = "gti3am2";

    // Constructor
	constructor() {
	}

    /**
     * Connect with the mqtt server
     * -> connect() ->
     */
	protected connect() {
		// Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
		this.client = mqtt.connect(this.host, {
			username: this.username,
			password: this.password,
		});

		// Mqtt error calback
		this.client.on("error", (err: any) => {
			console.log(err);
			this.client.end();
		});

		// Connection callback
		this.client.on("connect", () => {
			console.log(`Server (MQTT) connected.`);
		});
	}

    /**
     * Suscribe and listen a topic
     * topic: Text -> suscribe() ->
     * 
     * @param topic 
     */
	protected suscribe(topic: string) {
		// Mqtt subscriptions
		this.client.subscribe(topic, { qos: 0 });
	}

    /**
     * Sends messages to the specified topic
     * topic: Text, message: Text -> publish() -> 
     * 
     * @param topic 
     * @param message 
     */
	protected publish(topic: string, message: string) {
        // Sends a mqtt message to topic
		this.client.publish(topic, message);
	}

    /**
     * Close the connection with the mqtt server
     * -> close() ->
     */
    protected close() {
        this.client.on("close", () => {
			console.log(`mqtt client disconnected`);
		});
    }
}
