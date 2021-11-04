/**
 * Name: MeasureLogic.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Logic for measures feature
 */

import Measure from "./Measure";

 export default class MeasureLogic {

    // Database handler
    //private measureDB: MeasureDatabaseHandler = new MeasureDatabaseHandler();

    // Constructor
    constructor() {
    }

    // Logic methods
    public async getAllMeasuresByDeviceId( deviceId: number ) : Promise<Measure[]> {
        return new Promise<Measure[]>((resolve, reject) => {
            resolve([]);
            /*this.enviromentalDeviceDB.getDeviceByIdFromDB( deviceId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })*/
        })   
    }

    public async storeMeasure( measure: Measure ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
            /*this.enviromentalDeviceDB.getDeviceByIdFromDB( deviceId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })*/
        }) 
    }
 }