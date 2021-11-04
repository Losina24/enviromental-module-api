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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Measure_1 = __importDefault(require("./Measure"));
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
            return new Promise((resolve, reject) => {
                let measur = fs.readFileSync("/Users/losina/Desktop/Desarrollo/enviromental-module-api/db/measures.json", 'utf-8');
                let array = JSON.parse(measur);
                let res = [];
                array.forEach((element) => {
                    let measure = new Measure_1.default();
                    let ss = JSON.parse(element);
                    measure.setSensorId(ss.sensor_id);
                    measure.setDate(ss.date);
                    measure.setType(ss.type);
                    measure.setValue(ss.value);
                    measure.setUnit(ss.unit);
                    res.push(measure);
                });
                resolve(res);
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
