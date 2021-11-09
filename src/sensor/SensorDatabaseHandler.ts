/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the database queries of the sensor device feature
 */

import db from "../database";
import Sensor from "./Sensor";

export default class SensorDatabaseHandler {

    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    private queryResultsToSensors(results: object[]): Sensor[] {
        let sensors: Sensor[] = [];

        results.forEach((sensorRow: any) => {
            let sensor = new Sensor();

            sensor.setId(sensorRow.id)
            sensor.setDeviceEUI(sensorRow.device_eui);
            sensor.setDeviceId(sensorRow.device_id);
            sensor.setName(sensorRow.name);
            // posible enum
            sensor.setType(sensorRow.sensor_type_id);
            sensor.setStatus(sensorRow.status);
            sensors.push(sensor)
        });

        return sensors
    }

    // Logic Methods 
    /**
     * Get the information about a sensor given their ID from the database
     * sensorId: N -> getSensorByIdFromDB() -> JSON
     *
     * @param sensorId - ID of the sensor you want to get data from
     * @returns object
     */
    public getSensorByIdFromDB(sensorId: number): Promise<Sensor> {
        console.log("getSensorDB")
        var query = "SELECT * FROM sensor WHERE id = " + sensorId;
        console.log(query)
        return new Promise<Sensor>((resolve: any, reject: any) => {
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
                    let sensor = new Sensor()
                    if (results.length != 0) {
                        sensor.setId(results[0].id)
                        sensor.setDeviceEUI(results[0].device_eui);
                        sensor.setDeviceId(results[0].device_id);
                        sensor.setName(results[0].name);
                        // posible Enum
                        sensor.setType(([results[0].sensor_type_id]).toString());
                        sensor.setStatus(results[0].status);
                    }
                    resolve(sensor)
                })

            })
        })
    }

    /**
     * Get all sensors of a user from the database
     * userId: N -> getAllUserSensorsFromDB() -> [JSON]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns object[]:
     */
    public getAllUserSensorsFromDB(userId: number): Promise<Sensor[]> {
        var query = "SELECT `sensor`.`id`,`sensor`.`sensor_type_id`,`sensor`.`device_id`,`sensor`." +
            "`device_eui`,`sensor`.`name`,`sensor`.`status` FROM `user_device` INNER JOIN `device` ON" +
            " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
            " WHERE `user_device`.`user_id` = " + userId + ";";
        return new Promise<Sensor[]>((resolve: any, reject: any) => {
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

                    let sensors: Sensor[] = []
                    if (results.length != 0) {
                        sensors = this.queryResultsToSensors(results)
                    }
                    resolve(sensors)
                })

            })
        })
    }

    /**
     * Get user related sensors with pagination format
     * userId: N, pageSize: N, pageIndex: N -> getUserSensorPaginationFromDB() -> [JSON]
     *
     * @param userId - ID of the user u want to get sensors from
     * @param pageSize - Number of devices returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    public getUserSensorPaginationFromDB(userId: number, pageSize: number, pageIndex: number): Promise<Sensor[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT `sensor`.`id`,`sensor`.`sensor_type_id`,`sensor`.`device_id`,`sensor`." +
            "`device_eui`,`sensor`.`name`,`sensor`.`status` FROM `user_device` INNER JOIN `device` ON" +
            " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
            " WHERE `user_device`.`user_id` = " + userId + " ORDER BY `sensor`.`id` DESC LIMIT " + firstValue + ", " + secondValue + ";"
        return new Promise<Sensor[]>((resolve: any, reject: any) => {
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

                    let sensors: Sensor[] = []
                    if (results.length != 0) {
                        sensors = this.queryResultsToSensors(results)
                    }
                    resolve(sensors)
                })

            })
        })
    }

    /**
     * Get all council sensors
     * councilId: N -> getAllCouncilSensorsFromDB() -> [JSON]
     *
     * @param councilId - ID of the council that you want to get all sensors from
     * @returns
     */
    // obtengo los gateway con el councilId -> inner join -> obtengo los device con el gateway id
    public getAllCouncilSensorsFromDB(councilId: number): Promise<Sensor[]> {
        var query = "SELECT `sensor`.`id`,`sensor`.`sensor_type_id`,`sensor`.`device_id`,`sensor`.`device_eui`," +
            "`sensor`.`name`,`sensor`.`status` FROM `gateway` INNER JOIN `device` ON `gateway`.`id`= `device`." +
            "`gateway_id` INNER JOIN `user_device` ON `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor`" +
            " ON `device`.`id` = `sensor`.`device_id` WHERE `gateway`.`council_id` = " + councilId + ";"
        return new Promise<Sensor[]>((resolve: any, reject: any) => {
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

                    let sensors: Sensor[] = []
                    if (results.length != 0) {
                        sensors = this.queryResultsToSensors(results)
                    }
                    resolve(sensors)
                })

            })
        })
    }

    /**
     * Get all council related sensors
     * councilId: N, pageSize: N, pageIndex: N -> getCouncilSensorPaginationFromDB() -> [JSON]
     *
     * @param councilId - ID of the council you want to get the sensors from
     * @param pageSize - Number of sensors returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    public getCouncilSensorPaginationFromDB(councilId: number, pageSize: number, pageIndex: number): Promise<Sensor[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT `sensor`.`id`,`sensor`.`sensor_type_id`,`sensor`.`device_id`,`sensor`.`device_eui`," +
            "`sensor`.`name`,`sensor`.`status` FROM `gateway` INNER JOIN `device` ON `gateway`.`id`= `device`." +
            "`gateway_id` INNER JOIN `user_device` ON `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor`" +
            " ON `device`.`id` = `sensor`.`device_id` WHERE `gateway`.`council_id` = " + councilId + " " +
            "ORDER BY `sensor`.`id` DESC LIMIT " + firstValue + ", " + secondValue + ";"
        return new Promise<Sensor[]>((resolve: any, reject: any) => {
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

                    let sensors: Sensor[] = []
                    if (results.length != 0) {
                        sensors = this.queryResultsToSensors(results)
                    }
                    resolve(sensors)
                })

            })
        })
    }

    /**
     * Create new sensor in database
     * sensor: Sensor -> storeSensorInDB() -> [JSON]
     *
     * @param sensor - Sensor we want to store in database
     * @returns
     */
    public storeSensorInDB(sensor: Sensor): Promise<number> {
        var query = "INSERT INTO `sensor` (`sensor_type_id`, `device_id`, `device_EUI`, `name`, `status`)" +
            " VALUES ('"+sensor.getType()+"', '"+sensor.getDeviceId()+"', '"+sensor.getDeviceEUI()+"', '"+
            sensor.getName()+"', '"+sensor.getStatus()+"');"
        return new Promise<number>((resolve: any, reject: any) => {
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
                    console.log(results)

                    if (results != undefined){
                        resolve(results.insertId)
                    }
                    resolve()
                })

            })
        })
    }

    /**
     * Get admin related sensors with pagination format
     * adminId: N, pageSize: N, pageIndex: N -> getAdminSensorPaginationFromDB() -> [Sensor]
     *
     * @param adminId - ID of the admin that you want to get all the sensors from
     * @param pageSize - Number of sensors returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    public getAdminSensorPaginationFromDB(adminId: number, pageSize: number, pageIndex: number): Promise<Sensor[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT * FROM `user` INNER JOIN `gateway` ON `gateway`.`council_id`=`user`.`council_id` " +
            "INNER JOIN `device` ON `gateway`.`id`= `device`.`gateway_id` INNER JOIN `user_device` ON " +
            "`user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id` " +
            "WHERE `user`.id=" + adminId + " ORDER BY `sensor`.`id` DESC LIMIT " + firstValue + "," + secondValue + ";"
        return new Promise<Sensor[]>((resolve: any, reject: any) => {
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

                    let sensors: Sensor[] = []
                    if (results.length != 0) {
                        sensors = this.queryResultsToSensors(results)
                    }
                    resolve(sensors)
                })

            })
        })
    }

    /**
     * Get all admin related sensors from database
     * adminId: N, pageSize: N, pageIndex: N -> getAdminAllSensorsFromDB() -> [JSON]
     *
     * @param adminId - ID of the admin that you want to get all the sensors from

     * @returns
     */
    public getAdminAllSensorsFromDB(adminId: number): Promise<Sensor[]> {
        var query = "SELECT * FROM `user` INNER JOIN `gateway` ON `gateway`.`council_id`=`user`.`council_id` " +
            "INNER JOIN `device` ON `gateway`.`id`= `device`.`gateway_id` INNER JOIN `user_device` ON " +
            "`user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id` " +
            "WHERE `user`.id=" + adminId + ";"
        console.log(query)
        return new Promise<Sensor[]>((resolve: any, reject: any) => {
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

                    let sensors: Sensor[] = []
                    if (results.length != 0) {
                        sensors = this.queryResultsToSensors(results)
                    }
                    resolve(sensors)
                })

            })
        })
    }


    /**
     * Get all device related sensors
     * deviceId: N -> getAllAdminDevicesFromDB() -> [JSON]
     *
     * @param deviceId - ID of the device we want to get the sensors from
     * @returns
     */
    public getDeviceSensorsFromDB(deviceId: number): Promise<Sensor[]> {
        var query = "SELECT * FROM `sensor` WHERE `device_id`=" + deviceId + ";"
        return new Promise<Sensor[]>((resolve: any, reject: any) => {
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

                    let sensors: Sensor[] = []
                    if (results.length != 0) {
                        sensors = this.queryResultsToSensors(results)
                    }
                    resolve(sensors)
                })

            })
        })
    }

    /**
     * Remove a sensor
     * sensorId: N -> removeSensor()
     *
     * @param sensorId - ID of the sensor we want to delete
     * @returns
     */
    public removeSensorInDB(sensorId: number): Promise<void> {
        var query = "DELETE FROM `sensor` WHERE `id`=" + sensorId + ";"
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
