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
     * Gets the ID of the user
     * -> getId() -> id: N
     * @returns id: user ID
     */
    getId() {
        return this.id;
    }
    /**
     * Sets the id of the user
     * id: N -> setId() ->
     * @param value: new user id
     */
    setId(value) {
        this.id = value;
    }
    /**
     * Gets the ID of the sensor
     * -> getId() -> id: N
     * @returns id: council ID
     */
    getCouncilId() {
        return this.councilId;
    }
    /**
     * Sets the id of the sensor
     * id: N -> setId() ->
     * @param value: new council id
     */
    setCouncilId(value) {
        this.councilId = value;
    }
    /**
     * Gets the user role id
     * -> getId() -> id: N
     * @returns id: role ID
     */
    getRoleId() {
        return this.roleId;
    }
    /**
     * Sets the id of the user role
     * id: N -> setId() ->
     * @param value: new user role id
     */
    setRoleId(value) {
        this.roleId = value;
    }
    /**
     * Gets the user name
     * -> getName() -> value: text
     */
    getName() {
        return this.name;
    }
    /**
     * Sets user name
     * value: text -> setName() ->
     * @param value: new user name
     */
    setName(value) {
        this.name = value;
    }
    /**
     * Gets user surnames
     * -> getSurnames() -> value: text
     */
    getSurnames() {
        return this.surname;
    }
    /**
     * Sets user surnames
     * value: text -> setSurnames() ->
     * @param value: new user surnames
     */
    setSurnames(value) {
        this.surname = value;
    }
    /**
     * Gets the user address
     * -> getAddress() -> value: text
     */
    getAddress() {
        return this.address;
    }
    /**
     * Sets the user address
     * value: text -> setAddress() ->
     * @param value: new user address
     */
    setAddress(value) {
        this.address = value;
    }
    /**
     * Gets the user phone
     * -> getPhone() -> value: text
     */
    getPhone() {
        return this.phone;
    }
    /**
     * Sets the user phone
     * value: text -> setPhone() ->
     * @param value: new user phone
     */
    setPhone(value) {
        this.phone = value;
    }
    /**
     * Gets the user email
     * -> getEmail() -> value: text
     */
    getEmail() {
        return this.email;
    }
    /**
     * Sets the user email
     * value: text -> setEmail() ->
     * @param value: new user email
     */
    setEmail(value) {
        this.email = value;
    }
    /**
     * Gets the user postal code
     * -> getName() -> value: text
     */
    getPostalCode() {
        return this.postalCode;
    }
    /**
     * Sets the user postal code
     * value: text -> setName() ->
     * @param value: new user postal code
     */
    setPostalCode(value) {
        this.postalCode = value;
    }
    /**
     * Gets the user password
     * -> getPassword() -> value: text
     */
    getPassword() {
        return this.password;
    }
    /**
     * Sets the user password
     * value: text -> setPassword() ->
     * @param value: new user password
     */
    setPassword(value) {
        this.password = value;
    }
}
exports.default = User;
