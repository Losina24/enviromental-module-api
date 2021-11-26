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
const NetworkServer_1 = __importDefault(require("./NetworkServer"));
class NetworkServerDatabaseHandler {
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
        console.log('asdfa', query);
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
    getAllNSFromDB() {
        var query = "SELECT * FROM `network_server`";
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
                    resolve(results);
                });
            });
        });
    }
}
exports.default = NetworkServerDatabaseHandler;
