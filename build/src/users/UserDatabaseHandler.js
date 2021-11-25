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
const User_1 = __importDefault(require("./User"));
class UserDatabaseHandler {
    // Logic Methods
    /**
     * Checks user login with the given credentials
     * email: Text, password: Text -> login() -> user: User
     *
     * @param userId - ID of the user you want to get data from
     * @returns
     */
    loginCheckDB(email, password) {
        console.log("getSensorDB");
        var query = "SELECT * FROM `user` WHERE `email` = '" + email + "' AND `password` = '" + password + "';";
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
                    if (results.length == 1) {
                        let user = new User_1.default();
                        user.setId(results[0].id);
                        user.setRoleId(results[0].role_id);
                        user.setCouncilId(results[0].council_id);
                        user.setName(results[0].name);
                        user.setSurnames(results[0].surnames);
                        user.setPassword(results[0].password);
                        user.setAddress(results[0].address);
                        user.setPhone(results[0].phone_number);
                        user.setEmail(results[0].email);
                        user.setPostalCode(results[0].postal_code);
                        resolve(user);
                    }
                    else if (results.length == 0) {
                        resolve();
                    }
                });
            });
        });
    }
    /**
     * Get user information by given id
     * userId: N -> getUserByIdFromDB() -> user: User
     *
     * @param userId - ID of the user you want to get data from
     * @returns
     */
    getUserByIdFromDB(userId) {
        console.log("getSensorDB");
        var query = "SELECT * FROM `user` WHERE id = " + userId;
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
                    let user = new User_1.default();
                    if (results.length != 0) {
                        user.setId(results[0].id);
                        user.setRoleId(results[0].role_id);
                        user.setCouncilId(results[0].council_id);
                        user.setName(results[0].name);
                        user.setSurnames(results[0].surnames);
                        user.setPassword(results[0].password);
                        user.setAddress(results[0].address);
                        user.setPhone(results[0].phone_number);
                        user.setEmail(results[0].email);
                        user.setPostalCode(results[0].postal_code);
                    }
                    resolve(user);
                });
            });
        });
    }
    /**
     * Create a new user
     * user: User -> createUserInDB()
     *
     * @param user - user we want to create
     * @returns
     */
    createUserInDB(user) {
        var query = "INSERT INTO `user` (`role_id`, `council_id`, `name`, `surnames`, `password`, `address`," +
            " `phone_number`, `email`, `postal_code`) VALUES ('" + user.getRoleId() + "', '" + user.getCouncilId() + "', " +
            "'" + user.getName() + "','" + user.getSurnames() + "', '" + user.getPassword() + "', '" + user.getAddress() + "'," +
            " '" + user.getPhone() + "', '" + user.getEmail() + "', '" + user.getPostalCode() + "');";
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
     * Edit a user info
     * user: N -> editUserInDB()
     *
     * @param user - user with new data
     * @returns
     */
    editUserInDB(user) {
        var query = "UPDATE User SET role_id = '" + user.getRoleId() + "', council_id = '" + user.getCouncilId() + "'," +
            "name = '" + user.getName() + "', surnames = '" + user.getSurnames() + "', password = '" + user.getPassword() + "'," +
            "address = '" + user.getAddress() + "', phone_number = '" + user.getPhone() + "', email = '" + user.getEmail() + "'," +
            "postal_code = '" + user.getPostalCode() + "' WHERE id = '" + user.getId() + "';";
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
     * Remove a user by given id
     * userId: N -> removeUserInDB()
     *
     * @param userId - ID of the user we want to delete
     * @returns
     */
    removeUserInDB(userId) {
        var query = "DELETE FROM `user` WHERE `id`=" + userId + ";";
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
     * Get all council users
     * councilId: N -> getCouncilUsrs()
     *
     * @param councilId - ID of the council we want to get the users from
     * @returns
     */
    getCouncilUsersFromDB(councilId) {
        var query = "SELECT * FROM `user` WHERE council_id = " + councilId;
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
                    var users = [];
                    if (results.length != 0) {
                        let user = new User_1.default();
                        results.forEach((res) => {
                            user.setId(res.id);
                            user.setRoleId(res.role_id);
                            user.setCouncilId(res.council_id);
                            user.setName(res.name);
                            user.setSurnames(res.surnames);
                            user.setPassword(res.password);
                            user.setAddress(res.address);
                            user.setPhone(res.phone_number);
                            user.setEmail(res.email);
                            user.setPostalCode(res.postal_code);
                            users.push(user);
                        });
                    }
                    resolve(users);
                });
            });
        });
    }
}
exports.default = UserDatabaseHandler;
