"use strict";
/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the database queries of the sensor device feature
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const Utils_1 = __importDefault(require("../Utils"));
const Council_1 = __importDefault(require("./Council"));
class CouncilDatabaseHandler {
    // Logic Methods 
    /**
     * Get council information by given id
     * councilId: N -> getCouncilByIdFromDB() -> council: Council
     *
     * @param councilId - ID of the council you want to get data from
     * @returns
     */
    getCouncilByIdFromDB(councilId) {
        var query = "SELECT * FROM `council` WHERE id = " + councilId;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error getting council", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting council", err));
                    }
                    try {
                        let council = new Council_1.default();
                        if (results.length != 0) {
                            council.setId(results[0].id);
                            council.setName(results[0].name);
                            council.setAddress(results[0].address);
                            council.setPhone(results[0].phone_number);
                            council.setEmail(results[0].email);
                            council.setWeb(results[0].web);
                            council.setPostalCode(results[0].postal_code);
                            council.setIban(results[0].iban);
                            resolve(Utils_1.default.generateLogicSuccess("council retrieved succesfully", council));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("no council found with given id"));
                        }
                    }
                    catch (error) {
                        reject(Utils_1.default.generateLogicError("error getting council", error));
                    }
                });
            });
        });
    }
    /**
     * Get council information by given id
     * councilId: N -> getCouncilCountFromDB() -> council: Council
     *
     * @param councilId - ID of the council you want to get data from
     * @returns
     */
    getCouncilCountFromDB() {
        var query = "SELECT COUNT(*) as count FROM `council`;";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error getting councils count", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting councils count", err));
                    }
                    try {
                        if (results[0].count != 0) {
                            resolve(Utils_1.default.generateLogicSuccess("councils count retrieved succesfully", results[0].count));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("user has no related gateways"));
                        }
                    }
                    catch (error) {
                        reject(Utils_1.default.generateLogicError("error getting councils count", error));
                    }
                });
            });
        });
    }
    /**
     * Create a new council
     * council: Council -> createCouncilInDB()
     *
     * @param council - council we want to create
     * @returns
     */
    createCouncilInDB(council) {
        var query = "INSERT INTO `council` (`name`, `address`, `phone_number`, `email`, `web`, `postal_code`, `iban`) " +
            "VALUES ('" + council.getName() + "', '" + council.getAddress() + "', '" + council.getPhone() + "', '" + council.getEmail() + "', '" +
            council.getWeb() + "', '" + council.getPostalCode() + "', '" + council.getIban() + "');";
        console.log(query);
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error getting council", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error getting council", err));
                    }
                    try {
                        if (results != undefined) {
                            resolve(Utils_1.default.generateLogicSuccess("council created succesfully", results.insertId));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("council couldn't be created"));
                        }
                    }
                    catch (error) {
                        reject(Utils_1.default.generateLogicError("error getting council", error));
                    }
                });
            });
        });
    }
    /**
     * Edit council info
     * user: N -> editCouncilInDB()
     *
     * @param council - council with new data
     * @returns
     */
    editCouncilInDB(council) {
        var query = "UPDATE council SET name = '" + council.getName() + "', address = '" + council.getAddress() + "', phone_number = '" + council.getPhone() + "'," +
            "email = '" + council.getEmail() + "', web = '" + council.getWeb() + "', postal_code = '" + council.getPostalCode() + "', iban = '" + council.getIban() + "'" +
            " WHERE id =" + council.getId() + ";";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error updating council", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error updating council", err));
                    }
                    try {
                        if (results.affectedRows == 1) {
                            resolve(Utils_1.default.generateLogicSuccess("council info update succesfully", council));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("council couldn't be updated"));
                        }
                    }
                    catch (error) {
                        reject(Utils_1.default.generateLogicError("error updating council", error));
                    }
                });
            });
        });
    }
    /**
     * Remove a council by given id
     * userId: N -> removeCouncilInDB()
     *
     * @param councilId - ID of the council we want to delete
     * @returns
     */
    removeCouncilInDB(councilId) {
        var query = "DELETE FROM `council` WHERE `id`=" + councilId + ";";
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((error, conn) => {
                // If connection fails
                if (error) {
                    reject(Utils_1.default.generateLogicError("error deleting council", error));
                }
                conn.query(query, (err, results) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject(Utils_1.default.generateLogicError("error deleting council", err));
                    }
                    try {
                        if (results.affectedRows == 1) {
                            resolve(Utils_1.default.generateLogicSuccess("council deleted succesfully", true));
                        }
                        else {
                            resolve(Utils_1.default.generateLogicSuccessEmpty("council couldn't be deleted"));
                        }
                    }
                    catch (error) {
                        reject(Utils_1.default.generateLogicError("error deleting council", error));
                    }
                });
            });
        });
    }
}
exports.default = CouncilDatabaseHandler;
