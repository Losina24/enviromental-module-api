"use strict";
/**
 * Name: Gateway.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Model for sensor feature
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Gateway {
    // Constructor
    constructor() {
    }
    // Getters & Setters //
    /**
     * Gets the ID of the gateway
     * -> getId() -> id: N
     * @returns id: gateway ID
     */
    getId() {
        return this.id;
    }
    /**
     * Sets the id of the gateway
     * id: N -> setId() ->
     * @param value: new gateway id
     */
    setId(value) {
        this.id = value;
    }
    /**
     * Gets the gateway mac
     * -> getMac() -> value: text
     */
    getMac() {
        return this.name;
    }
    /**
     * Sets gateway mac
     * value: text -> setMac() ->
     * @param value: new gateway mac
     */
    setMac(value) {
        this.name = value;
    }
    /**
     * Gets the gateway name
     * -> getName() -> value: text
     */
    getName() {
        return this.name;
    }
    /**
     * Sets gateway name
     * value: text -> setName() ->
     * @param value: new council name
     */
    setName(value) {
        this.name = value;
    }
    /**
     * Gets gateway related council id
     * -> getCouncilId() -> value: text
     */
    getCouncilId() {
        return this.councilId;
    }
    /**
     * Sets gatewy council id
     * value: text -> setWeb() ->
     * @param value: new related web
     */
    setCouncilId(value) {
        this.councilId = value;
    }
    /**
     * Gets the gateway coordinates
     * -> getCoords() -> valueXY: [R, R]
     */
    getCoords() {
        return this.coords;
    }
    /**
     * Sets the gateway coordinates
     * valueXY: [R, R] -> setCoords() ->
     * @param value: new gateway coordinates
     */
    setCoords(value) {
        this.coords = value;
    }
    /**
     * Gets the gateway status
     * -> getStatus() -> value: text
     */
    getStatus() {
        return this.status;
    }
    /**
     * Sets the gateway status
     * value: text -> setStatus() ->
     * @param value: new gateway status
     */
    setStatus(value) {
        this.status = value;
    }
    /**
     * Gets the gateway enviromental devices
     * -> getEnviromentalDevices() -> enviromentalDevices: [EnviromentalDevice]
     */
    getEnviromentalDevices() {
        return this.enviromentalDevices;
    }
    /**
     * Sets the council email
     * enviromentalDevices: [EnviromentalDevice] -> setEnviromentalDevices() ->
     * @param value: sets the gateway enviromental devices list
     */
    setEnviromentalDevices(enviromentalDevices) {
        this.enviromentalDevices = enviromentalDevices;
    }
    /**
     * Gets the gateway network servers
     * -> getName() -> networkServers: [NetworkServer]
     */
    getNetworkServers() {
        return this.networkServers;
    }
    /**
     * Sets the gateway network servers
     * networkServers: [NetworkServer] -> setName() ->
     * @param value: new council postal code
     */
    setNetworkServers(value) {
        this.networkServers = value;
    }
}
exports.default = Gateway;
