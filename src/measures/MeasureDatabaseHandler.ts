/**
 * Name: MeasureDatabaseHandler.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the measures feature
 */

import db from "../database";
import Measure from "./Measure";
const fs = require('fs')
import measures from "../../db/measures.json"
import Utils from "../Utils";

export default class MeasureDatabaseHandler {

    /**
     * Get user measures
     * userId: N -> getUserMeasures() -> [Measure]
     * 
     * @param userId id of the user we want to retrieve the measures from
     * @returns 
     */
    public async getUserMeasuresFromDB(userId: number): Promise<Measure[]> {
        var query = "SELECT `measure`.* FROM `user_device` INNER JOIN `device` ON" +
            " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
            " INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` WHERE `user_device`.`user_id` = " + userId + ";";

        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting user measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting user measures", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("user measures retrieved succesfully", results));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no user measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all user measures", error))
                    }
                })

            })
        })
    }

    /**
        * Get user measures
        * userId: N -> getUserMeasures() -> [Measure]
        * 
        * @param userId id of the user we want to retrieve the measures from
        * @returns 
        */
    public async insertMeasureInDB(measure: Measure): Promise<Measure[]> {
        console.log(measure)
        var query = "INSERT INTO `measure` (`sensor_id`, `value`, `timestamp`, `unit`) VALUES ('"+measure.getSensorId()
        +"', '"+measure.getValue()+"', '"+measure.getDate()+"', '"+measure.getUnit()+"');";

        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error inserting measure", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error inserting measure", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("measure inserted succesfully", results.insertId));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("inserting measure didn't work"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error inserting measure", error))
                    }
                })

            })
        })
    }

    /**
     * Get council measures
     * councilId: N -> getAdminMeasures() -> [Measure]
     * 
     * @param councilId id of the council we want to retrieve the measures from
     * @returns 
     */
    public async getAdminMeasuresFromDB(councilId: number): Promise<Measure[]> {
        var query = "SELECT measure.* FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id INNER JOIN " +
            "sensor ON sensor.device_id=device.id INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` " +
            "WHERE gateway.council_id=" + councilId + ";";
        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting user measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting council measures", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("council measures retrieved succesfully", results));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no council measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all council measures", error))
                    }
                })

            })
        })
    }

    /**
     * Get all measures
     * getRootMeasures() -> [Measure]
     *  
     * @returns 
     */
    public async getRootMeasuresFromDB(): Promise<Measure[]> {
        var query = "SELECT * FROM `measure`;";
        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting all measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting all measures", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("all measures retrieved succesfully", results));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no user measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all measures", error))
                    }
                })

            })
        })
    }

    /**
 * Get user measures
 * userId: N -> getUserMeasures() -> [Measure]
 * 
 * @param userId id of the user we want to retrieve the measures from
 * @returns 
 */
    public async getUserMeasuresCountFromDB(userId: number): Promise<Measure[]> {
        var query = "SELECT COUNT(*) as count FROM `user_device` INNER JOIN `device` ON" +
            " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
            " INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` WHERE `user_device`.`user_id` = " + userId + ";";

        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting user measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting user measures", err))
                    }
                    try {

                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("user measures retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no user measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all user measures", error))
                    }
                })

            })
        })
    }

    /**
     * Get council measures
     * councilId: N -> getAdminMeasures() -> [Measure]
     * 
     * @param councilId id of the council we want to retrieve the measures from
     * @returns 
     */
    public async getAdminMeasuresCountFromDB(councilId: number): Promise<Measure[]> {
        var query = "SELECT COUNT(*) as count FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id INNER JOIN " +
            "sensor ON sensor.device_id=device.id INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` " +
            "WHERE gateway.council_id=" + councilId + ";";
        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting user measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting council measures", err))
                    }
                    try {
                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("council measures retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no council measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all council measures", error))
                    }
                })

            })
        })
    }

    /**
     * Get all measures
     * getRootMeasures() -> [Measure]
     *  
     * @returns 
     */
    public async getRootMeasuresCountFromDB(): Promise<Measure[]> {
        var query = "SELECT COUNT(*) as count FROM `measure`;";
        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting all measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting all measures", err))
                    }
                    try {
                        if (results[0].count != 0) {
                            resolve(Utils.generateLogicSuccess("all measures retrieved succesfully", results[0].count));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no user measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all measures", error))
                    }
                })

            })
        })
    }

    /**
* Get user measures
* userId: N -> getUserMeasures() -> [Measure]
* 
* @param userId id of the user we want to retrieve the measures from
* @returns 
*/
    public async getUserMeasuresPaginatedFromDB(userId: number, pageSize: number, pageIndex: number): Promise<Measure[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT `measure`.* FROM `user_device` INNER JOIN `device` ON" +
            " `user_device`.`device_id` = `device`.`id` INNER JOIN `sensor` ON `device`.`id` = `sensor`.`device_id`" +
            " INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` WHERE `user_device`.`user_id` = " + userId
            + " ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue + ";";

        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting user measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting user measures", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("user measures retrieved succesfully", results));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no user measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all user measures", error))
                    }
                })

            })
        })
    }

    /**
     * Get council measures
     * councilId: N -> getAdminMeasures() -> [Measure]
     * 
     * @param councilId id of the council we want to retrieve the measures from
     * @returns 
     */
    public async getAdminMeasuresPaginatedFromDB(councilId: number, pageSize: number, pageIndex: number): Promise<Measure[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT measure.* FROM `gateway` INNER JOIN device ON device.gateway_id = gateway.id INNER JOIN " +
            "sensor ON sensor.device_id=device.id INNER JOIN `measure` ON `measure`.`sensor_id` = `sensor`.`id` " +
            "WHERE gateway.council_id=" + councilId + " ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue + ";";

        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting user measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting council measures", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("council measures retrieved succesfully", results));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no council measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all council measures", error))
                    }
                })

            })
        })
    }

    /**
     * Get all measures
     * getRootMeasures() -> [Measure]
     *  
     * @returns 
     */
    public async getRootMeasuresPaginatedFromDB(pageSize: number, pageIndex: number): Promise<Measure[]> {
        const firstValue = (pageSize * pageIndex) - pageSize;
        const secondValue = (pageSize * pageIndex);

        var query = "SELECT * FROM `measure` ORDER BY id DESC LIMIT " + firstValue + ', ' + secondValue + ";";
        return new Promise<Measure[]>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(Utils.generateLogicError("error getting all measures", error))
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(Utils.generateLogicError("error getting all measures", err))
                    }
                    try {
                        if (results) {
                            resolve(Utils.generateLogicSuccess("all measures retrieved succesfully", results));
                        } else {
                            resolve(Utils.generateLogicSuccessEmpty("no user measures found"));
                        }
                    } catch (error) {
                        reject(Utils.generateLogicError("error getting all measures", error))
                    }
                })

            })
        })
    }

    /**
     * Get the measurements given a device ID
     * deviceId: N -> getAllMeasuresByDeviceFromDB() -> [Measure]
     * 
     * @param deviceId 
     * @returns [Measure]
     */
    public async getAllMeasuresByDeviceIdFromDB(deviceId: number): Promise<Measure[]> {

        return new Promise<Measure[]>((resolve: any, reject: any) => {
            let measur = fs.readFileSync("/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json", 'utf-8');
            let array = JSON.parse(measur);
            let res: any = [];

            array.forEach((element: any) => {
                let measure = new Measure();
                let ss = JSON.parse(element)
                measure.setSensorId(ss.sensor_id)
                measure.setDate(ss.date)
                measure.setValue(ss.value)
                measure.setUnit(ss.unit)
                res.push(measure)
            });

            resolve(res)
        })
    }

    /**
     * Save a measure in the database
     * measure: Measure -> storeMeasureInDB() -> boolean
     * 
     * @param measure 
     * @returns boolean
     */
    public async storeMeasureInDB(measure: Measure): Promise<boolean> {
        return new Promise<boolean>((resolve: any, reject: any) => {
            let measur = fs.readFileSync("/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json", 'utf-8');
            let array = JSON.parse(measur);
            array.push(JSON.stringify(measure.toObject()))

            fs.writeFileSync('/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json', JSON.stringify(array))
            resolve(true)
        })
    }

}