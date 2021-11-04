/**
 * Name: MeasureLogic.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Logic for measures feature
 */

 import db from "../database";
 import Measure from "./Measure";

 export default class MeasureDatabaseHandler {

    // Methods
    public async getAllMeasuresByDeviceIdFromDB( deviceId: number ) : Promise<Measure[]> {
        // Get the measures from the json/csv

        return new Promise< Measure[]> ((resolve: any, reject: any) => {
            reject()
            resolve()
        })
    }

    public async storeMeasureInDB( measure: Measure ): Promise<boolean> {
        // Get the measures from the json/csv

        return new Promise< boolean> ((resolve: any, reject: any) => {
            reject()
            resolve()
        })
    }

 }