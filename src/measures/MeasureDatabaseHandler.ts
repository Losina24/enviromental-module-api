/**
 * Name: MeasureDatabaseHandler.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the measures feature
 */

import Measure from "./Measure";
const fs = require('fs')
import measures from "../../db/measures.json"

export default class MeasureDatabaseHandler {

    /**
     * Get the measurements given a device ID
     * deviceId: N -> getAllMeasuresByDeviceFromDB() -> [Measure]
     * 
     * @param deviceId 
     * @returns [Measure]
     */
    public async getAllMeasuresByDeviceIdFromDB( deviceId: number ) : Promise<Measure[]> {
        // Get the measures from the json/csv

        return new Promise< Measure[]> ((resolve: any, reject: any) => {
            reject()
            resolve()
        })
    }

    /**
     * Save a measure in the database
     * measure: Measure -> storeMeasureInDB() -> boolean
     * 
     * @param measure 
     * @returns boolean
     */
    public async storeMeasureInDB( measure: Measure ): Promise<boolean> {
        return new Promise<boolean> ((resolve: any, reject: any) => {
            let measur = fs.readFileSync("/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json", 'utf-8');
            let array = JSON.parse(measur);
            array.push(JSON.stringify(measure.toObject()))

            fs.writeFileSync('/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json', JSON.stringify(array))
            resolve(true)
        })
    }

 }