/**
 * Name: EnviromentaDevice.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Model for enviromental device feature
 */
import Gateway from "../gateways/Gateway";
import Sensor from "../sensor/Sensor";

export default class SensorNotification {

    // Atributes
    private id: number;
    private sensorId: number;
    private body: string;
    private subject: string;
    private magnitude: string;

    // Constructor
    constructor() {

    }

    // Getters //

    /**
     * Gets the ID of the notification
     * -> getId() -> id: N
     *
     * @returns
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Gets the name of the notification
     * -> getSensorId() -> sensorId: N
     *
     * @returns
     */
    public getSensorId(): number {
        return this.sensorId;
    }

    /**
     * Gets the notification body
     * -> getBody() -> body: Text
     *
     * @returns
     */
    public getBody(): string {
        return this.body;
    }

    /**
     * Gets the notification subject
     * -> getSubject() -> subject: Text
     *
     * @returns
     */
    public getSubject(): string {
        return this.subject;
    }

    /**
     * Gets the magnitude (red, green, yellow)
     * -> getMagnitude() -> magnitude: Text
     *
     * @returns
     */
    public getMagnitude(): string {
        return this.magnitude;
    }

    // Setters //

    /**
     * Sets the id of the notification
     * id: N -> setId() ->
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Sets the notification sensor id
     * name: N -> setName() ->
     */
    public setSensorId(sensorId: number): void {
        this.sensorId = sensorId;
    }

    /**
     * Sets the notification body
     * body: Text -> setBody() ->
     */
    public setBody(body: string): void {
        this.body = body;
    }

    /**
     * Sets the notification subject
     * subject: Text -> setSubject() ->
     */
    public setSubject(subject: string): void {
        this.subject = subject;
    }

    /**
     * Sets the notification magnitude (red, green, yellow)
     * magnitude: Text -> setMagnitude() ->
     */
    public setMagnitude(magnitude: string): void {
        this.magnitude = magnitude;
    }

}
