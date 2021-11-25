/**
 * Name: Sensor.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Model for sensor feature
 */

export default class User {
    
    // Atributes
    private id: number;
    private councilId: number;
    // Posible Enum
    private roleId: number;
    private name: string;
    private surname: string;
    private address: string;
    private phone: string;
    private email: string;
    private postalCode: string;
    private password: string;

    // Constructor
    constructor() {

    }

    // Getters & Setters //

    /**
     * Gets the ID of the user
     * -> getId() -> id: N
     * @returns id: user ID
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Sets the id of the user
     * id: N -> setId() ->
     * @param value: new user id
     */
    public setId(value: number) {
        this.id = value;
    }

    /**
     * Gets the ID of the sensor
     * -> getId() -> id: N
     * @returns id: council ID
     */
    public getCouncilId(): number {
        return this.councilId;
    }

    /**
     * Sets the id of the sensor
     * id: N -> setId() ->
     * @param value: new council id
     */
    public setCouncilId(value: number) {
        this.councilId = value;
    }


    /**
     * Gets the user role id
     * -> getId() -> id: N
     * @returns id: role ID
     */
    public getRoleId(): number {
        return this.roleId;
    }

    /**
     * Sets the id of the user role
     * id: N -> setId() ->
     * @param value: new user role id
     */
    public setRoleId(value: number) {
        this.roleId = value;
    }


    /**
     * Gets the user name
     * -> getName() -> value: text
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Sets user name
     * value: text -> setName() ->
     * @param value: new user name
     */
    public setName(value: string) {
        this.name = value;
    }

    /**
     * Gets user surnames
     * -> getSurnames() -> value: text
     */
    public getSurnames(): string {
        return this.surname;
    }

    /**
     * Sets user surnames
     * value: text -> setSurnames() ->
     * @param value: new user surnames
     */
    public setSurnames(value: string) {
        this.surname = value;
    }

    /**
     * Gets the user address
     * -> getAddress() -> value: text
     */
    public getAddress(): string {
        return this.address;
    }

    /**
     * Sets the user address
     * value: text -> setAddress() ->
     * @param value: new user address
     */
    public setAddress(value: string) {
        this.address = value;
    }

    /**
     * Gets the user phone
     * -> getPhone() -> value: text
     */
    public getPhone(): string {
        return this.phone;
    }

    /**
     * Sets the user phone
     * value: text -> setPhone() ->
     * @param value: new user phone
     */
    public setPhone(value: string) {
        this.phone = value;
    }

    /**
     * Gets the user email
     * -> getEmail() -> value: text
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Sets the user email
     * value: text -> setEmail() ->
     * @param value: new user email
     */
    public setEmail(value: string) {
        this.email = value;
    }

    /**
     * Gets the user postal code
     * -> getName() -> value: text
     */
    public getPostalCode(): string {
        return this.postalCode;
    }

    /**
     * Sets the user postal code
     * value: text -> setName() ->
     * @param value: new user postal code
     */
    public setPostalCode(value: string) {
        this.postalCode = value;
    }

    /**
     * Gets the user password
     * -> getPassword() -> value: text
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Sets the user password
     * value: text -> setPassword() ->
     * @param value: new user password
     */
    public setPassword(value: string) {
        this.password = value;
    }

}
