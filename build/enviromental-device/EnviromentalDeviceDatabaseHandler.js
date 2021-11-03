"use strict";
/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
 */
Object.defineProperty(exports, "__esModule", { value: true });
class EnviromentalDeviceDatabaseHandler {
    // Logic Methods 
    /**
     * Get the information about a enviromental device given their ID from the database
     * deviceId: N -> getDeviceByIdFromDB() -> JSON
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    getDeviceByIdFromDB(deviceId) {
        return {};
    }
    /**
     * Get all enviroment devices of a user from the database
     * userId: N -> getAllUserDevicesFromDB() -> [JSON]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    getAllUserDevicesFromDB(userId) {
        return [{}];
    }
    /**
     * Get enviromental devices from a user in a pagination format
     * userId: N, pageSize: N, pageIndex: N -> getUserDevicePaginationFromDB() -> [JSON]
     *
     * @param userId - ID of the user u want to get devices from
     * @param pageSize - Number of devices returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getUserDevicePaginationFromDB(userId, pageSize, pageIndex) {
        return [{}];
    }
    /**
     * Get all enviromental devices from a council
     * councilId: N -> getAllCouncilDevicesFromDB() -> [JSON]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns
     */
    getAllCouncilDevicesFromDB(councilId) {
        return [{}];
    }
    /**
     * Get enviromental devices of a gateway
     * gatewayId: N -> getGatewayDevicesFromDB() -> [JSON]
     *
     * @param gatewayId - ID of the gateway that you want to get all enviromental devices
     * @returns
     */
    getGatewayDevicesFromDB(gatewayId) {
        return [{}];
    }
    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDeviceInDB() -> boolean
     *
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns
     */
    storeDeviceInDB(enviromentalDevice) {
        return true;
    }
    /**
     * Get enviromental devices from an admin
     * adminId: N, pageSize: N, pageIndex: N -> getAdminDevicePaginationFromDB() -> [JSON]
     *
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getAdminDevicePaginationFromDB(adminId, pageSize, pageIndex) {
        return [{}];
    }
    /**
     * Get all enviromental devices from an admin
     * adminId: N -> getAllAdminDevicesFromDB() -> [JSON]
     *
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @returns
     */
    getAllAdminDevicesFromDB(adminId) {
        return [{}];
    }
    /**
     * Get all enviromental devices from a council
     * councilId: N, pageSize: N, pageIndex: N -> getAllAdminDevicesFromDB() -> [JSON]
     *
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns
     */
    getCouncilDevicePaginationFromDB(councilId, pageSize, pageIndex) {
        return [{}];
    }
}
exports.default = EnviromentalDeviceDatabaseHandler;
