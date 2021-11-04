"use strict";
/**
 * Name: MeasureLogic.ts
 * Date: 04 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Logic for measures feature
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
const MeasureDatabaseHandler_1 = __importDefault(require("./MeasureDatabaseHandler"));
class MeasureLogic {
    // Constructor
    constructor() {
        // Database handler
        this.measureDB = new MeasureDatabaseHandler_1.default();
    }
    // Logic methods
    /**
     * Get the measures of a device
     * deviceId: N -> getAllMeasuresByDeviceId() -> [Measure]
     *
     * @param deviceId
     * @returns
     */
    getAllMeasuresByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                resolve([]);
                /*this.enviromentalDeviceDB.getDeviceByIdFromDB( deviceId )
                    .then( res => {
                        resolve(res)
                    })
                    .catch( err => {
                        reject(err)
                    })*/
            });
        });
    }
    storeMeasure(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.storeMeasureInDB(measure)
                    .then(res => {
                    resolve(true);
                })
                    .catch(err => {
                    reject(false);
                });
            });
        });
    }
}
exports.default = MeasureLogic;
