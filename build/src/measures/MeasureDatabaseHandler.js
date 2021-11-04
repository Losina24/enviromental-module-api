"use strict";
/**
 * Name: MeasureDatabaseHandler.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the measures feature
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class MeasureDatabaseHandler {
    /**
     * Get the measurements given a device ID
     * deviceId: N -> getAllMeasuresByDeviceFromDB() -> [Measure]
     *
     * @param deviceId
     * @returns [Measure]
     */
    getAllMeasuresByDeviceIdFromDB(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the measures from the json/csv
            return new Promise((resolve, reject) => {
                reject();
                resolve();
            });
        });
    }
    /**
     * Save a measure in the database
     * measure: Measure -> storeMeasureInDB() -> boolean
     *
     * @param measure
     * @returns boolean
     */
    storeMeasureInDB(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let measur = fs.readFileSync("/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json", 'utf-8');
                let array = JSON.parse(measur);
                array.push(JSON.stringify(measure.toObject()));
                fs.writeFileSync('/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json', JSON.stringify(array));
                resolve(true);
            });
        });
    }
}
exports.default = MeasureDatabaseHandler;
