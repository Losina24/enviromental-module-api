/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the logic of the sensor feature
 */

import User from "./User";
import UserDatabaseHandler from "./UserDatabaseHandler";

export default class UserLogic {

    // This atribute is used to manage the db interactions in the logic
    private userDB: UserDatabaseHandler = new UserDatabaseHandler()

    // Constructor
    constructor() {
        
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
    public async login( email: string, password: string ): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userDB.loginCheckDB( email, password )
                .then( (res: any) => {
                    // Loggin failed
                    if (!res){
                        resolve(false)
                    }
                    // Login succeded
                    console.log("loginCheck")
                    console.log(res)
                    let role: string;
                    if (res.roleId == 1){
                        role = "root"
                    } else if (res.roleId == 2){
                        role = "admin"
                    } else if (res.roleId == 3){
                        role = "user"
                    }
                    res.role = role
                    resolve({
                        userId: res.id,
                        name: res.name,
                        role: res.role,
                        councilId: res.councilId
                    })
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get user information by given id
     * userId: N -> getUserById() -> user: User
     * 
     * @param userId - ID of the user you want to get data from
     * @returns 
     */
    public async getUserById( userId: number ) : Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.userDB.getUserByIdFromDB( userId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all users from a council
     * councilId: N -> getCouncilUsersFromDB() -> users: [User]
     * 
     * @param councilId - ID of the council that you want to get all users from
     * @returns 
     */
    public async getCouncilUsers( councilId: number ): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            this.userDB.getCouncilUsersFromDB( councilId )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    public async getAllUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            this.userDB.getAllUsersFromDB( )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Create a new user
     * user: User -> createUser()
     * 
     * @param user - user you want to create in db
     * @returns 
     */
    public async createUser( user: User ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.userDB.createUserInDB( user )
                .then( res => {
                    console.log("logicaRes")
                    resolve()
                })
                .catch( err => {
                    reject()
                })
        })
    }

    /**
     * Edit user data
     * user: User -> editUser()
     * 
     * @param user - user you want to edit in db
     * @returns 
     */
    public async editUser( user: User ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.userDB.editUserInDB( user )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Remove user on database
     * userId: N -> removeUser()
     * 
     * @param userId - id of the user you want to delete
     * @returns 
     */
    public async removeUser( userId: number ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.userDB.removeUserInDB( userId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }



}
