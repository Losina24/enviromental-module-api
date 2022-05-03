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
     * Get user measures ( * PAGINATED * )
     * userId: N -> insertMeasure() -> [Measure]
     *
     * @param userId id of the user we want to retrieve the measures from
     * @returns
     */
    insertMeasure(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.insertMeasureInDB(measure)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
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
                this.measureDB.getDeviceMeasuresFromDB(deviceId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get user measures ( * COUNT * )
     * userId: N -> getUserMeasuresCount() -> [Measure]
     *
     * @param userId id of the user we want to retrieve the measures from
     * @returns
     */
    getUserMeasuresCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getUserMeasuresCountFromDB(userId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get council measures ( * COUNT * )
     * councilId: N -> getAdminMeasuresCount() -> [Measure]
     *
     * @param councilId id of the council we want to retrieve the measures from
     * @returns
     */
    getAdminMeasuresCount(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getAdminMeasuresCountFromDB(councilId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all measures ( * COUNT * )
     * getRootMeasuresCount() -> [Measure]
     *
     * @returns
     */
    getRootMeasuresCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getRootMeasuresCountFromDB()
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
 * Get user measures ( * PAGINATED * )
 * userId: N -> getUserMeasuresPaginated() -> [Measure]
 *
 * @param userId id of the user we want to retrieve the measures from
 * @returns
 */
    getUserMeasuresPaginated(userId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getUserMeasuresPaginatedFromDB(userId, pageSize, pageIndex)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get council measures ( * PAGINATED * )
     * councilId: N -> getAdminMeasuresPaginated() -> [Measure]
     *
     * @param councilId id of the council we want to retrieve the measures from
     * @returns
     */
    getAdminMeasuresPaginated(councilId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getAdminMeasuresPaginatedFromDB(councilId, pageSize, pageIndex)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all measures ( * PAGINATED * )
     * getRootMeasuresPaginated() -> [Measure]
     *
     * @returns
     */
    getRootMeasuresPaginated(pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getRootMeasuresPaginatedFromDB(pageSize, pageIndex)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
* Get user measures
* userId: N -> getUserMeasures() -> [Measure]
*
* @param userId id of the user we want to retrieve the measures from
* @returns
*/
    getUserMeasures(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getUserMeasuresFromDB(userId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get council measures
     * councilId: N -> getAdminMeasures() -> [Measure]
     *
     * @param councilId id of the council we want to retrieve the measures from
     * @returns
     */
    getAdminMeasures(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getAdminMeasuresFromDB(councilId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get council measures
     * councilId: N -> getAdminMeasures() -> [Measure]
     *
     * @param councilId id of the council we want to retrieve the measures from
     * @returns
     */
    getLastSensorMeasure(sensorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getSensorLastMeasureFromDB(sensorId)
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Get all measures
     * getRootMeasures() -> [Measure]
     *
     * @returns
     */
    getRootMeasures() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.measureDB.getRootMeasuresFromDB()
                    .then(res => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
}
exports.default = MeasureLogic;
