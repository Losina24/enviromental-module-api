/**
 * Name: Measure.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Model for measures feature
 */

export default class Measure {
    
    // Atributes
    private sensorId: number;
    private value: number;
    private date: string;
    private unit: string;

    // Constructor
    constructor(){
    }

    // Methods

    /**
     * Sets the measure's sensor ID
     * sensorId: N -> setSensorId() ->
     */
    public setSensorId( sensorId: number ): void {
        this.sensorId = sensorId;
    }

    /**
     * Sets the measure's value
     * value: R -> setValue() ->
     */
    public setValue( value: number ): void {
        this.value = value;
    }

    /**
     * Sets the measure's date
     * date: Date -> setDate() ->
     */
    public setDate( date: string ): void {
        this.date = date;
    }

    /**
     * Sets the measure's unit
     * unit: Text -> setUnit() ->
     */
    public setUnit( unit: string ): void {
        this.unit = unit;
    }

    /**
     * Gets the measure's sensor ID
     * -> getSensorId() -> id: N
     * 
     * @returns sensorId: Measure's sensor ID
     */
    public getSensorId(): number {
        return this.sensorId;
    }

    /**
     * Gets the measure's value 
     * -> getValue() -> value: R
     * 
     * @returns value: Measure's value
     */
    public getValue(): number {
        return this.value;
    }

    /**
     * Gets the measure's date
     * -> getId() -> date: Date
     * 
     * @returns date: Measure's date
     */
    public getDate(): string {
        return this.date;
    }

    /**
     * Gets the measure's unit
     * -> getUnit() -> id: N
     * 
     * @returns unit: Measure's unit
     */
    public getUnit(): string {
        return this.unit;
    }

    /**
     * Set the measurement by payload
     * payload: Text -> formatPayload() ->
     * 
     * @param payload 
     */
    public formatPayload( payload: string ): void {
        const formated = JSON.parse(payload);
        this.value = formated.value;
        this.unit = formated.unit;
        this.sensorId = formated.deviceEui;
        this.date = formated.date;
    }
    
    public toObject(): object {
        return {
            "sensor_id": this.sensorId,
            "value": this.value,
            "unit": this.unit,
            "date": this.date
        }
    }
 }
