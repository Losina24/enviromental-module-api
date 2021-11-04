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

        return new Promise<Measure[]> ((resolve: any, reject: any) => {
            let measur = fs.readFileSync("/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json", 'utf-8');
            let array = JSON.parse(measur);
            let res: any = [];
            
            array.forEach((element:any) => {
                let measure = new Measure();
                let ss = JSON.parse(element)
                measure.setSensorId(ss.sensor_id)
                measure.setDate(ss.date)
                measure.setType(ss.type)
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