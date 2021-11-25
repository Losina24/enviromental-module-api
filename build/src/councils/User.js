"use strict";
/**
 * Name: Sensor.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Model for sensor feature
 */
Object.defineProperty(exports, "__esModule", { value: true });
class User {
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
        return this._id;
    }
    /**
     * Sets the id of the sensor
     * id: N -> setId() ->
     * @param value: new sensor id
     */
    setId(value) {
        this._id = value;
    }
    /**
     * Gets the ID of the sensor
     * -> getId() -> id: N
     * @returns id: sensor ID
     */
    getCouncilId() {
        return this._councilId;
    }
    /**
     * Sets the id of the sensor
     * id: N -> setId() ->
     * @param value: new sensor id
     */
    setCouncilId(value) {
        this._councilId = value;
    }
    /**
     * Gets the ID of the sensor
     * -> getId() -> id: N
     * @returns id: sensor ID
     */
    getRoleId() {
        return this._roleId;
    }
    /**
     * Sets the id of the sensor
     * id: N -> setId() ->
     * @param value: new sensor id
     */
    setRoleId(value) {
        this._roleId = value;
    }
    /**
     * Gets the user name
     * -> getName() -> value: text
     */
    getName() {
        return this._name;
    }
    /**
     * Sets user name
     * value: text -> setName() ->
     * @param value: new user name
     */
    setName(value) {
        this._name = value;
    }
    /**
     * Gets user surnames
     * -> getSurnames() -> value: text
     */
    getSurnames() {
        return this._surname;
    }
    /**
     * Sets user surnames
     * value: text -> setSurnames() ->
     * @param value: new user surnames
     */
    setSurnames(value) {
        this._surname = value;
    }
    /**
     * Gets the user address
     * -> getAddress() -> value: text
     */
    getAddress() {
        return this._address;
    }
    /**
     * Sets the user address
     * value: text -> setAddress() ->
     * @param value: new user address
     */
    setAddress(value) {
        this._address = value;
    }
    /**
     * Gets the user phone
     * -> getPhone() -> value: text
     */
    getPhone() {
        return this._phone;
    }
    /**
     * Sets the user phone
     * value: text -> setPhone() ->
     * @param value: new user phone
     */
    setPhone(value) {
        this._phone = value;
    }
    /**
     * Gets the user email
     * -> getEmail() -> value: text
     */
    getEmail() {
        return this._email;
    }
    /**
     * Sets the user email
     * value: text -> setEmail() ->
     * @param value: new user email
     */
    setEmail(value) {
        this._email = value;
    }
    /**
     * Gets the user postal code
     * -> getName() -> value: text
     */
    getPostalCode() {
        return this._postalCode;
    }
    /**
     * Sets the user postal code
     * value: text -> setName() ->
     * @param value: new user postal code
     */
    setPostalCode(value) {
        this._postalCode = value;
    }
    /**
     * Gets the user password
     * -> getPassword() -> value: text
     */
    getPassword() {
        return this._password;
    }
    /**
     * Sets the user password
     * value: text -> setPassword() ->
     * @param value: new user password
     */
    setPassword(value) {
        this._password = value;
    }
}
exports.default = User;
