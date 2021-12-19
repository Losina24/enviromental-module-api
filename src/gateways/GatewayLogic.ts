/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the logic of the sensor feature
 */

import EnviromentalDevice from "../enviromental-device/EnviromentalDevice";
import Gateway from "./Gateway";
import GatewayDatabaseHandler from "./GatewayDatabaseHandler";

export default class GatewayLogic {

    // This atribute is used to manage the db interactions in the logic
    private gatewayDB: GatewayDatabaseHandler = new GatewayDatabaseHandler()

    // Constructor
    constructor() {

    }

    // Logic Methods 
    /**
     * Get gateway information by given id
     * gatewayId: N -> getGatewayById() -> gateway: Gateway
     *
     * @param gatewayId - ID of the gateway you want to get data from
     * @returns
     */
    public async getGatewayById(councilId: number): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getGatewayByIdFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get gateway information by given mac
     * mac: N -> getGatewayById() -> gateway: Gateway
     *
     * @param mac - Mac of the gateway you want to get data from
     * @returns
     */
     public async getGatewayByMacAndAdminId(mac: string): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getGatewayByMacAndAdminIdFromDB(mac)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get user related gateways
     * gatewayId: N -> getUserGateways() -> gateways: Gateway[]
     *
     * @param userId - ID of the user we want to get the gateways from
     * @returns
     */
    public async getUserGateways(userId: number): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getUserGatewaysFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysCount() -> count: N
     *
     * @param userId - ID of the user we want to get the gateways from
     * @returns
     */
    public async getUserGatewaysCount(userId: number): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getUserGatewaysCountFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysCount() -> count: N
     *
     * @param councilId - ID of the council we want to get the gateways from
     * @returns
     */
    public async getAdminGatewaysCount(councilId: number): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getGatewaysCountAdmin(councilId)
                .then(res => {
                    resolve(res) 
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysCount() -> count: N
     *
     * @param councilId - ID of the council we want to get the gateways from
     * @returns
     */
     public async getAdminGateways(councilId: number): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getGatewaysAdmin(councilId)
                .then(res => {
                    resolve(res) 
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysCount() -> count: N
     *
     * @returns
     */
    public async getRootGatewaysCount(): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getGatewaysCountRoot()
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }


    /**
     * Get all council related gateways
     * councilId: N -> getAllCouncilGateways() -> gateways: Gateway[]
     *
     * @param councilId - ID of the council you want to get the gateways from
     * @returns
     */
    public async getAllCouncilGateways(councilId: number): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getAllCouncilGatewaysFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    /**
     * Get all council related gateways with pagination
     * councilId: N, pageSize: N, pageIndex: N -> getCouncilGatewayPagination() -> gateways: Gateway[]
     *
     * @param councilId - ID of the council you want to get data from
     * @param pageSize - Number of gateways returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    public async getCouncilGatewayPagination(councilId: number, pageSize: number, pageIndex: number): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getCouncilGatewayPaginationFromDB(councilId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all gateways with pagination
     * pageSize: N, pageIndex: N -> getAllGatewaysRootPagination() -> gateways: Gateway[]
     *
     * @param pageSize - Number of gateways returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
     public async getAllGatewaysRootPagination(pageSize: number, pageIndex: number): Promise<Gateway> {
        return new Promise<Gateway>((resolve, reject) => {
            this.gatewayDB.getAllGatewaysRootPaginationFromDB(pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    
    /**
     * Get network server related gateways
     * networkServerId: N -> getGatewaysFromNetworkServer() -> gateways: Gateway[]
     *
     * @param networkServerId - ID of the network server we want to get the gateways from
     * @returns
     */
    public async getGatewaysFromNetworkServer(networkServerId: number): Promise<Gateway[]> {
        return new Promise<Gateway[]>((resolve, reject) => {
            this.gatewayDB.getGatewaysFromNetworkServerInDB(networkServerId)
                .then((res: any) => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Create a new gateway
     * gateway: Gateway -> storeGateway()
     *
     * @param gateway - gateway we want to create
     * @returns
     */
    public async storeGateway(gateway: Gateway): Promise<void> {
        return new Promise((resolve, reject) => {
            this.gatewayDB.storeGatewayInDB(gateway)
                .then(res => {
                    console.log("logicaRes")
                    resolve()
                })
                .catch(err => {
                    reject()
                })
        })
    }

    /**
     * Links a network server to gateway
     * gatewayId: N, networkServerId: N -> addNetworkServersToGateway()
     *
     * @param gatewayId - gateway id
     * @param networkServerId - network server id
     * @returns
     */
    public async addNetworkServersToGateway(gatewayId: number, networkServerId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.gatewayDB.addNetworkServersToGatewayInDB(gatewayId, networkServerId)
                .then(res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    /**
     * Edit gateway info
     * gateway: Gateway -> editGateway()
     *
     * @param gateway - gateway with new data
     * @returns
     */
    public async editGateway(gateway: Gateway): Promise<void> {
        return new Promise((resolve, reject) => {
            this.gatewayDB.editGatewayInDB(gateway)
                .then(res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }


    /**
     * Remove link between network server and gateway
     * gatewayId: N, networkServerId: N -> removeNetworkServerFromGateway()
     *
     * @param gatewayId - ID of the gateway
     * @param networkServerId - ID of the network server
     * @returns
     */
    public async removeNetworkServerFromGateway(gatewayId: number, networkServerId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.gatewayDB.removeNetworkServerFromGatewayFromDB(gatewayId, networkServerId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Remove a gateway by given id
     * gatewayId: N -> removeGateway()
     *
     * @param gatewayId - ID of the gateway we want to delete
     * @returns
     */
    public async removeGateway(gatewayId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.gatewayDB.removeGatewayFromDB(gatewayId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
