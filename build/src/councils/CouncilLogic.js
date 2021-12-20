"use strict";
/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the logic of the sensor feature
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
const CouncilDatabaseHandler_1 = __importDefault(require("./CouncilDatabaseHandler"));
class CouncilLogic {
    // Constructor
    constructor() {
        // This atribute is used to manage the db interactions in the logic
        this.councilDB = new CouncilDatabaseHandler_1.default();
    }
    // Logic Methods 
    /**
     * Get council information by given id
     * councilId: N -> getCouncilById() -> council: Council
     *
     * @param councilId - ID of the council you want to get data from
     * @returns
     */
    getCouncilById(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.councilDB.getCouncilByIdFromDB(councilId)
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
     * Get all councils with pagination
     * getRootCouncilsPagination() -> councils: Council[]
     *
     * @param pageSize - Number of councils returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getRootCouncilsPagination(pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.councilDB.getRootCouncilsPaginationFromDB(pageSize, pageIndex)
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
     * Get root councils count
     * getCouncilCount() -> council: Council
     *
     * @returns
     */
    getCouncilCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.councilDB.getCouncilCountFromDB()
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
     * Create a new council
     * council: Council -> createCouncil()
     *
     * @param council - council you want to create in db
     * @returns
     */
    createCouncil(council) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.councilDB.createCouncilInDB(council)
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
     * Edit council data
     * council: Council -> editCouncil()
     *
     * @param council - council you want to edit in db
     * @returns
     */
    editCouncil(council) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.councilDB.editCouncilInDB(council)
                    .then(res => {
                    console.log("logicaRes");
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Remove council on database
     * councilId: N -> removeCouncil()
     *
     * @param councilId - id of the council you want to delete
     * @returns
     */
    removeCouncil(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.councilDB.removeCouncilInDB(councilId)
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
exports.default = CouncilLogic;
