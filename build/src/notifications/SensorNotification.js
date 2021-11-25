"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SensorNotification {
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
    getId() {
        return this.id;
    }
    /**
     * Gets the name of the notification
     * -> getSensorId() -> sensorId: N
     *
     * @returns
     */
    getSensorId() {
        return this.sensorId;
    }
    /**
     * Gets the notification body
     * -> getBody() -> body: Text
     *
     * @returns
     */
    getBody() {
        return this.body;
    }
    /**
     * Gets the notification subject
     * -> getSubject() -> subject: Text
     *
     * @returns
     */
    getSubject() {
        return this.subject;
    }
    /**
     * Gets the magnitude (red, green, yellow)
     * -> getMagnitude() -> magnitude: Text
     *
     * @returns
     */
    getMagnitude() {
        return this.magnitude;
    }
    // Setters //
    /**
     * Sets the id of the notification
     * id: N -> setId() ->
     */
    setId(id) {
        this.id = id;
    }
    /**
     * Sets the notification sensor id
     * name: N -> setName() ->
     */
    setSensorId(sensorId) {
        this.sensorId = sensorId;
    }
    /**
     * Sets the notification body
     * body: Text -> setBody() ->
     */
    setBody(body) {
        this.body = body;
    }
    /**
     * Sets the notification subject
     * subject: Text -> setSubject() ->
     */
    setSubject(subject) {
        this.subject = subject;
    }
    /**
     * Sets the notification magnitude (red, green, yellow)
     * magnitude: Text -> setMagnitude() ->
     */
    setMagnitude(magnitude) {
        this.magnitude = magnitude;
    }
}
exports.default = SensorNotification;
