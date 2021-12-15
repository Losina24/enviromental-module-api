"use strict";
/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const Utils_1 = __importDefault(require("../Utils"));
const NetworkServer_1 = __importDefault(require("./NetworkServer"));
class NetworkServerDatabaseHandler {
    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    queryResultsToNetworkServers(results) {
        let networkServers = [];
        results.forEach((networkServerRow) => {
            let networkServer = new NetworkServer_1.default();
            networkServer.setId(networkServerRow.id);
            networkServer.setMac(networkServerRow.identifier);
            networkServer.setName(networkServerRow.name);
            networkServer.setCentralized(networkServerRow.centralized);
            networkServer.setStatus(networkServerRow.status);
            networkServer.setUrl(networkServerRow.url);
            networkServer.setType(networkServerRow.type);
            networkServer.setToken(networkServerRow.token);
            networkServer.setProvider(networkServerRow.provider);
            networkServers.push(networkServer);
        });
        return networkServers;
    }
    // Methods
    /**
     * Get the information about a network server given their ID
     * networkServerId: N -> getNetworkServerByIdFromDB() -> gateway: Gateway
     *
     * @param networkServerId - ID of the network server you want to get data from
     * @returns
     */
    getNetworkServerByIdFromDB(networkServerId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT * FROM network_server WHERE id = " + networkServerId;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject();
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject();
                        }
                        let networkServer = new NetworkServer_1.default();
                        networkServer.setId(results[0].id);
                        networkServer.setMac(results[0].identifier);
                        networkServer.setName(results[0].name);
                        networkServer.setCentralized(results[0].centralized);
                        networkServer.setStatus(results[0].status);
                        networkServer.setUrl(results[0].url);
                        networkServer.setType(results[0].type);
                        networkServer.setToken(results[0].token);
                        networkServer.setProvider(results[0].provider);
                        resolve(networkServer);
                    });
                });
            });
        });
    }
    /**
     * Get user network servers
     * userId: N -> getUserNetworkServersByIdFromDB() -> networkServers: NetworkServer
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    getUserNetworkServersByIdFromDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT gateway.* FROM `user` INNER JOIN council ON user.council_id=council.id INNER JOIN " +
                "gateway ON gateway.council_id=council.id INNER JOIN gateway_network_server ON gateway_network_server.gateway_id=gateway.id" +
                " WHERE user.id=" + userId;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(error);
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(err);
                        }
                        let networkServers = this.queryResultsToNetworkServers(results);
                        resolve(networkServers);
                    });
                });
            });
        });
    }
    /**
     * Get user network servers ( * COUNT * )
     * userId: N -> getUserNetworkServersByIdCountFromDB() -> networkServers: NetworkServer[]
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    getUserNetworkServersByIdCountFromDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM `user` INNER JOIN council ON user.council_id=council.id INNER JOIN " +
                "gateway ON gateway.council_id=council.id INNER JOIN gateway_network_server ON gateway_network_server.gateway_id=gateway.id" +
                " WHERE user.id=" + userId;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting admin network servers count", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting admin network servers count", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("admin network servers count retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("admin has no related network servers"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting admin network servers count", error));
                        }
                    });
                });
            });
        });
    }
    /**
         * Get admin network servers ( * COUNT * )
         * councilId: N -> getAdminNetworkServersFromDB() -> networkServers: NetworkServer[]
         *
         * @param councilId - ID of the council you want to get the network servers from
         * @returns
         */
    getAdminNetworkServersFromDB(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM `gateway` INNER JOIN gateway_network_server ON gateway_network_server.gateway_id=gateway.id INNER" +
                " JOIN network_server ON network_server.id=gateway_network_server.network_server_id WHERE gateway.council_id=" + councilId;
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(Utils_1.default.generateLogicError("error getting admin network servers count", error));
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(Utils_1.default.generateLogicError("error getting admin network servers count", err));
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("admin network servers count retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("admin has no related network servers"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting admin network servers count", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Get root network servers ( * COUNT * )
     * getNetworkServersCountFromDB() -> networkServers: NetworkServer[]
     *
     * @returns
     */
    getNetworkServersCountFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            var query = "SELECT COUNT(*) as count FROM network_server";
            return new Promise((resolve, reject) => {
                database_1.default.getConnection((error, conn) => {
                    // If connection fails
                    if (error) {
                        reject(error);
                    }
                    conn.query(query, (err, results) => {
                        conn.release();
                        // If connection fails
                        if (err) {
                            reject(err);
                        }
                        try {
                            if (results[0].count != 0) {
                                resolve(Utils_1.default.generateLogicSuccess("network servers count retrieved succesfully", results[0].count));
                            }
                            else {
                                resolve(Utils_1.default.generateLogicSuccessEmpty("network servers has no related gateways"));
                            }
                        }
                        catch (error) {
                            reject(Utils_1.default.generateLogicError("error getting network servers count", error));
                        }
                    });
                });
            });
        });
    }
    /**
     * Create a network server
     * networkServer: NetworkServer -> createNetworkServerInDB() ->
     *
     * @param networkServer - network server you want to store in the database
     * @returns
     */
    createNetworkServerInDB(networkServer) {
        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO `network_server` (`identifier`, `name`, `centralized`, `status`, `url`, `type`, `token`, `provider`) VALUES ('"
            + networkServer.getMac() + "', '" + networkServer.getName() +
            "', " + networkServer.getCentralized() + ", " + networkServer.getStatus() + ", '" + networkServer.getUrl() + "', '" + networkServer.getType() +
            "', '" + networkServer.getToken() + "', '" + networkServer.getProvider() + "');";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(error);
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // Si la consulta falla
                    if (err) {
                        reject(err);
                    }
                    console.log(results);
                    resolve(results);
                });
            });
        });
    }
    /**
     * Edit network server data
     * networkServer: NetworkServer -> editNetworkServerFromDB() ->
     *
     * @param networkServer - network server with the new data
     * @returns
     */
    editNetworkServerFromDB(networkServer) {
        var query = "UPDATE network_server" +
            " SET identifier = " + networkServer.getMac() + ", name = '" + networkServer.getName() + "', centralized = " + networkServer.getCentralized() +
            ", status = " + networkServer.getStatus() + ", url = '" + networkServer.getUrl() + "', type = '" + networkServer.getType() +
            "', token = '" + networkServer.getToken() + "', provider = '" + networkServer.getProvider() + "' WHERE id=" + networkServer.getId() + ";";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(error);
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(err);
                    }
                    console.log(query);
                    console.log(results);
                    resolve(results);
                });
            });
        });
    }
    /**
     * Remove a network server by given id
     * networkServerId: N -> removeNetworkServerFromDB() ->
     *
     * @param networkServerId - ID of the network server you want to remove
     * @returns
     */
    removeNetworkServerFromDB(networkServerId) {
        var query = "DELETE FROM `network_server` WHERE id =" + networkServerId + ";";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject();
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject();
                    }
                    resolve();
                });
            });
        });
    }
}
exports.default = NetworkServerDatabaseHandler;
