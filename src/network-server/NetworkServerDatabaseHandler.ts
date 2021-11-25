/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
 */

import db from "../database";
import NetworkServer from "./NetworkServer";

export default class NetworkServerDatabaseHandler {

    // Methods
    /**
     * Get the information about a network server given their ID
     * networkServerId: N -> getNetworkServerByIdFromDB() -> gateway: Gateway
     *
     * @param networkServerId - ID of the network server you want to get data from
     * @returns
     */
    public async getNetworkServerByIdFromDB(networkServerId: number): Promise<NetworkServer> {
        var query = "SELECT * FROM network_server WHERE id = " + networkServerId;

        return new Promise<NetworkServer>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject()
                    }

                    let networkServer = new NetworkServer();

                    networkServer.setId(results[0].id)
                    networkServer.setMac(results[0].identifier)
                    networkServer.setName(results[0].name);
                    networkServer.setCentralized(results[0].centralized);
                    networkServer.setStatus(results[0].status);
                    networkServer.setUrl(results[0].url);
                    networkServer.setType(results[0].type);
                    networkServer.setToken(results[0].token);
                    networkServer.setProvider(results[0].provider);

                    resolve(networkServer)
                })

            })
        })
    }

    /**
     * Create a network server
     * networkServer: NetworkServer -> createNetworkServerInDB() ->
     *
     * @param networkServer - network server you want to store in the database
     * @returns
     */
    public createNetworkServerInDB(networkServer: NetworkServer): Promise<any> {
        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO `network_server` (`identifier`, `name`, `centralized`, `status`, `url`, `type`, `token`, `provider`) VALUES ('"
        +networkServer.getMac() + "', '" + networkServer.getName() +
        "', " + networkServer.getCentralized() + ", " + networkServer.getStatus() + ", '" + networkServer.getUrl() + "', '" + networkServer.getType() +
        "', '" + networkServer.getToken() + "', '" + networkServer.getProvider() + "');";

        return new Promise<any>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(error)
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // Si la consulta falla
                    if (err) {
                        reject(err)
                    }
                    console.log(results)
                    resolve(results)
                })

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
    public editNetworkServerFromDB(networkServer: NetworkServer): Promise<any> {
        var query = "UPDATE network_server" +
            " SET identifier = " + networkServer.getMac() + ", name = '" + networkServer.getName() + "', centralized = " + networkServer.getCentralized() +
            ", status = " + networkServer.getStatus() + ", url = '" + networkServer.getUrl() + "', type = '" + networkServer.getType() +
            "', token = '" + networkServer.getToken() + "', provider = '" + networkServer.getProvider() + "' WHERE id=" + networkServer.getId() + ";";

        return new Promise<any>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(error)
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(err)
                    }
                    console.log(query)
                    console.log(results)
                    resolve(results)
                })

            })
        })
    }

    /**
     * Remove a network server by given id
     * networkServerId: N -> removeNetworkServerFromDB() ->
     *
     * @param networkServerId - ID of the network server you want to remove
     * @returns
     */
    public removeNetworkServerFromDB(networkServerId: number): Promise<void> {
        var query = "DELETE FROM `network_server` WHERE id =" + networkServerId + ";";

        return new Promise<void>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject()
                    }

                    resolve();
                })

            })
        })
    }
}
