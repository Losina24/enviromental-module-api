"use strict";
/**
 * Name: Measure.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Model for measures feature
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Measure {
    // Constructor
    constructor() {
    }
    // Methods
    /**
     * Sets the measure's sensor ID
     * sensorId: N -> setSensorId() ->
     */
    setSensorId(sensorId) {
        this.sensorId = sensorId;
    }
    /**
     * Sets the measure's value
     * value: R -> setValue() ->
     */
    setValue(value) {
        this.value = value;
    }
    /**
     * Sets the measure's date
     * date: Date -> setDate() ->
     */
    setDate(date) {
        this.date = date;
    }
    /**
     * Sets the measure's unit
     * unit: Text -> setUnit() ->
     */
    setUnit(unit) {
        this.unit = unit;
    }
    /**
     * Sets the measure's danger
     * danger: Text -> setUnit() ->
     */
    setDanger(value) {
        this.danger = value;
    }
    /**
     * Gets the measure's sensor ID
     * -> getSensorId() -> id: N
     *
     * @returns sensorId: Measure's sensor ID
     */
    getSensorId() {
        return this.sensorId;
    }
    /**
     * Gets the measure's value
     * -> getValue() -> value: R
     *
     * @returns value: Measure's value
     */
    getValue() {
        return this.value;
    }
    /**
     * Gets the measure's date
     * -> getId() -> date: Date
     *
     * @returns date: Measure's date
     */
    getDate() {
        return this.date;
    }
    /**
     * Gets the measure's unit
     * -> getUnit() -> id: N
     *
     * @returns unit: Measure's unit
     */
    getUnit() {
        return this.unit;
    }
    /**
     * Gets the measure's danger
     * -> getUnit() -> id: N
     *
     * @returns
     */
    getDanger() {
        return this.danger;
    }
    /**
     * Set the measurement by payload
     * payload: Text -> formatPayload() ->
     *
     * @param payload
     */
    formatPayload(payload) {
        const formated = JSON.parse(payload);
        this.value = formated.value;
        this.unit = formated.unit;
        this.sensorId = formated.deviceEui;
        this.date = formated.date;
    }
    toObject() {
        return {
            "sensor_id": this.sensorId,
            "value": this.value,
            "unit": this.unit,
            "date": this.date
        };
    }
}
exports.default = Measure;
