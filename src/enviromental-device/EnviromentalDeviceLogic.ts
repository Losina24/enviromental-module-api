/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the logic of the enviromental device feature
 */

import EnviromentalDeviceDatabaseHandler from "./EnviromentalDeviceDatabaseHandler";
import EnviromentalDevice from "./EnviromentalDevice";

export default class EnviromentaDeviceLogic {

    // This atribute is used to manage the db interactions in the logic
    private enviromentalDeviceDB: EnviromentalDeviceDatabaseHandler = new EnviromentalDeviceDatabaseHandler();

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
    public async getDeviceById(deviceId: number): Promise<EnviromentalDevice> {
        return new Promise<EnviromentalDevice>((resolve, reject) => {
            this.enviromentalDeviceDB.getDeviceByIdFromDB(deviceId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all enviroment devices of a user
     * userId: N -> getAllUserDevices() -> [EnviromentalDevice]
     * 
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns 
     */
    public async getAllUserDevices(userId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllUserDevicesFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
    * Get all enviroment devices of root ( * COUNT * )
    * getAllUserDevices() -> [EnviromentalDevice]
    *
    * @returns
    */
    public async getAllRootDevicesCount(): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllRootDevicesCountFromDB()
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
    * Get all enviroment devices of admin ( * COUNT * )
    * councilId: N -> getAllUserDevices() -> [EnviromentalDevice]
    *
    * @param councilId - ID of the council you want to get all enviromental devices from
    * @returns
    */
    public async getAllAdminDevicesCount(councilId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllAdminDevicesCountFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all enviroment devices of a user ( * COUNT * )
     * userId: N -> getAllUserDevices() -> [EnviromentalDevice]
     *
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns
     */
    public async getAllUserDevicesCount(userId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllUserDevicesCountFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
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
    public async getUserDevicePagination(userId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getUserDevicePaginationFromDB(userId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all enviromental devices from a council
     * councilId: N -> getAllCouncilDevices() -> [EnviromentalDevice]
     * 
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns 
     */
    public async getAllCouncilDevices(councilId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAllCouncilDevicesFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get enviromental devices of a gateway
     * gatewayId: N -> getGatewayDevices() -> [EnviromentalDevice]
     * 
     * @param gatewayId - ID of the gateway that you want to get all enviromental devices
     * @returns 
     */
    public async getAllGatewayDevices(gatewayId: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getGatewayDevicesFromDB(gatewayId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDevice() -> boolean
     * 
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns 
     */
    public async storeDevice(enviromentalDevice: EnviromentalDevice, userId: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            await this.enviromentalDeviceDB.storeDeviceInDB(enviromentalDevice, userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDevice() -> boolean
     * 
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns 
     */
    public async updateDevice(enviromentalDevice: EnviromentalDevice): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            await this.enviromentalDeviceDB.updateEnviromentalDevice(enviromentalDevice)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }


    /**
     * Get enviromental devices from an admin
     * adminId: N, pageSize: N, pageIndex: N -> getAdminDevicePagination() -> [EnviromentalDevice]
     * 
     * @param adminId - ID of the root admin that you want to get all enviromental devices
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns 
     */
    public async getAdminDevicePagination(adminId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAdminDevicePaginationFromDB(adminId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
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
    public async getCouncilDevicePagination(councilId: number, pageSize: number, pageIndex: number): Promise<EnviromentalDevice[]> {
        return new Promise<EnviromentalDevice[]>((resolve, reject) => {
            this.enviromentalDeviceDB.getAdminDevicePaginationFromDB(councilId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Remove a device
     * deviceId: N -> removeDevice()
     *
     * @param deviceId - ID of the device we want to delete
     * @returns
     */
    public async removeDevice(deviceId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.enviromentalDeviceDB.removeDeviceInDB(deviceId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
