/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
 */

import db from "../database";
import Utils from "../Utils";
import NetworkServer from "./NetworkServer";

export default class NetworkServerDatabaseHandler {

    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    private queryResultsToNetworkServers(results: object[]): NetworkServer[] {
        let networkServers: NetworkServer[] = [];

        results.forEach((networkServerRow: any) => {
            let networkServer = new NetworkServer();

            networkServer.setId(networkServerRow.id)
            networkServer.setMac(networkServerRow.identifier)
            networkServer.setName(networkServerRow.name);
            networkServer.setCentralized(networkServerRow.centralized);
            networkServer.setStatus(networkServerRow.status);
            networkServer.setUrl(networkServerRow.url);
            networkServer.setType(networkServerRow.type);
            networkServer.setToken(networkServerRow.token);
            networkServer.setProvider(networkServerRow.provider);
            networkServers.push(networkServer)
        });

        return networkServers
    }

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
     * Get user network servers
     * userId: N -> getUserNetworkServersByIdFromDB() -> networkServers: NetworkServer
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    public async getUserNetworkServersByIdFromDB(userId: number): Promise<NetworkServer> {
        var query = "SELECT gateway.* FROM `user` INNER JOIN council ON user.council_id=council.id INNER JOIN " +
            "gateway ON gateway.council_id=council.id INNER JOIN gateway_network_server ON gateway_network_server.gateway_id=gateway.id" +
            " WHERE user.id=" + userId;

        return new Promise<NetworkServer>((resolve: any, reject: any) => {
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

                    let networkServers = this.queryResultsToNetworkServers(results)
                    resolve(networkServers)
                })

            })
        })
    }

    /**
     * Get user network servers ( * COUNT * )
     * userId: N -> getUserNetworkServersByIdCountFromDB() -> networkServers: NetworkServer[]
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    public async getUserNetworkServersByIdCountFromDB(userId: number): Promise<NetworkServer> {
        var query = "SELECT COUNT(*) as count FROM `user` INNER JOIN council ON user.council_id=council.id INNER JOIN " +
            "gateway ON gateway.council_id=council.id INNER JOIN gateway_network_server ON gateway_network_server.gateway_id=gateway.id" +
            " WHERE user.id=" + userId;

        return new Promise<NetworkServer>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting admin network servers count", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting admin network servers count", err))
                    }
                    try {
                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("admin network servers count retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("admin has no related network servers"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting admin network servers count", error))
                    }
                })

            })
        })
    }

    /**
     * Get all network servers paginated
     * pageSize: N, pageIndex: N -> getUserNetworkServersByIdCountFromDB() -> networkServers: NetworkServer[]
     *
     * @param pageSize - Number of gateways returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    public async getAllNetworkServersPaginatedFromDB(pageSize: number, pageIndex: number): Promise<NetworkServer> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT * FROM `network_server` ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue;

        return new Promise<NetworkServer>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting all network servers", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting all network servers", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("all network servers retrieved succesfully", results));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no network servers found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all network servers", error))
                    }
                })

            })
        })
    }

    /**
     * Get all network servers paginated
     * pageSize: N, pageIndex: N -> getCouncilNetworkServersPaginatedFromDB() -> networkServers: NetworkServer[]
     *
     * @param councilId - id of the council we want to retrieve the network servers from
     * @param pageSize - Number of gateways returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    public async getCouncilNetworkServersPaginatedFromDB(councilId: number, pageSize: number, pageIndex: number): Promise<NetworkServer> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT COUNT(*) as count FROM `gateway` INNER JOIN gateway_network_server ON gateway_network_server.gateway_id=gateway.id INNER" +
            " JOIN network_server ON network_server.id=gateway_network_server.network_server_id WHERE gateway.council_id="
            + councilId + " ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue;;

        return new Promise<NetworkServer>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting council network servers", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting council network servers", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("council network servers retrieved succesfully", results));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no council network servers found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting council network servers", error))
                    }
                })

            })
        })
    }

    /**
         * Get admin network servers ( * COUNT * )
         * councilId: N -> getAdminNetworkServersFromDB() -> networkServers: NetworkServer[]
         *
         * @param councilId - ID of the council you want to get the network servers from
         * @returns
         */
    public async getAdminNetworkServersFromDB(councilId: number): Promise<NetworkServer> {
        var query = "SELECT COUNT(*) as count FROM `gateway` INNER JOIN gateway_network_server ON gateway_network_server.gateway_id=gateway.id INNER" +
            " JOIN network_server ON network_server.id=gateway_network_server.network_server_id WHERE gateway.council_id=" + councilId;

        return new Promise<NetworkServer>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting admin network servers count", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting admin network servers count", err))
                    }
                    try {
                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("admin network servers count retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("admin has no related network servers"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting admin network servers count", error))
                    }
                })

            })
        })
    }

    /**
     * Get root network servers ( * COUNT * )
     * getNetworkServersCountFromDB() -> networkServers: NetworkServer[]
     *
     * @returns
     */
    public async getNetworkServersCountFromDB(): Promise<NetworkServer> {
        var query = "SELECT COUNT(*) as count FROM network_server";

        return new Promise<NetworkServer>((resolve: any, reject: any) => {
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
                    try {
                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("network servers count retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("network servers has no related gateways"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting network servers count", error))
                    }
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
            + networkServer.getMac() + "', '" + networkServer.getName() +
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
