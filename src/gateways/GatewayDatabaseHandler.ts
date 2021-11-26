/**
 * Name: GatewayDatabaseHandler.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the database queries of the gateway module
 */

import db from "../database";
import EnviromentalDevice from "../enviromental-device/EnviromentalDevice";
import Gateway from "./Gateway";

export default class GatewayDatabaseHandler {

    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    private queryResultsToGateways(results: object[]): Gateway[] {
        let gateways: Gateway[] = [];

        results.forEach((element: any) => {
            let gateway = new Gateway();
            gateway.setId(element.id)
            gateway.setMac(element.mac)
            gateway.setName(element.name)
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
    public getGatewayByIdFromDB(gatewayId: number): Promise<Gateway> {
        var query = "SELECT * FROM `gateway` WHERE id = " + gatewayId;
        return new Promise<Gateway>((resolve: any, reject: any) => {
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
                    let gateway = new Gateway()
                    if (results.length != 0) {
                        gateway.setId(results[0].id)
                        gateway.setMac(results[0].mac)
                        gateway.setName(results[0].name)
                        gateway.setCouncilId(results[0].council_id);
                        gateway.setCoords([results[0].latitude, results[0].longitude]);
                        gateway.setStatus(results[0].status);
                    }
                    resolve(gateway)
                })

            })
        })
    }

    /**
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysFromDB() -> count: N
     *
     * @param userId - ID of the user we want to get the gateways from
     * @returns
     */
    public getUserGatewaysFromDB(userId: number): Promise<Gateway> {
        var query = "SELECT gateway.* FROM `user` INNER JOIN council ON user.council_id=council.id INNER JOIN gateway ON gateway.council_id=council.id WHERE user.id="+userId;
        return new Promise<Gateway>((resolve: any, reject: any) => {
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
                    let gateways;
                    if (results && results.length != 0){
                        gateways = this.queryResultsToGateways(results)
                    }
                    resolve(gateways)
                })

            })
        })
    }

    /**
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysFromDB() -> count: N
     *
     * @param userId - ID of the user we want to get the gateways from
     * @returns
     */
    public getUserGatewaysCountFromDB(userId: number): Promise<Gateway> {
        var query = "SELECT COUNT(*) as count FROM `user` INNER JOIN council ON user.council_id=council.id INNER JOIN gateway ON gateway.council_id=council.id WHERE user.id="+userId;

        return new Promise<Gateway>((resolve: any, reject: any) => {
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
                    resolve(results)
                })

            })
        })
    }

    /**
     * Get all council related gateways
     * councilId: N -> getAllCouncilGatewaysFromDB() -> gateways: Gateway[]
     *
     * @param councilId - ID of the council you want to get the gateways from
     * @returns
     */
    public getAllCouncilGatewaysFromDB(councilId: number): Promise<Gateway> {
        var query = "SELECT * FROM `gateway` WHERE `council_id` = " + councilId;
        return new Promise<Gateway>((resolve: any, reject: any) => {
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
                    let gateways = this.queryResultsToGateways(results)
                    resolve(gateways)
                })

            })
        })
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
    public getCouncilGatewayPaginationFromDB(councilId: number, pageSize: number, pageIndex: number): Promise<Gateway> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT * FROM `gateway` WHERE `council_id`=" + councilId + " ORDER BY gateway.id DESC LIMIT " + firstValue + ', ' + secondValue;
        console.log(query)
        return new Promise<Gateway>((resolve: any, reject: any) => {
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
                    let gateways
                    if (results.length != 0) {
                        gateways = this.queryResultsToGateways(results)
                    }
                    resolve(gateways)
                })

            })
        })
    }

    /**
     * Get network server related gateways
     * networkServerId: N -> getGatewaysFromNetworkServerInDB() -> gateways: Gateway[]
     *
     * @param networkServerId - ID of the network server we want to get the gateways from
     * @returns
     */
    public getGatewaysFromNetworkServerInDB(networkServerId: number): Promise<Gateway> {
        var query = "SELECT gateway.* FROM `gateway_network_server` INNER JOIN gateway ON gateway.id=gateway_network_server.gateway_id" +
            " WHERE network_server_id = " + networkServerId;
        return new Promise<Gateway>((resolve: any, reject: any) => {
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
                    let gateways
                    if (results.length != 0) {
                        gateways = this.queryResultsToGateways(results)
                    }
                    resolve(gateways)
                })

            })
        })
    }

    /**
     * Create a new gateway
     * gateway: Gateway -> storeGatewayInDB()
     *
     * @param gateway - gateway we want to create
     * @returns
     */
    public storeGatewayInDB(gateway: Gateway): Promise<void> {
        var query = "INSERT INTO `gateway` (`mac`, `council_id`, `name`, `latitude`, `longitude`, `status`) VALUES ('" + gateway.getMac() +
            "', " + gateway.getCouncilId() + ", '" + gateway.getName() + "', '" + gateway.getCoords()[0] + "', '" + gateway.getCouncilId()[1] + "', " +
            gateway.getStatus() + ")\n"
        console.log(query)
        return new Promise((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        console.log(err)
                        reject()
                    }
                    console.log(results)

                    if (results != undefined) {
                        resolve(results.insertId)
                    }
                    resolve()
                })

            })
        })
    }


    /**
     * Links a network server to gateway
     * gatewayId: N, networkServerId: N -> addNetworkServersToGatewayInDB()
     *
     * @param gatewayId - gateway id
     * @param networkServerId - network server id
     * @returns
     */
    public addNetworkServersToGatewayInDB(gatewayId: number, networkServerId: number): Promise<void> {
        var query = "INSERT INTO `gateway_network_server` (`id_gateway`, `id_network_server`) VALUES (" + gatewayId + "," + networkServerId + ");";
        console.log(query)
        return new Promise((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        console.log(err)
                        reject()
                    }

                    resolve(results)
                })

            })
        })
    }

    /**
     * Edit gateway info
     * gateway: Gateway -> editGatewayInDB()
     *
     * @param gateway - gateway with new data
     * @returns
     */
    public editGatewayInDB(gateway: Gateway): Promise<void> {
        var query = "UPDATE `gateway`" +
            "SET mac = '" + gateway.getMac() + "', council_id = " + gateway.getCouncilId() + ", " + "name = '" + gateway.getName() + "', " + "latitude = " +
            gateway.getCoords()[0] + ", " + "longitude = " + gateway.getCoords()[1] + ", " + "status = " + gateway.getStatus() + " WHERE id=" + gateway.getId() + ";"
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
                        console.log(err)
                        reject()
                    }

                    resolve()
                })

            })
        })
    }

    /**
     * Remove a gateway by given id
     * gatewayId: N -> removeGatewayFromDB()
     *
     * @param gatewayId - ID of the gateway we want to delete
     * @returns
     */
    public removeGatewayFromDB(gatewayId: number): Promise<void> {
        var query = "DELETE FROM `gateway` WHERE id =" + gatewayId + ";";
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

                    resolve()
                })

            })
        })
    }

    /**
     * Remove link between network server and gateway
     * gatewayId: N, networkServerId: N -> removeNetworkServerFromGatewayFromDB()
     *
     * @param gatewayId - ID of the gateway
     * @param networkServerId - ID of the network server
     * @returns
     */
    public removeNetworkServerFromGatewayFromDB(gatewayId: number, networkServerId: number): Promise<void> {
        var query = "DELETE FROM gateway_network_server WHERE gateway_id="+gatewayId+" AND network_server_id="+networkServerId+";";
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

                    resolve()
                })

            })
        })
    }
}
