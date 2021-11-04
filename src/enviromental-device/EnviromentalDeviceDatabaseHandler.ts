/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
 */

import db from "../database";
import EnviromentalDevice from "./EnviromentalDevice";

export default class EnviromentalDeviceDatabaseHandler {

    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    private queryResultsToEnviromentalDevices(results: object[]) : EnviromentalDevice[] {
        let enviromentalDevices: EnviromentalDevice[] = [];

        results.forEach( (element:any) => {
            let device = new EnviromentalDevice();
                        
            device.setId(element.id)
            device.setName(element.name);
            device.setMac(element.identifier);
            device.setGatewayId(element.gateway_id);
            device.setCoords([element.latitude, element.longitude]);
            device.setStatus(element.status);

            enviromentalDevices.push(device);
        });

        return enviromentalDevices;
    }

    // Methods 
    /**
     * Get the information about a enviromental device given their ID from the database
     * deviceId: N -> getDeviceByIdFromDB() -> EnviromentalDevice
     * 
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns 
     */
     public async getDeviceByIdFromDB( deviceId: number ) : Promise<EnviromentalDevice> {
        var query = "SELECT * FROM device WHERE id = " + deviceId;
        
        return new Promise<EnviromentalDevice> ((resolve: any, reject: any) => {
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

                    let device = new EnviromentalDevice();
                    
                    device.setId(results[0].id)
                    device.setName(results[0].name);
                    device.setMac(results[0].identifier);
                    device.setGatewayId(results[0].gateway_id);
                    device.setCoords([results[0].latitude, results[0].longitude]);
                    device.setStatus(results[0].status);

                    resolve(device)
                })

            })
        })
    }

    /**
     * Get all enviroment devices of a user from the database
     * userId: N -> getAllUserDevicesFromDB() -> [JSON]
     * 
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns 
     */
    public getAllUserDevicesFromDB( userId: number ): Promise<EnviromentalDevice[]> {
        var query = "SELECT d.* FROM device AS d INNER JOIN user_device AS ud ON d.id = ud.device_id WHERE ud.user_id = " + userId;
        
        return new Promise<EnviromentalDevice[]> ((resolve: any, reject: any) => {
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

                    let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                    resolve(enviromentalDevices);
                })

            })
        })
    }

    /**
     * Get enviromental devices from a user in a pagination format
     * userId: N, pageSize: N, pageIndex: N -> getUserDevicePaginationFromDB() -> [JSON]
     * 
     * @param userId - ID of the user u want to get devices from
     * @param pageSize - Number of devices returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns 
     */
    public async getUserDevicePaginationFromDB( userId: number, pageSize: number, pageIndex: number ): Promise<EnviromentalDevice[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

         var query = "SELECT d.* FROM device AS d INNER JOIN user_device AS u ON d.id = u.device_id WHERE u.user_id = "+userId+" ORDER BY d.id DESC LIMIT "+ firstValue + ', ' + secondValue;

        return new Promise<EnviromentalDevice[]> ((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    
                    // If connection fails
                    if (err || results == undefined || results.length == 0) {
                        reject()
                    }
                                     
                    let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                    resolve(enviromentalDevices);
                })

            })
        })
    }

    /**
     * Get all enviromental devices from a council
     * councilId: N -> getAllCouncilDevicesFromDB() -> [JSON]
     * 
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns 
     */
    public getAllCouncilDevicesFromDB( councilId: number ): Promise<EnviromentalDevice[]> {
        var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id WHERE g.council_id = " + councilId;
        
        return new Promise<EnviromentalDevice[]> ((resolve: any, reject: any) => {
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

                    let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                    resolve(enviromentalDevices);
                })

            })
        })
    }

    /**
     * Get enviromental devices of a gateway
     * gatewayId: N -> getGatewayDevicesFromDB() -> [JSON]
     * 
     * @param gatewayId - ID of the gateway that you want to get all enviromental devices
     * @returns 
     */
    public getGatewayDevicesFromDB( gatewayId: number ): Promise<EnviromentalDevice[]> {
        var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id WHERE g.id = " + gatewayId;
        
        return new Promise<EnviromentalDevice[]> ((resolve: any, reject: any) => {
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

                    let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                    resolve(enviromentalDevices);
                })

            })
        })
    }

    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDeviceInDB() -> boolean
     * 
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns 
     */
    public storeDeviceInDB( enviromentalDevice: EnviromentalDevice ): Promise<boolean> {

        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO device (identifier, gateway_id, name, latitude, longitude, status) VALUES ('"+ enviromentalDevice.getMac() +"',"+ enviromentalDevice.getGatewayId() +", '"+ enviromentalDevice.getName() +"', "+ enviromentalDevice.getCoords().latitude +", "+ enviromentalDevice.getCoords().longitude +", 0)";

        return new Promise<boolean> ((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(false)
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // Si la consulta falla
                    if (err) {
                        reject(false)
                    }

                    resolve(true)
                })

            })
        })
    }

    /**
     * Get enviromental devices from an admin
     * adminId: N, pageSize: N, pageIndex: N -> getAdminDevicePaginationFromDB() -> [JSON]
     * 
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns 
     */
    public getAdminDevicePaginationFromDB( adminId: number, pageSize: number, pageIndex: number) : Promise<EnviromentalDevice[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

         var query = "SELECT d.* FROM device ORDER BY d.id DESC LIMIT "+ firstValue + ', ' + secondValue;

        return new Promise<EnviromentalDevice[]> ((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    
                    // If connection fails
                    if (err || results == undefined || results.length == 0) {
                        reject()
                    }
                                     
                    let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                    resolve(enviromentalDevices);
                })

            })
        })
    }

    /**
     * Get all enviromental devices from a council
     * councilId: N, pageSize: N, pageIndex: N -> getAllAdminDevicesFromDB() -> [JSON]
     * 
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns 
     */
    public getCouncilDevicePaginationFromDB( councilId: number, pageSize: number, pageIndex: number) : Promise<EnviromentalDevice[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

         var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id INNER JOIN council AS c ON c.id = g.council_id WHERE c.id = "+ councilId +" ORDER BY d.id DESC LIMIT "+ firstValue + ', ' + secondValue;

        return new Promise<EnviromentalDevice[]> ((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    
                    // If connection fails
                    if (err || results == undefined || results.length == 0) {
                        reject()
                    }
                                     
                    let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                    resolve(enviromentalDevices);
                })

            })
        })
    }
}