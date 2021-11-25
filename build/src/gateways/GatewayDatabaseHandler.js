"use strict";
/**
 * Name: GatewayDatabaseHandler.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the database queries of the gateway module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const Gateway_1 = __importDefault(require("./Gateway"));
class GatewayDatabaseHandler {
    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    queryResultsToGateways(results) {
        let gateways = [];
        results.forEach((element) => {
            let gateway = new Gateway_1.default();
            gateway.setId(element.id);
            gateway.setMac(element.mac);
            gateway.setName(element.name);
            gateway.setCouncilId(element.council_id);
            gateway.setCoords([element.latitude, element.longitude]);
            gateway.setStatus(element.status);
            gateways.push(gateway);
        });
        return gateways;
    }
    // Logic Methods
    /**
     * Get gateway information by given id
     * gatewayId: N -> getGatewayByIdFromDB() -> gateway: Gateway
     *
     * @param gatewayId - ID of the gateway you want to get data from
     * @returns
     */
    getGatewayByIdFromDB(gatewayId) {
        var query = "SELECT * FROM `gateway` WHERE id = " + gatewayId;
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
                    let gateway = new Gateway_1.default();
                    if (results.length != 0) {
                        gateway.setId(results[0].id);
                        gateway.setMac(results[0].mac);
                        gateway.setName(results[0].name);
                        gateway.setCouncilId(results[0].council_id);
                        gateway.setCoords([results[0].latitude, results[0].longitude]);
                        gateway.setStatus(results[0].status);
                    }
                    resolve(gateway);
                });
            });
        });
    }
    /**
     * Get all council related gateways
     * councilId: N -> getAllCouncilGatewaysFromDB() -> gateways: Gateway[]
     *
     * @param councilId - ID of the council you want to get the gateways from
     * @returns
     */
    getAllCouncilGatewaysFromDB(councilId) {
        var query = "SELECT * FROM `gateway` WHERE `council_id` = " + councilId;
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
                    let gateways = this.queryResultsToGateways(results);
                    resolve(gateways);
                });
            });
        });
    }
    /**
     * Get all council related gateways with pagination
     * councilId: N, pageSize: N, pageIndex: N -> getCouncilGatewayPaginationFromDB() -> gateways: Gateway[]
     *
     * @param councilId - ID of the council you want to get data from
     * @param pageSize - Number of gateways returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getCouncilGatewayPaginationFromDB(councilId, pageSize, pageIndex) {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);
        var query = "SELECT * FROM `gateway` WHERE `council_id`=" + councilId + " ORDER BY gateway.id DESC LIMIT " + firstValue + ', ' + secondValue;
        console.log(query);
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
                    let gateways;
                    if (results.length != 0) {
                        gateways = this.queryResultsToGateways(results);
                    }
                    resolve(gateways);
                });
            });
        });
    }
    /**
     * Get network server related gateways
     * networkServerId: N -> getGatewaysFromNetworkServerInDB() -> gateways: Gateway[]
     *
     * @param networkServerId - ID of the network server we want to get the gateways from
     * @returns
     */
    getGatewaysFromNetworkServerInDB(networkServerId) {
        var query = "SELECT gateway.* FROM `gateway_network_server` INNER JOIN gateway ON gateway.id=gateway_network_server.gateway_id" +
            " WHERE network_server_id = " + networkServerId;
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
                    let gateways;
                    if (results.length != 0) {
                        gateways = this.queryResultsToGateways(results);
                    }
                    resolve(gateways);
                });
            });
        });
    }
    /**
     * Create a new gateway
     * gateway: Gateway -> storeGatewayInDB()
     *
     * @param gateway - gateway we want to create
     * @returns
     */
    storeGatewayInDB(gateway) {
        var query = "INSERT INTO `gateway` (`mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES ('" + gateway.getMac() +
            "', " + gateway.getCouncilId() + ", '" + gateway.getName() + "', '" + gateway.getCoords()[0] + "', '" + gateway.getCouncilId()[1] + "', " +
            gateway.getStatus() + ")\n";
        console.log(query);
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
                        console.log(err);
                        reject();
                    }
                    console.log(results);
                    if (results != undefined) {
                        resolve(results.insertId);
                    }
                    resolve();
                });
            });
        });
    }
    /**
     * Links a network server to gateway
     * gatewayId: N, networkServerId: N -> addNetworkServersToGatewayInDB()
     *
     * @param gatewayId - gateway id
     * @param networkServerId - network server id
     * @returns
     */
    addNetworkServersToGatewayInDB(gatewayId, networkServerId) {
        var query = "INSERT INTO `gateway_network_server` (`id_gateway`, `id_network_server`) VALUES (" + gatewayId + "," + networkServerId + ");";
        console.log(query);
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
                        console.log(err);
                        reject();
                    }
                    resolve(results);
                });
            });
        });
    }
    /**
     * Edit gateway info
     * gateway: Gateway -> editGatewayInDB()
     *
     * @param gateway - gateway with new data
     * @returns
     */
    editGatewayInDB(gateway) {
        var query = "UPDATE `gateway`" +
            "SET mac = '" + gateway.getMac() + "', council_id = " + gateway.getCouncilId() + ", " + "name = '" + gateway.getName() + "', " + "latitude = " +
            gateway.getCoords()[0] + ", " + "longitude = " + gateway.getCoords()[1] + ", " + "status = " + gateway.getStatus() + " WHERE id=" + gateway.getId() + ";";
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
                        console.log(err);
                        reject();
                    }
                    resolve();
                });
            });
        });
    }
    /**
     * Remove a gateway by given id
     * gatewayId: N -> removeGatewayFromDB()
     *
     * @param gatewayId - ID of the gateway we want to delete
     * @returns
     */
    removeGatewayFromDB(gatewayId) {
        var query = "DELETE FROM `gateway` WHERE id =" + gatewayId + ";";
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
    /**
     * Remove link between network server and gateway
     * gatewayId: N, networkServerId: N -> removeNetworkServerFromGatewayFromDB()
     *
     * @param gatewayId - ID of the gateway
     * @param networkServerId - ID of the network server
     * @returns
     */
    removeNetworkServerFromGatewayFromDB(gatewayId, networkServerId) {
        var query = "DELETE FROM gateway_network_server WHERE gateway_id=" + gatewayId + " AND network_server_id=" + networkServerId + ";";
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
exports.default = GatewayDatabaseHandler;
