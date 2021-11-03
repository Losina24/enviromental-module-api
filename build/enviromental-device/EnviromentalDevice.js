"use strict";
/**
 * Name: EnviromentaDevice.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Model for enviromental device feature
 */
Object.defineProperty(exports, "__esModule", { value: true });
class EnviromentalDevice {
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
     * Gets the gateway id of the enviromental device
     * -> getGatewayId() -> gatewayId: N
     *
     * @returns gatewayId: Enviromental device's gateway ID
     */
    getGatewayId() {
        return this.gatewayId;
    }
    /**
     * Gets latitude and longitude of the enviromental device
     * -> getCoords() -> coords: [x:R, y:R]
     *
     * @returns coords: Enviromental device's coordinates
     */
    getCoords() {
        return this.coords;
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
    setGatewayId(gatewayId) {
        this.gatewayId = gatewayId;
    }
    /**
     * Sets the enviromental device's coords
     * coords: [x:N, y:N] -> setCoords() ->
     */
    setCoords(coords) {
        this.coords = coords;
    }
    /**
     * Sets the enviromental device's status
     * status: boolean -> setStatus() ->
     */
    setStatus(status) {
        this.status = status;
    }
}
exports.default = EnviromentalDevice;
