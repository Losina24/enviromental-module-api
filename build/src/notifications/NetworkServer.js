"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NetworkServer {
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
    getName() {
        return this.name;
    }
    /**
     * Gets the mac of the enviromental device
     * -> getMac() -> mac: Text
     *
     * @returns mac: Enviromental device's mac
     */
    getMac() {
        return this.mac;
    }
    /**
     * Gets the status of the enviromental device
     * -> getStatus() -> status: boolean
     *
     * @returns status: Enviromental device's status
     */
    getStatus() {
        return this.status;
    }
    /**
     * Gets the gateway id of the enviromental device
     * -> getGatewayId() -> gatewayId: N
     *
     * @returns gatewayId: Enviromental device's gateway ID
     */
    getToken() {
        return this.token;
    }
    /**
     * Gets latitude and longitude of the enviromental device
     * -> getCoords() -> coords: [x:R, y:R]
     *
     * @returns coords: Enviromental device's coordinates
     */
    getProvider() {
        return this.provider;
    }
    /**
     * Gets sensors of the enviromental device
     * -> getSensors() -> sensors: [Sensor]
     *
     * @returns coords: Enviromental device's coordinates
     */
    getUrl() {
        return this.url;
    }
    /**
     * Gets the status of the enviromental device
     * -> getStatus() -> status: boolean
     *
     * @returns status: Enviromental device's status
     */
    getGateways() {
        return this.gateways;
    }
    /**
     * Gets the status of the enviromental device
     * -> getStatus() -> status: boolean
     *
     * @returns status: Enviromental device's status
     */
    getCentralized() {
        return this.centralized;
    }
    /**
     * Gets the status of the enviromental device
     * -> getStatus() -> status: boolean
     *
     * @returns status: Enviromental device's status
     */
    getType() {
        return this.type;
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
    setName(name) {
        this.name = name;
    }
    /**
     * Sets the enviromental device's mac
     * mac: Text -> setMac() ->
     */
    setMac(mac) {
        this.mac = mac;
    }
    /**
     * Sets the enviromental device's gateway ID
     * gatewayId: N -> setGatewayId() ->
     */
    setToken(token) {
        this.token = token;
    }
    /**
     * Sets the enviromental device's coords
     * coords: [x:N, y:N] -> setCoords() ->
     */
    setProvider(provider) {
        this.provider = provider;
    }
    /**
     * Sets the enviromental device's status
     * status: boolean -> setStatus() ->
     */
    setStatus(status) {
        this.status = status;
    }
    /**
     * Add a sensor to the enviromental device
     * sensor:Sensor -> addSensor() ->
     */
    setUrl(url) {
        this.url = url;
    }
    /**
     * Add a sensor to the enviromental device
     * sensor:Sensor -> addSensor() ->
     */
    setGateways(gateways) {
        this.gateways = gateways;
    }
    /**
     * Add a sensor to the enviromental device
     * sensor:Sensor -> addSensor() ->
     */
    setCentralized(val) {
        this.centralized = val;
    }
    /**
     * Add a sensor to the enviromental device
     * sensor:Sensor -> addSensor() ->
     */
    setType(type) {
        this.type = type;
    }
}
exports.default = NetworkServer;
