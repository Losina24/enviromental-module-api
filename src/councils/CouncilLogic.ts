/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the logic of the sensor feature
 */

import Council from "./Council";
import CouncilDatabaseHandler from "./CouncilDatabaseHandler";

export default class CouncilLogic {

    // This atribute is used to manage the db interactions in the logic
    private councilDB: CouncilDatabaseHandler = new CouncilDatabaseHandler()

    // Constructor
    constructor() {
        
    }

    // Logic Methods 
    /**
     * Get council information by given id
     * councilId: N -> getCouncilById() -> council: Council
     * 
     * @param councilId - ID of the council you want to get data from
     * @returns 
     */
    public async getCouncilById( councilId: number ) : Promise<Council> {
        return new Promise<Council>((resolve, reject) => {
            this.councilDB.getCouncilByIdFromDB( councilId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    public async getAllCouncils( ) : Promise<Council[]> {
        return new Promise<Council[]>((resolve, reject) => {
            this.councilDB.getAllCouncils()
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Create a new council
     * council: Council -> createCouncil()
     * 
     * @param council - council you want to create in db
     * @returns 
     */
    public async createCouncil( council: Council ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.councilDB.createCouncilInDB( council )
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
     * Edit council data
     * council: Council -> editCouncil()
     * 
     * @param council - council you want to edit in db
     * @returns 
     */
    public async editCouncil( council: Council ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.councilDB.editCouncilInDB( council )
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
     * Remove council on database
     * councilId: N -> removeCouncil()
     * 
     * @param councilId - id of the council you want to delete
     * @returns 
     */
    public async removeCouncil( councilId: number ): Promise<void> {
        return new Promise((resolve, reject) => {
            this.councilDB.removeCouncilInDB( councilId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

}
