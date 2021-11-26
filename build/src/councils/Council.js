"use strict";
/**
 * Name: Council.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Model for sensor feature
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Council {
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
     * Gets the council name
     * -> getName() -> value: text
     */
    getName() {
        return this.name;
    }
    /**
     * Sets council name
     * value: text -> setName() ->
     * @param value: new council name
     */
    setName(value) {
        this.name = value;
    }
    /**
     * Gets council related web
     * -> getWeb() -> value: text
     */
    getWeb() {
        return this.web;
    }
    /**
     * Sets council related web
     * value: text -> setWeb() ->
     * @param value: new related web
     */
    setWeb(value) {
        this.web = value;
    }
    /**
     * Gets the council address
     * -> getAddress() -> value: text
     */
    getAddress() {
        return this.address;
    }
    /**
     * Sets the council address
     * value: text -> setAddress() ->
     * @param value: new council address
     */
    setAddress(value) {
        this.address = value;
    }
    /**
     * Gets the council phone
     * -> getPhone() -> value: text
     */
    getPhone() {
        return this.phone;
    }
    /**
     * Sets the council phone
     * value: text -> setPhone() ->
     * @param value: new council phone
     */
    setPhone(value) {
        this.phone = value;
    }
    /**
     * Gets the council email
     * -> getEmail() -> value: text
     */
    getEmail() {
        return this.email;
    }
    /**
     * Sets the council email
     * value: text -> setEmail() ->
     * @param value: new council email
     */
    setEmail(value) {
        this.email = value;
    }
    /**
     * Gets the council postal code
     * -> getName() -> value: text
     */
    getPostalCode() {
        return this.postalCode;
    }
    /**
     * Sets the council postal code
     * value: text -> setName() ->
     * @param value: new council postal code
     */
    setPostalCode(value) {
        this.postalCode = value;
    }
    /**
     * Gets the council IBAN
     * -> getPassword() -> value: text
     */
    getIban() {
        return this.iban;
    }
    /**
     * Sets the council IBAN
     * value: text -> setPassword() ->
     * @param value: new council IBAN
     */
    setIban(value) {
        this.iban = value;
    }
}
exports.default = Council;
