/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
 */

import db from "../database";
import EnviromentalDevice from "./EnviromentalDevice";
import Utils from "../Utils";

export default class EnviromentalDeviceDatabaseHandler {

    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    private queryResultsToEnviromentalDevices(results: object[]): EnviromentalDevice[] {
        let enviromentalDevices: EnviromentalDevice[] = [];

        results.forEach((element: any) => {
            let device = new EnviromentalDevice();

            device.setId(element.id)
            device.setName(element.name);
            device.setDeviceEUI(element.device_EUI);
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
    public async getDeviceByIdFromDB(deviceId: number): Promise<EnviromentalDevice> {
        const query = "SELECT * FROM device WHERE id = " + deviceId;
        console.log(query)
        return new Promise<EnviromentalDevice>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {
                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting device", error))
                }
                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting device", err))
                    }
                    try {
                        if (results.length != 0) {
                            let device = new EnviromentalDevice();

                            device.setId(results[0].id)
                            device.setName(results[0].name);
                            device.setDeviceEUI(results[0].device_EUI);
                            device.setGatewayId(results[0].gateway_id);
                            device.setCoords([results[0].latitude, results[0].longitude]);
                            device.setStatus(results[0].status);
                            resolve(Utils.generateLogicSuccess("device found with the given id", device))
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting device", error))
                    }
                    resolve(Utils.generateLogicSuccessEmpty("no device found with the given id"))
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
    public getAllUserDevicesFromDB(userId: number): Promise<EnviromentalDevice[]> {
        var query = "SELECT d.* FROM device AS d INNER JOIN user_device AS ud ON d.id = ud.device_id WHERE ud.user_id = " + userId;

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting all user devices", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting all user devices", err))
                    }
                    try {
                        console.log(results)
                        if (results.length != 0) {
                            let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                            resolve(Utils.generateLogicSuccess("user devices retrieved succesfully", enviromentalDevices));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("user has no related devices"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all user devices", error))
                    }
                })

            })
        })
    }

    /**
     * Get all root enviromental devices from the database ( * COUNT * )
     * userId: N -> getAllUserDevicesFromDB() -> [JSON]
     *
     * @returns
     */
    public getAllRootDevicesCountFromDB(): Promise<EnviromentalDevice[]> {
        var query = "SELECT count(*) as count FROM device;"

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting root user devices count", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting root user devices count", err))
                    }
                    try {
                        console.log("results.count")

                        console.log(results[0].count)

                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("root user devices count retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("root user has no related devices"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting root user devices count", error))
                    }
                })
            })
        })
    }

    /**
 * Get all admin enviromental devices from the database ( * COUNT * )
 * userId: N -> getAllUserDevicesFromDB() -> [JSON]
 *
 * @param userId - ID of the user that you want to get all enviromental devices
 * @returns
 */
    public getAllAdminDevicesCountFromDB(councilId: number): Promise<EnviromentalDevice[]> {
        var query = "SELECT COUNT(*) as count FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id  WHERE gateway.council_id=" + councilId + ";"
        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting admin user devices count", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting admin user devices count", err))
                    }
                    try {
                        console.log("results.count")

                        console.log(results[0].count)

                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("admin user devices count retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("admin user has no related devices"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting admin user devices count", err))
                    }
                })
            })
        })
    }

    /**
     * Get all enviromental devices of a user from the database ( * COUNT * )
     * userId: N -> getAllUserDevicesFromDB() -> [JSON]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    public getAllUserDevicesCountFromDB(userId: number): Promise<EnviromentalDevice[]> {
        var query = "SELECT count(*) as count FROM device AS d INNER JOIN user_device AS ud ON d.id = ud.device_id WHERE ud.user_id = " + userId;

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting user devices count", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting user devices count", err))
                    }
                    try {
                        console.log("results.count")

                        console.log(results[0].count)

                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("user devices count retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("user has no related devices"));
                        }
                    } catch (error) {
                        reject(error)
                    }
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
    public async getUserDevicePaginationFromDB(userId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT d.* FROM device AS d INNER JOIN user_device AS u ON d.id = u.device_id WHERE u.user_id = " + userId + " ORDER BY d.id DESC LIMIT " + firstValue + ', ' + secondValue;

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting user devices", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting user devices", err))
                    }

                    try {
                        if (results.length != 0) {
                            let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                            resolve(Utils.generateLogicSuccess("user devices retrieved succesfully", enviromentalDevices));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("user has no related devices"));
                        }
                    } catch (error) {
                        reject(error)
                    }
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
    public getAllCouncilDevicesFromDB(councilId: number): Promise<EnviromentalDevice[]> {
        var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id WHERE g.council_id = " + councilId;

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting council devices", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting council devices", err))
                    }
                    try {
                        if (results.length != 0) {
                            let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                            resolve(Utils.generateLogicSuccess("council devices retrieved succesfully", enviromentalDevices));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("council has no related devices"));
                        }
                    } catch (error) {
                        reject(error)
                    }
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
    public getGatewayDevicesFromDB(gatewayId: number): Promise<EnviromentalDevice[]> {
        var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id WHERE g.id = " + gatewayId;

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting gateway devices", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting gateway devices", err))
                    }
                    try {
                        if (results.length != 0) {
                            let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                            resolve(Utils.generateLogicSuccess("gateway devices retrieved succesfully", enviromentalDevices));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("gateway has no related devices"));
                        }
                    } catch (error) {
                        reject(error)
                    }
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
    public storeDeviceInDB(enviromentalDevice: EnviromentalDevice, userId: any): Promise<any> {

        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO device (device_EUI, gateway_id, name, latitude, longitude, status) VALUES ('" + enviromentalDevice.getDeviceEUI() + "'," + enviromentalDevice.getGatewayId() + ", '" + enviromentalDevice.getName() + "', " + enviromentalDevice.getCoords().latitude + ", " + enviromentalDevice.getCoords().longitude + ", 0)";
        return new Promise<any>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error storing device", error))
                }

                conn.query(query, async (err: any, results: any) => {

                    // Si la consulta falla
                    if (err) {
                        reject(Utils.generateLogicError("error storing device", err))
                    }
                    try {
                        if (results.insertId) {
                            let lastInsertDeviceId = results.insertId
                            await this.linkDeviceToUser(lastInsertDeviceId, userId).then(res => {
                                if (res.http == 200) {
                                    console.log("Creation succeded");
                                    resolve(Utils.generateLogicSuccess("device created and linked to user succesfully", lastInsertDeviceId));
                                } else {
                                    this.removeDeviceInDB(lastInsertDeviceId)
                                    resolve(Utils.generateLogicSuccessEmpty("device removed: couldnt be linked to user "));
                                }
                            })
                        }
                    } catch (error) {
                        reject(error)
                    }

                })

            })
        })
    }

    /**
     * Create link between user and device
     * enviromentalDevice: EnviromentalDevice -> linkDeviceToUser() ->
     *
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns
     */
    public async linkDeviceToUser(deviceId: any, userId: any): Promise<any> {

        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO `user_device` (`user_id`, `device_id`) VALUES (" + userId + ", " + deviceId + ")";
        return new Promise<any>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error linking device to user", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    console.log("**** results ****")
                    console.log(results);
                    // Si la consulta falla
                    if (err) {
                        reject(Utils.generateLogicError("error linking device to user", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("device linked successfully", results))
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("device couldnt be linked"))
                        }
                    } catch (error) {
                        reject(error)
                    }
                })

            })
        })
    }

    /**
     * Remove a device
     * deviceId: N -> removeDevice()
     *
     * @param deviceId - ID of the sensor we want to delete
     * @returns
     */
    public removeDeviceInDB(deviceId: number): Promise<void> {
        var query = "DELETE FROM `device` WHERE `id`=" + deviceId + ";"
        console.log(query);

        return new Promise<void>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {
                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error removing device", error))
                }
                if (conn) {
                    conn.query(query, (err: any, results: any) => {

                        // If connection fails
                        if (err) {
                            reject(Utils.generateLogicError("error linking device to user", err))
                        }
                        try {
                            if (results.affectedRows == 0) {
                                resolve(Utils.generateLogicSuccessEmpty("no device was found with given id"))
                            }
                            resolve(Utils.generateLogicSuccess("device deleted succesfully", undefined))
                        } catch (error) {
                            reject(error)
                        }
                    })
                } else {
                    reject(Utils.generateLogicError("error getting council devices", undefined))
                }
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
    public getAdminDevicePaginationFromDB(adminId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT * FROM device ORDER BY device.id DESC LIMIT " + firstValue + ', ' + secondValue;

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error removing device", error))
                }
                if (conn) {
                    conn.query(query, (err: any, results: any) => {
                        conn.release();

                        // If connection fails
                        if (err) {
                            reject(Utils.generateLogicError("error removing device", err))
                        }
                        try {
                            if (results.length != 0) {
                                let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                                resolve(Utils.generateLogicSuccess("admin devices retrieved succesfully", enviromentalDevices));
                            } else {
                                resolve(Utils.generateLogicSuccessEmpty("admin has no related devices"));
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
                } else {
                    reject(Utils.generateLogicError("error getting council devices", undefined))
                }
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
    public updateEnviromentalDevice(enviromentalDevice: EnviromentalDevice): Promise<EnviromentalDevice[]> {

        var query = "UPDATE device SET device_EUI = '" + enviromentalDevice.getDeviceEUI() + "', gateway_id= '" + enviromentalDevice.getGatewayId() +
            "', name = '" + enviromentalDevice.getName() + "', latitude='" + enviromentalDevice.getLatitude() + "', longitude='" +
            enviromentalDevice.getLongitude() + "', status='" + enviromentalDevice.getStatus() + "' WHERE id = " + enviromentalDevice.getId() + ";"

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error updating device", error))
                }
                if (conn) {
                    conn.query(query, (err: any, results: any) => {
                        conn.release();

                        // If connection fails
                        if (err) {
                            reject(Utils.generateLogicError("error updating device", err))
                        }
                        try {
                            if (results.affectedRows == 1) {
                                resolve(Utils.generateLogicSuccess("device updated successfully", enviromentalDevice));
                            } else {
                                resolve(Utils.generateLogicSuccessEmpty("device has not been updated"));
                            }
                        } catch (error) {
                            reject(Utils.generateLogicError("error updating device", err))
                        }
                    })
                } else {
                    reject(Utils.generateLogicError("error updating device", undefined))
                }
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
    public getCouncilDevicePaginationFromDB(councilId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT d.* FROM device AS d INNER JOIN gateway AS g ON d.gateway_id = g.id INNER JOIN council AS c ON c.id = g.council_id WHERE c.id = " + councilId + " ORDER BY d.id DESC LIMIT " + firstValue + ', ' + secondValue;

        return new Promise<EnviromentalDevice[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting council devices", error))
                }
                if (conn) {
                    conn.query(query, (err: any, results: any) => {
                        conn.release();

                        // If connection fails
                        if (err) {
                            reject(Utils.generateLogicError("error getting council devices", err))
                        }
                        try {
                            if (results.length != 0) {
                                let enviromentalDevices: EnviromentalDevice[] = this.queryResultsToEnviromentalDevices(results)
                                resolve(Utils.generateLogicSuccess("council devices retrieved succesfully", enviromentalDevices));
                            } else {
                                resolve(Utils.generateLogicSuccessEmpty("council has no related devices"));
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
                } else {
                    reject(Utils.generateLogicError("error getting council devices", undefined))
                }
            })
        })
    }
}
