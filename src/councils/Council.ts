/**
 * Name: Sensor.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Model for sensor feature
 */

export default class Council {
    
    // Atributes
    private id: number;
    private name: string
    private address: string;
    private phone: string;
    private email: string;
    private web: string;
    private postalCode: string;
    private iban: string;

    // Constructor
    constructor() {

    }

    // Getters & Setters //

    /**
     * Gets the ID of the sensor
     * -> getId() -> id: N
     * @returns id: sensor ID
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Sets the id of the sensor
     * id: N -> setId() ->
     * @param value: new sensor id
     */
    public setId(value: number) {
        this.id = value;
    }


    /**
     * Gets the council name
     * -> getName() -> value: text
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Sets council name
     * value: text -> setName() ->
     * @param value: new council name
     */
    public setName(value: string) {
        this.name = value;
    }

    /**
     * Gets council related web
     * -> getWeb() -> value: text
     */
    public getWeb(): string {
        return this.web;
    }

    /**
     * Sets council related web
     * value: text -> setWeb() ->
     * @param value: new related web
     */
    public setWeb(value: string) {
        this.web = value;
    }

    /**
     * Gets the council address
     * -> getAddress() -> value: text
     */
    public getAddress(): string {
        return this.address;
    }

    /**
     * Sets the council address
     * value: text -> setAddress() ->
     * @param value: new council address
     */
    public setAddress(value: string) {
        this.address = value;
    }

    /**
     * Gets the council phone
     * -> getPhone() -> value: text
     */
    public getPhone(): string {
        return this.phone;
    }

    /**
     * Sets the council phone
     * value: text -> setPhone() ->
     * @param value: new council phone
     */
    public setPhone(value: string) {
        this.phone = value;
    }

    /**
     * Gets the council email
     * -> getEmail() -> value: text
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Sets the council email
     * value: text -> setEmail() ->
     * @param value: new council email
     */
    public setEmail(value: string) {
        this.email = value;
    }

    /**
     * Gets the council postal code
     * -> getName() -> value: text
     */
    public getPostalCode(): string {
        return this.postalCode;
    }

    /**
     * Sets the council postal code
     * value: text -> setName() ->
     * @param value: new council postal code
     */
    public setPostalCode(value: string) {
        this.postalCode = value;
    }

    /**
     * Gets the council IBAN
     * -> getPassword() -> value: text
     */
    public getIban(): string {
        return this.iban;
    }

    /**
     * Sets the council IBAN
     * value: text -> setPassword() ->
     * @param value: new council IBAN
     */
    public setIban(value: string) {
        this.iban = value;
    }

}
