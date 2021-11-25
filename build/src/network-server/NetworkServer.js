"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NetworkServer {
    // Constructor
    constructor() {
    }
    // Getters //
    /**
     * Gets the ID of the network server
     * -> getId() -> id: N
     *
     * @returns id: Network server ID
     */
    getId() {
        return this.id;
    }
    /**
     * Gets the name of the network server
     * -> getName() -> name: Text
     *
     * @returns name: Network server name
     */
    getName() {
        return this.name;
    }
    /**
     * Gets the mac of the network server
     * -> getMac() -> mac: Text
     *
     * @returns mac: Network server mac
     */
    getMac() {
        return this.mac;
    }
    /**
     * Gets the status of the network server
     * -> getStatus() -> status: boolean
     *
     * @returns status: Network server status
     */
    getStatus() {
        return this.status;
    }
    /**
     * Gets the token of the network server
     * -> getToken() -> token: Text
     *
     * @returns
     */
    getToken() {
        return this.token;
    }
    /**
     * Gets provider of the network server
     * -> getProvider() -> provider: Text
     *
     * @returns
     */
    getProvider() {
        return this.provider;
    }
    /**
     * Gets network server url
     * -> getUrl() -> url: Text
     *
     * @returns
     */
    getUrl() {
        return this.url;
    }
    /**
     * Gets the network server gateways
     * -> getGateways() -> gateway: Gateway[]
     *
     * @returns
     */
    getGateways() {
        return this.gateways;
    }
    /**
     * Gets centralized network server value
     * -> getCentralized() -> value: boolean
     *
     * @returns
     */
    getCentralized() {
        return this.centralized;
    }
    /**
     * Gets network server type
     * -> getType() -> type: boolean
     *
     * @returns
     */
    getType() {
        return this.type;
    }
    // Setters //
    /**
     * Sets the id of the network server
     * id: N -> setId() ->
     */
    setId(id) {
        this.id = id;
    }
    /**
     * Sets the network server name
     * name: N -> setName() ->
     */
    setName(name) {
        this.name = name;
    }
    /**
     * Sets the network server mac
     * mac: Text -> setMac() ->
     */
    setMac(mac) {
        this.mac = mac;
    }
    /**
     * Sets the network server token
     * gatewayId: N -> setToken() ->
     */
    setToken(token) {
        this.token = token;
    }
    /**
     * Sets the network server provider
     * provider: Text -> setProvider() ->
     */
    setProvider(provider) {
        this.provider = provider;
    }
    /**
     * Sets the network server status
     * status: boolean -> setStatus() ->
     */
    setStatus(status) {
        this.status = status;
    }
    /**
     * Set network server url
     * url: Text -> setUrl() ->
     */
    setUrl(url) {
        this.url = url;
    }
    /**
     * Set network server gateways
     * gateways: Gateway[] -> setGateways() ->
     */
    setGateways(gateways) {
        this.gateways = gateways;
    }
    /**
     * Set network server centralized value
     * value: booleam -> addSensor() ->
     */
    setCentralized(val) {
        this.centralized = val;
    }
    /**
     * Set network server type
     * type: Text -> setType() ->
     */
    setType(type) {
        this.type = type;
    }
}
exports.default = NetworkServer;
