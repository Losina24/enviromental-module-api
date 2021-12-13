/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the logic of the enviromental device feature
 */

import NetworkServerDatabaseHandler from "./NetworkServerDatabaseHandler";
import NetworkServer from "./NetworkServer";

export default class NetworkServerLogic {

    // This atribute is used to manage the db interactions in the logic
    private networkServerDB: NetworkServerDatabaseHandler = new NetworkServerDatabaseHandler();

    // Constructor
    constructor() {
    }

    // Logic Methods 
    /**
     * Get the information about a network server given their ID
     * networkServerId: N -> getNetworkServerById() -> gateway: Gateway
     *
     * @param networkServerId - ID of the network server you want to get data from
     * @returns 
     */
    public async getNetworkServerById( networkServerId: number ) : Promise<NetworkServer> {
        return new Promise<NetworkServer>((resolve, reject) => {
            this.networkServerDB.getNetworkServerByIdFromDB( networkServerId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })   
    }

    /**
     * Get user network servers
     * userId: N -> getUserNetworkServersById() -> networkServers: NetworkServer
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    public async getUserNetworkServersById( userId: number ) : Promise<NetworkServer[]> {
        return new Promise<NetworkServer[]>((resolve, reject) => {
            this.networkServerDB.getUserNetworkServersByIdFromDB( userId )
                .then( (res: any) => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get user network servers ( * COUNT * )
     * userId: N -> getUserNetworkServersCountById() -> networkServers: NetworkServer[]
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    public async getUserNetworkServersCountById( userId: number ) : Promise<NetworkServer[]> {
        return new Promise<NetworkServer[]>((resolve, reject) => {
            this.networkServerDB.getUserNetworkServersByIdCountFromDB( userId )
                .then( (res: any) => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get admin network servers ( * COUNT * )
     * councilId: N -> getAdminNetworkServerCount() -> networkServers: NetworkServer[]
     *
     * @returns
     */
     public async getAdminNetworkServerCount(councilId: number) : Promise<NetworkServer[]> {
        return new Promise<NetworkServer[]>((resolve, reject) => {
            this.networkServerDB.getAdminNetworkServersFromDB(councilId)
                .then( (res: any) => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get root network servers ( * COUNT * )
     * getRootNetworkServerCount() -> networkServers: NetworkServer[]
     *
     * @returns
     */
     public async getRootNetworkServerCount() : Promise<NetworkServer[]> {
        return new Promise<NetworkServer[]>((resolve, reject) => {
            this.networkServerDB.getNetworkServersCountFromDB()
                .then( (res: any) => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Create a network server
     * networkServer: NetworkServer -> createNetworkServer() ->
     *
     * @param networkServer - network server you want to store in the database
     * @returns
     */
    public async createNetworkServer( networkServer: NetworkServer ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.networkServerDB.createNetworkServerInDB(networkServer)
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Edit network server data
     * networkServer: NetworkServer -> editNetworkServerFromDB() ->
     *
     * @param networkServer - network server with the new data
     * @returns
     */
    public async editNetworkServer( networkServer: NetworkServer) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.networkServerDB.editNetworkServerFromDB( networkServer )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        }) 
    }

    /**
     * Remove a network server by given id
     * networkServerId: N -> removeNetworkServer() ->
     *
     * @param networkServerId - ID of the network server you want to remove
     * @returns
     */
    public async removeNetworkServer( networkServerId: number ) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.networkServerDB.removeNetworkServerFromDB( networkServerId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }
}
