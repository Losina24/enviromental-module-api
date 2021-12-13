"use strict";
/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the logic of the sensor feature
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
const UserDatabaseHandler_1 = __importDefault(require("./UserDatabaseHandler"));
class UserLogic {
    // Constructor
    constructor() {
        // This atribute is used to manage the db interactions in the logic
        this.userDB = new UserDatabaseHandler_1.default();
    }
    // Logic Methods
    /**
     * Checks user login with the given credentials
     * email: Text, password: Text -> login()
     *
     * @param email - user email
     * @param password - user password
     * @returns
     */
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.userDB.loginCheckDB(email, password)
                    .then((res) => {
                    // Loggin failed
                    if (!res) {
                        resolve(false);
                    }
                    // Login succeded
                    console.log("loginCheck");
                    console.log(res);
                    let role;
                    if (res.roleId == 1) {
                        role = "root";
                    }
                    else if (res.roleId == 2) {
                        role = "admin";
                    }
                    else if (res.roleId == 3) {
                        role = "user";
                    }
                    res.role = role;
                    resolve({
                        userId: res.id,
                        name: res.name,
                        role: res.role,
                        councilId: res.councilId
                    });
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get user information by given id
     * userId: N -> getUserById() -> user: User
     *
     * @param userId - ID of the user you want to get data from
     * @returns
     */
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.userDB.getUserByIdFromDB(userId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all users from a council
     * councilId: N -> getCouncilUsersFromDB() -> users: [User]
     *
     * @param councilId - ID of the council that you want to get all users from
     * @returns
     */
    getCouncilUsers(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.userDB.getCouncilUsersFromDB(councilId)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all users from a council (* COUNT *)
     * councilId: N -> getCouncilUsersCount() -> count: N
     *
     * @param councilId - ID of the council that you want to get all users from
     * @returns
     */
    getCouncilUsersCount(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.userDB.getCouncilUsersCountFromDB(councilId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all users (* COUNT *)
     * getAllUsersCount() -> count: N
     *
     * @returns
     */
    getAllUsersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.userDB.getAllUsersCountFromDB()
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Create a new user
     * user: User -> createUser()
     *
     * @param user - user you want to create in db
     * @returns
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.userDB.createUserInDB(user)
                    .then(res => {
                    console.log("logicaRes");
                    resolve();
                })
                    .catch(err => {
                    reject();
                });
            });
        });
    }
    /**
     * Edit user data
     * user: User -> editUser()
     *
     * @param user - user you want to edit in db
     * @returns
     */
    editUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.userDB.editUserInDB(user)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Remove user on database
     * userId: N -> removeUser()
     *
     * @param userId - id of the user you want to delete
     * @returns
     */
    removeUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.userDB.removeUserInDB(userId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
}
exports.default = UserLogic;
