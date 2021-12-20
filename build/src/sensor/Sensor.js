"use strict";
/**
 * Name: Sensor.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Model for sensor feature
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Sensor {
    // Constructor
    constructor() {
    }
    // Getters & Setters //
    /**
     * Gets the ID of the sensor
     * -> getId() -> id: N
     * @returns id: sensor ID
     */
    getId() {
        return this.id;
    }
    /**
     * Sets the id of the sensor
     * id: N -> setId() ->
     * @param value: new sensor id
     */
    setId(value) {
        this.id = value;
    }
    /**
     * Gets the ID of the device
     * -> getDeviceId() -> id: N
     * @returns id: device ID
     */
    getDeviceId() {
        return this.deviceId;
    }
    /**
     * Sets the id of the device
     * id: N -> setDeviceId() ->
     * @param value: new device id
     */
    setDeviceId(value) {
        this.deviceId = value;
    }
    /**
     * Gets the ID of the sensor
     * -> getDeviceEUI() -> id: N
     * @returns _deviceEUI: device EUI identifier
     */
    getDeviceEUI() {
        return this.deviceEUI;
    }
    /**
     * Sets the id of the sensor
     * value: text -> setDeviceEUI() ->
     * @param value: new device EUI
     */
    setDeviceEUI(value) {
        this.deviceEUI = value;
    }
    /**
     * Gets the ID of the sensor
     * -> getName() -> name: text
     * @returns name: name of the device
     */
    getName() {
        return this.name;
    }
    /**
     * Sets the id of the sensor
     * name: text -> setName() ->
     * @param value: new name for the device
     */
    setName(value) {
        this.name = value;
    }
    /**
     * Gets the ID of the sensor
     * -> getType() -> type: text
     * @returns _type: sensor type
     */
    getType() {
        return this.type;
    }
    /**
     * Sets the type of the sensor
     * id: N -> setId() ->
     * @param value: new sensor type
     */
    setType(value) {
        this.type = value;
    }
    /**
     * Gets the sensor status
     * -> getStatus() -> id: N
     * @returns _status: sensor status
     */
    getStatus() {
        return this.status;
    }
    /**
     * Sets the id of the sensor
     * status: boolean -> setStatus() ->
     * @param value: new status value
     */
    setStatus(value) {
        this.status = value;
    }
}
exports.default = Sensor;
