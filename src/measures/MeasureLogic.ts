/**
 * Name: MeasureLogic.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Logic for measures feature
 */

import Measure from "./Measure";
import MeasureDatabaseHandler from "./MeasureDatabaseHandler";

export default class MeasureLogic {

    // Database handler
    private measureDB: MeasureDatabaseHandler = new MeasureDatabaseHandler();

    // Constructor
    constructor() {
    }

    // Logic methods

    /**
     * Get user measures ( * PAGINATED * )
     * userId: N -> insertMeasure() -> [Measure]
     * 
     * @param userId id of the user we want to retrieve the measures from
     * @returns 
     */
    public async insertMeasure(measure: Measure): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.measureDB.insertMeasureInDB(measure)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the measures of a device
     * deviceId: N -> getAllMeasuresByDeviceId() -> [Measure]
     * 
     * @param deviceId 
     * @returns 
     */
     public async getAllMeasuresByDeviceId( deviceId: number ) : Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getDeviceMeasuresFromDB(deviceId)
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })   
    }

    /**
     * Get user measures ( * COUNT * )
     * userId: N -> getUserMeasuresCount() -> [Measure]
     * 
     * @param userId id of the user we want to retrieve the measures from
     * @returns 
     */
    public async getUserMeasuresCount(userId: number): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getUserMeasuresCountFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get council measures ( * COUNT * )
     * councilId: N -> getAdminMeasuresCount() -> [Measure]
     * 
     * @param councilId id of the council we want to retrieve the measures from
     * @returns 
     */
    public async getAdminMeasuresCount(councilId: number): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getAdminMeasuresCountFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all measures ( * COUNT * )
     * getRootMeasuresCount() -> [Measure]
     *  
     * @returns 
     */
    public async getRootMeasuresCount(): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getRootMeasuresCountFromDB()
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
 * Get user measures ( * PAGINATED * )
 * userId: N -> getUserMeasuresPaginated() -> [Measure]
 * 
 * @param userId id of the user we want to retrieve the measures from
 * @returns 
 */
    public async getUserMeasuresPaginated(userId: number, pageSize: number, pageIndex: number): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getUserMeasuresPaginatedFromDB(userId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get council measures ( * PAGINATED * )
     * councilId: N -> getAdminMeasuresPaginated() -> [Measure]
     * 
     * @param councilId id of the council we want to retrieve the measures from
     * @returns 
     */
    public async getAdminMeasuresPaginated(councilId: number, pageSize: number, pageIndex: number): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getAdminMeasuresPaginatedFromDB(councilId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all measures ( * PAGINATED * )
     * getRootMeasuresPaginated() -> [Measure]
     *  
     * @returns 
     */
    public async getRootMeasuresPaginated(pageSize: number, pageIndex: number): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getRootMeasuresPaginatedFromDB(pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
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
    public async getUserMeasures(userId: number): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getUserMeasuresFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
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
    public async getAdminMeasures(councilId: number): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getAdminMeasuresFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all measures
     * getRootMeasures() -> [Measure]
     *  
     * @returns 
     */
    public async getRootMeasures(): Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            this.measureDB.getRootMeasuresFromDB()
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    public async storeMeasure(measure: Measure): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            this.measureDB.storeMeasureInDB(measure)
                .then(res => {
                    resolve(true);
                })
                .catch(err => {
                    reject(false);
                })
        })
    }
}