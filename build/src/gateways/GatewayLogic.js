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
const GatewayDatabaseHandler_1 = __importDefault(require("./GatewayDatabaseHandler"));
class GatewayLogic {
    // Constructor
    constructor() {
        // This atribute is used to manage the db interactions in the logic
        this.gatewayDB = new GatewayDatabaseHandler_1.default();
    }
    // Logic Methods 
    /**
     * Get gateway information by given id
     * gatewayId: N -> getGatewayById() -> gateway: Gateway
     *
     * @param gatewayId - ID of the gateway you want to get data from
     * @returns
     */
    getGatewayById(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getGatewayByIdFromDB(councilId)
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
     * Get gateway information by given mac
     * mac: N -> getGatewayById() -> gateway: Gateway
     *
     * @param mac - Mac of the gateway you want to get data from
     * @returns
     */
    getGatewayByMacAndAdminId(mac) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getGatewayByMacAndAdminIdFromDB(mac)
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
     * Get user related gateways
     * gatewayId: N -> getUserGateways() -> gateways: Gateway[]
     *
     * @param userId - ID of the user we want to get the gateways from
     * @returns
     */
    getUserGateways(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getUserGatewaysFromDB(userId)
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
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysCount() -> count: N
     *
     * @param userId - ID of the user we want to get the gateways from
     * @returns
     */
    getUserGatewaysCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getUserGatewaysCountFromDB(userId)
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
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysCount() -> count: N
     *
     * @param councilId - ID of the council we want to get the gateways from
     * @returns
     */
    getAdminGatewaysCount(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getGatewaysCountAdmin(councilId)
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
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysCount() -> count: N
     *
     * @param councilId - ID of the council we want to get the gateways from
     * @returns
     */
    getAdminGateways(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getGatewaysAdmin(councilId)
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
     * Get user related gateways
     * gatewayId: N -> getUserGatewaysCount() -> count: N
     *
     * @returns
     */
    getRootGatewaysCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getGatewaysCountRoot()
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
     * Get all council related gateways
     * councilId: N -> getAllCouncilGateways() -> gateways: Gateway[]
     *
     * @param councilId - ID of the council you want to get the gateways from
     * @returns
     */
    getAllCouncilGateways(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getAllCouncilGatewaysFromDB(councilId)
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
     * Get all council related gateways with pagination
     * councilId: N, pageSize: N, pageIndex: N -> getCouncilGatewayPagination() -> gateways: Gateway[]
     *
     * @param councilId - ID of the council you want to get data from
     * @param pageSize - Number of gateways returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getCouncilGatewayPagination(councilId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getCouncilGatewayPaginationFromDB(councilId, pageSize, pageIndex)
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
     * Get all gateways with pagination
     * pageSize: N, pageIndex: N -> getAllGatewaysRootPagination() -> gateways: Gateway[]
     *
     * @param pageSize - Number of gateways returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getAllGatewaysRootPagination(pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getAllGatewaysRootPaginationFromDB(pageSize, pageIndex)
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
     * Get network server related gateways
     * networkServerId: N -> getGatewaysFromNetworkServer() -> gateways: Gateway[]
     *
     * @param networkServerId - ID of the network server we want to get the gateways from
     * @returns
     */
    getGatewaysFromNetworkServer(networkServerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.getGatewaysFromNetworkServerInDB(networkServerId)
                    .then((res) => {
                    resolve(res);
                })
                    .catch(err => {
                    reject(err);
                });
            });
        });
    }
    /**
     * Create a new gateway
     * gateway: Gateway -> storeGateway()
     *
     * @param gateway - gateway we want to create
     * @returns
     */
    storeGateway(gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.storeGatewayInDB(gateway)
                    .then(res => {
                    console.log("logicaRes");
                    resolve();
                })
                    .catch(err => {
                    reject();
                });
            });
        });
    }
    /**
     * Links a network server to gateway
     * gatewayId: N, networkServerId: N -> addNetworkServersToGateway()
     *
     * @param gatewayId - gateway id
     * @param networkServerId - network server id
     * @returns
     */
    addNetworkServersToGateway(gatewayId, networkServerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.addNetworkServersToGatewayInDB(gatewayId, networkServerId)
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
     * Edit gateway info
     * gateway: Gateway -> editGateway()
     *
     * @param gateway - gateway with new data
     * @returns
     */
    editGateway(gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.editGatewayInDB(gateway)
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
     * Remove link between network server and gateway
     * gatewayId: N, networkServerId: N -> removeNetworkServerFromGateway()
     *
     * @param gatewayId - ID of the gateway
     * @param networkServerId - ID of the network server
     * @returns
     */
    removeNetworkServerFromGateway(gatewayId, networkServerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.removeNetworkServerFromGatewayFromDB(gatewayId, networkServerId)
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
     * Remove a gateway by given id
     * gatewayId: N -> removeGateway()
     *
     * @param gatewayId - ID of the gateway we want to delete
     * @returns
     */
    removeGateway(gatewayId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.gatewayDB.removeGatewayFromDB(gatewayId)
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
exports.default = GatewayLogic;
