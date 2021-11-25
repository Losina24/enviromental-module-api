/**
 * Name: EnviromentaDevice.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Model for enviromental device feature
 */
import Gateway from "../gateways/Gateway";
import Sensor from "../sensor/Sensor";

export default class NetworkServer {

    // Atributes
    private id: number;
    private mac: string;
    private name: string;
    private centralized: boolean;
    private status: boolean;
    private token: string;
    private provider: string;
    private url: string;
    // Enum ('mqtt','rest')
    private type: string;
    private gateways: Gateway[];

    // Constructor
    constructor() {

    }

    // Getters //

    /**
     * Gets the ID of the network server
     * -> getId() -> id: N
     *
     * @returns id: Network server ID
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Gets the name of the network server
     * -> getName() -> name: Text
     *
     * @returns name: Network server name
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Gets the mac of the network server
     * -> getMac() -> mac: Text
     *
     * @returns mac: Network server mac
     */
    public getMac(): string {
        return this.mac;
    }

    /**
     * Gets the status of the network server
     * -> getStatus() -> status: boolean
     *
     * @returns status: Network server status
     */
    public getStatus(): boolean {
        return this.status;
    }

    /**
     * Gets the token of the network server
     * -> getToken() -> token: Text
     *
     * @returns
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * Gets provider of the network server
     * -> getProvider() -> provider: Text
     *
     * @returns
     */
    public getProvider(): string {
        return this.provider
    }

    /**
     * Gets network server url
     * -> getUrl() -> url: Text
     *
     * @returns
     */
    public getUrl(): string {
        return this.url;
    }

    /**
     * Gets the network server gateways
     * -> getGateways() -> gateway: Gateway[]
     *
     * @returns
     */
    public getGateways(): Gateway[] {
        return this.gateways;
    }

    /**
     * Gets centralized network server value
     * -> getCentralized() -> value: boolean
     *
     * @returns
     */
    public getCentralized(): boolean {
        return this.centralized;
    }

    /**
     * Gets network server type
     * -> getType() -> type: boolean
     *
     * @returns
     */
    public getType(): string {
        return this.type;
    }

    // Setters //

    /**
     * Sets the id of the network server
     * id: N -> setId() ->
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Sets the network server name
     * name: N -> setName() ->
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Sets the network server mac
     * mac: Text -> setMac() ->
     */
    public setMac(mac: string): void {
        this.mac = mac;
    }

    /**
     * Sets the network server token
     * gatewayId: N -> setToken() ->
     */
    public setToken(token: string): void {
        this.token = token;
    }

    /**
     * Sets the network server provider
     * provider: Text -> setProvider() ->
     */
    public setProvider(provider: string): void {
        this.provider = provider;
    }

    /**
     * Sets the network server status
     * status: boolean -> setStatus() ->
     */
    public setStatus(status: boolean): void {
        this.status = status;
    }

    /**
     * Set network server url
     * url: Text -> setUrl() ->
     */
    public setUrl(url: string): void {
        this.url = url
    }

    /**
     * Set network server gateways
     * gateways: Gateway[] -> setGateways() ->
     */
    public setGateways(gateways: Gateway[]): void {
        this.gateways = gateways
    }

    /**
     * Set network server centralized value
     * value: booleam -> addSensor() ->
     */
    public setCentralized(val: boolean): void {
        this.centralized = val
    }

    /**
     * Set network server type
     * type: Text -> setType() ->
     */
    public setType(type: string): void {
        this.type = type
    }
}
