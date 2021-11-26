/**
 * Name: EnviromentaDevice.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Model for enviromental device feature
 */
import Sensor from "../sensor/Sensor";

export default class EnviromentalDevice {
    
    // Atributes
    private id: number;
    private mac: string;
    private name: string;
    private gatewayId: number;
    private coords: [number, number];
    private sensors: [Sensor];
    private status: boolean;

    // Constructor
    constructor() {

    }

    // Getters //

    /**
     * Gets the ID of the enviromental device 
     * -> getId() -> id: N
     * 
     * @returns id: Enviromental device's ID
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Gets the name of the enviromental device 
     * -> getName() -> name: Text
     * 
     * @returns name: Enviromental device's name
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Gets the mac of the enviromental device 
     * -> getMac() -> mac: Text
     * 
     * @returns mac: Enviromental device's mac
     */
    public getDeviceEUI(): string {
        return this.mac;
    }

    /**
     * Gets the gateway id of the enviromental device 
     * -> getGatewayId() -> gatewayId: N
     * 
     * @returns gatewayId: Enviromental device's gateway ID
     */
    public getGatewayId(): number {
        return this.gatewayId;
    }
    
    /**
     * Gets latitude and longitude of the enviromental device 
     * -> getCoords() -> coords: [x:R, y:R]
     * 
     * @returns coords: Enviromental device's coordinates
     */
    public getCoords(): {latitude: number, longitude: number} {
        return {
            latitude: this.coords[0],
            longitude: this.coords[1]
        };
    }

    /**
     * Gets sensors of the enviromental device 
     * -> getSensors() -> sensors: [Sensor]
     * 
     * @returns coords: Enviromental device's coordinates
     */
    public getSensors(): [Sensor] {
        return this.sensors;
    } 

    /**
     * Gets the status of the enviromental device 
     * -> getStatus() -> status: boolean
     * 
     * @returns status: Enviromental device's status
     */
    public getStatus(): boolean {
        return this.status;
    }

    // Setters //

    /**
     * Sets the id of the enviromental device
     * id: N -> setId() ->
     */
    public setId( id: number ): void {
        this.id = id;
    }

    /**
     * Sets the enviromental device's name
     * name: N -> setName() ->
     */
    public setName( name: string ): void {
        this.name = name;
    }

    /**
     * Sets the enviromental device's mac
     * mac: Text -> setMac() ->
     */
    public setDeviceEUI( mac: string ): void {
        this.mac = mac;
    }

    /**
     * Sets the enviromental device's gateway ID
     * gatewayId: N -> setGatewayId() ->
     */
    public setGatewayId( gatewayId: number ): void {
        this.gatewayId = gatewayId;
    }

    /**
     * Sets the enviromental device's coords
     * coords: [x:N, y:N] -> setCoords() ->
     */
    public setCoords( coords: [number, number] ): void {
        this.coords = coords;
    }

    /**
     * Sets the enviromental device's status
     * status: boolean -> setStatus() ->
     */
    public setStatus( status: boolean ): void {
        this.status = status;
    }

    /**
     * Add a sensor to the enviromental device
     * sensor:Sensor -> addSensor() ->
     */
    public addSensor( sensor: Sensor | Sensor[] ): void {
        //@ts-ignore
        this.sensors.push(sensor);
    }

    public toObject(): object {
        return {
            id: this.id,
			name: this.name,
			mac: this.mac,
			gatewayId: this.gatewayId,
			sensors: this.sensors,
			coords: {
                latitude: this.coords[0],
                longitude: this.coords[1]
            },
			status: this.status,
        }
    }
}