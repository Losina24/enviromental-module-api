"use strict";
/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the logic of the enviromental device feature
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
const EnviromentalDevice_1 = __importDefault(require("./EnviromentalDevice"));
class EnviromentaDeviceLogic {
    // Constructor
    constructor() {
    }
    // Logic Methods 
    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getDeviceById(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            var ed = new EnviromentalDevice_1.default();
            return ed;
        });
    }
    /**
     * Get all enviroment devices of a user
     * userId: N -> getAllUserDevices() -> [EnviromentalDevice]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    getAllUserDevices(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var ed = new EnviromentalDevice_1.default();
            var array = [];
            array.push(ed);
            array.push(ed);
            return array;
        });
    }
    /**
     * Get enviromental devices from a user in a pagination format
     * userId: N, pageSize: N, pageIndex: N -> getUserDevicePagination() -> [EnviromentalDevice]
     *
     * @param userId - ID of the user u want to get devices from
     * @param pageSize - Number of devices returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getUserDevicePagination(userId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            var ed = new EnviromentalDevice_1.default();
            var array = [];
            array.push(ed);
            array.push(ed);
            return array;
        });
    }
    /**
     * Get all enviromental devices from a council
     * councilId: N -> getAllCouncilDevices() -> [EnviromentalDevice]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns
     */
    getAllCouncilDevices(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            var ed = new EnviromentalDevice_1.default();
            var array = [];
            array.push(ed);
            array.push(ed);
            return array;
        });
    }
    /**
     * Get enviromental devices of a gateway
     * gatewayId: N -> getGatewayDevices() -> [EnviromentalDevice]
     *
     * @param gatewayId - ID of the gateway that you want to get all enviromental devices
     * @returns
     */
    getAllGatewayDevices(gatewayId) {
        return __awaiter(this, void 0, void 0, function* () {
            var ed = new EnviromentalDevice_1.default();
            var array = [];
            array.push(ed);
            array.push(ed);
            return array;
        });
    }
    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDevice() -> boolean
     *
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns
     */
    storeDevice(enviromentalDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    /**
     * Get enviromental devices from an admin
     * adminId: N, pageSize: N, pageIndex: N -> getAdminDevicePagination() -> [EnviromentalDevice]
     *
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getAdminDevicePagination(adminId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            var ed = new EnviromentalDevice_1.default();
            var array = [];
            array.push(ed);
            array.push(ed);
            return array;
        });
    }
    /**
     * Get all enviromental devices from an admin
     * adminId: N -> getAllAdminDevices() -> [EnviromentalDevice]
     *
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @returns
     */
    getAllAdminDevices(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            var ed = new EnviromentalDevice_1.default();
            var array = [];
            array.push(ed);
            array.push(ed);
            return array;
        });
    }
    /**
     * Get all enviromental devices from a council
     * councilId: N, pageSize: N, pageIndex: N -> getAllAdminDevices() -> [EnviromentalDevice]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getCouncilDevicePagination(councilId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            var ed = new EnviromentalDevice_1.default();
            var array = [];
            array.push(ed);
            array.push(ed);
            return array;
        });
    }
}
exports.default = EnviromentaDeviceLogic;
