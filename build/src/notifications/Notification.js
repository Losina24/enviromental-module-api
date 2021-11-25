"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Notification {
    // Constructor
    constructor() {
    }
    // Getters //
    /**
     * Gets the ID of the enviromental device
     * -> getId() -> id: N
     *
     * @returns id: Enviromental device's ID
     */
    getId() {
        return this.id;
    }
    /**
     * Gets the name of the enviromental device
     * -> getName() -> name: Text
     *
     * @returns name: Enviromental device's name
     */
    getSensorId() {
        return this.sensorId;
    }
    /**
     * Gets the mac of the enviromental device
     * -> getMac() -> mac: Text
     *
     * @returns mac: Enviromental device's mac
     */
    getBody() {
        return this.body;
    }
    /**
     * Gets the status of the enviromental device
     * -> getStatus() -> status: boolean
     *
     * @returns status: Enviromental device's status
     */
    getSubject() {
        return this.subject;
    }
    /**
     * Gets the gateway id of the enviromental device
     * -> getGatewayId() -> gatewayId: N
     *
     * @returns gatewayId: Enviromental device's gateway ID
     */
    getMagnitude() {
        return this.magnitude;
    }
    // Setters //
    /**
     * Sets the id of the enviromental device
     * id: N -> setId() ->
     */
    setId(id) {
        this.id = id;
    }
    /**
     * Sets the enviromental device's name
     * name: N -> setName() ->
     */
    setSensorId(sensorId) {
        this.sensorId = sensorId;
    }
    /**
     * Sets the enviromental device's mac
     * mac: Text -> setMac() ->
     */
    setBody(body) {
        this.body = body;
    }
    /**
     * Sets the enviromental device's gateway ID
     * gatewayId: N -> setGatewayId() ->
     */
    setSubject(subject) {
        this.subject = subject;
    }
    /**
     * Sets the enviromental device's coords
     * coords: [x:N, y:N] -> setCoords() ->
     */
    setMagnitude(magnitude) {
        this.magnitude = magnitude;
    }
}
exports.default = Notification;
