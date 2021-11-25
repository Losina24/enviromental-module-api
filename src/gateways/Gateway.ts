/**
 * Name: Sensor.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Model for sensor feature
 */

import EnviromentalDevice from "../enviromental-device/EnviromentalDevice";

export default class Gateway {
    
    // Atributes
    private id: number;
    private mac: string
    private name: string;
    private councilId: string;
    private coords: number[];
    private status: boolean;
    private enviromentalDevices: EnviromentalDevice[];
    private networkServers: any[];

    // Constructor
    constructor() {

    }

    // Getters & Setters //

    /**
     * Gets the ID of the gateway
     * -> getId() -> id: N
     * @returns id: gateway ID
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Sets the id of the gateway
     * id: N -> setId() ->
     * @param value: new gateway id
     */
    public setId(value: number) {
        this.id = value;
    }

    /**
     * Gets the gateway mac
     * -> getMac() -> value: text
     */
    public getMac(): string {
        return this.name;
    }

    /**
     * Sets gateway mac
     * value: text -> setMac() ->
     * @param value: new gateway mac
     */
    public setMac(value: string) {
        this.name = value;
    }

    /**
     * Gets the gateway name
     * -> getName() -> value: text
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Sets gateway name
     * value: text -> setName() ->
     * @param value: new council name
     */
    public setName(value: string) {
        this.name = value;
    }

    /**
     * Gets gateway related council id
     * -> getCouncilId() -> value: text
     */
    public getCouncilId(): string {
        return this.councilId;
    }

    /**
     * Sets gatewy council id
     * value: text -> setWeb() ->
     * @param value: new related web
     */
    public setCouncilId(value: string) {
        this.councilId = value;
    }

    /**
     * Gets the gateway coordinates
     * -> getCoords() -> valueXY: [R, R]
     */
    public getCoords(): number[] {
        return this.coords;
    }

    /**
     * Sets the gateway coordinates
     * valueXY: [R, R] -> setCoords() ->
     * @param value: new gateway coordinates
     */
    public setCoords(value: number[]) {
        this.coords = value;
    }

    /**
     * Gets the gateway status
     * -> getStatus() -> value: text
     */
    public getStatus(): boolean {
        return this.status;
    }

    /**
     * Sets the gateway status
     * value: text -> setStatus() ->
     * @param value: new gateway status
     */
    public setStatus(value: boolean) {
        this.status = value;
    }

    /**
     * Gets the gateway enviromental devices
     * -> getEnviromentalDevices() -> enviromentalDevices: [EnviromentalDevice]
     */
    public getEnviromentalDevices(): EnviromentalDevice[] {
        return this.enviromentalDevices;
    }

    /**
     * Sets the council email
     * enviromentalDevices: [EnviromentalDevice] -> setEnviromentalDevices() ->
     * @param value: sets the gateway enviromental devices list
     */
    public setEnviromentalDevices(enviromentalDevices: EnviromentalDevice[]) {
        this.enviromentalDevices = enviromentalDevices;
    }

    /**
     * Gets the gateway network servers
     * -> getName() -> networkServers: [NetworkServer]
     */
    public getNetworkServers(): any[] {
        return this.networkServers;
    }

    /**
     * Sets the gateway network servers
     * networkServers: [NetworkServer] -> setName() ->
     * @param value: new council postal code
     */
    public setNetworkServers(value: any[]) {
        this.networkServers = value;
    }

}
