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
const NetworkServerDatabaseHandler_1 = __importDefault(require("./NetworkServerDatabaseHandler"));
class NetworkServerLogic {
    // Constructor
    constructor() {
        // This atribute is used to manage the db interactions in the logic
        this.networkServerDB = new NetworkServerDatabaseHandler_1.default();
    }
    // Logic Methods 
    /**
     * Get the information about a network server given their ID
     * networkServerId: N -> getNetworkServerById() -> gateway: Gateway
     *
     * @param networkServerId - ID of the network server you want to get data from
     * @returns
     */
    getNetworkServerById(networkServerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.getNetworkServerByIdFromDB(networkServerId)
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
     * Get user network servers
     * userId: N -> getUserNetworkServersById() -> networkServers: NetworkServer
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    getUserNetworkServersById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.getUserNetworkServersByIdFromDB(userId)
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
     * Get user network servers ( * COUNT * )
     * userId: N -> getUserNetworkServersCountById() -> networkServers: NetworkServer[]
     *
     * @param userId - ID of the user you want to get the network servers from
     * @returns
     */
    getUserNetworkServersCountById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.getUserNetworkServersByIdCountFromDB(userId)
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
     * Get all network servers paginated
     * pageSize: N, pageIndex: N -> getAllNetworkServersPaginated() -> networkServers: NetworkServer[]
     *
     * @param pageSize - Number of network servers returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getAllNetworkServersPaginated(pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.getAllNetworkServersPaginatedFromDB(pageSize, pageIndex)
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
     * Get all network servers paginated
     * pageSize: N, pageIndex: N -> getCouncilNetworkServersPaginated() -> networkServers: NetworkServer[]
     *
     * @param councilId - id of the council we want to retrieve the network servers from
     * @param pageSize - Number of network servers returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getCouncilNetworkServersPaginated(councilId, pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.getCouncilNetworkServersPaginatedFromDB(councilId, pageSize, pageIndex)
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
     * Get admin network servers ( * COUNT * )
     * councilId: N -> getAdminNetworkServerCount() -> networkServers: NetworkServer[]
     *
     * @returns
     */
    getAdminNetworkServerCount(councilId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.getAdminNetworkServersFromDB(councilId)
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
     * Get root network servers ( * COUNT * )
     * getRootNetworkServerCount() -> networkServers: NetworkServer[]
     *
     * @returns
     */
    getRootNetworkServerCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.getNetworkServersCountFromDB()
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
     * Create a network server
     * networkServer: NetworkServer -> createNetworkServer() ->
     *
     * @param networkServer - network server you want to store in the database
     * @returns
     */
    createNetworkServer(networkServer) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.createNetworkServerInDB(networkServer)
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
     * Edit network server data
     * networkServer: NetworkServer -> editNetworkServerFromDB() ->
     *
     * @param networkServer - network server with the new data
     * @returns
     */
    editNetworkServer(networkServer) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.editNetworkServerFromDB(networkServer)
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
     * Remove a network server by given id
     * networkServerId: N -> removeNetworkServer() ->
     *
     * @param networkServerId - ID of the network server you want to remove
     * @returns
     */
    removeNetworkServer(networkServerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.networkServerDB.removeNetworkServerFromDB(networkServerId)
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
exports.default = NetworkServerLogic;
