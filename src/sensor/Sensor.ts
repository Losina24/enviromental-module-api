/**
 * Name: Sensor.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Model for sensor feature
 */

export default class Sensor {
    
    // Atributes
    private _id: number;
    private _deviceId: number;
    private _deviceEUI: string;
    private _name: string;
    private _type: string;
    private _status: boolean;


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
        return this._id;
    }

    /**
     * Sets the id of the sensor
     * id: N -> setId() ->
     * @param value: new sensor id
     */
    public setId(value: number) {
        this._id = value;
    }

    /**
     * Gets the ID of the device
     * -> getDeviceId() -> id: N
     * @returns id: device ID
     */
    public getDeviceId(): number {
        return this._deviceId;
    }

    /**
     * Sets the id of the device
     * id: N -> setDeviceId() ->
     * @param value: new device id
     */
    public setDeviceId(value: number) {
        this._deviceId = value;
    }

    /**
     * Gets the ID of the sensor
     * -> getDeviceEUI() -> id: N
     * @returns _deviceEUI: device EUI identifier
     */
    public getDeviceEUI(): string {
        return this._deviceEUI;
    }

    /**
     * Sets the id of the sensor
     * value: text -> setDeviceEUI() ->
     * @param value: new device EUI
     */
    public setDeviceEUI(value: string) {
        this._deviceEUI = value;
    }

    /**
     * Gets the ID of the sensor
     * -> getName() -> name: text
     * @returns name: name of the device
     */
    public getName(): string {
        return this._name;
    }

    /**
     * Sets the id of the sensor
     * name: text -> setName() ->
     * @param value: new name for the device
     */
    public setName(value: string) {
        this._name = value;
    }

    /**
     * Gets the ID of the sensor
     * -> getType() -> type: text
     * @returns _type: sensor type
     */
    public getType(): string {
        return this._type;
    }

    /**
     * Sets the type of the sensor
     * id: N -> setId() ->
     * @param value: new sensor type
     */
    public setType(value: string) {
        this._type = value;
    }

    /**
     * Gets the sensor status
     * -> getStatus() -> id: N
     * @returns _status: sensor status
     */
    public getStatus(): boolean {
        return this._status;
    }

    /**
     * Sets the id of the sensor
     * status: boolean -> setStatus() ->
     * @param value: new status value
     */
    public setStatus(value: boolean) {
        this._status = value;
    }
}
