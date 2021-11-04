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
    private date: Date;
    private type: string;
    private unit: string;

    // Constructor
    constructor(){
    }

    // Methods
    public setSensorId( sensorId: number ): void {
        this.sensorId = sensorId;
    }

    public setValue( value: number ): void {
        this.value = value;
    }

    public setDate( date: Date ): void {
        this.date = date;
    }

    public setType( type: string ): void {
        this.type = type;
    }

    public setUnit( unit: string ): void {
        this.unit = unit;
    }

    public getSensorId(): number {
        return this.sensorId;
    }

    public getValue(): number {
        return this.value;
    }

    public getDate(): Date {
        return this.date;
    }

    public getType(): string {
        return this.type;
    }

    public getUnit(): string {
        return this.unit;
    }

    public formatPayload( payload: string ) {
        const formated = JSON.parse(payload);
        this.value = formated.value;
        this.type = formated.type;
        this.unit = formated.unit;
        this.sensorId = formated.deviceEui;
        this.date = new Date();
    } 
 }
