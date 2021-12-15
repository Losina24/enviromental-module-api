/**
 * Name: SensorNotification.ts
 * Date: 02 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages sensor notifications logic
 */

import SensorNotificationDatabaseHandler from "./SensorNotificationDatabaseHandler";
import SensorNotification from "./SensorNotification";

export default class SensorNotificationLogic {

    // This atribute is used to manage the db interactions in the logic
    private notificationDB: SensorNotificationDatabaseHandler = new SensorNotificationDatabaseHandler();

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
    public async getUserNotificationsCount(userId: number): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getUserNotificationsCountFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     * 
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns 
     */
     public async getUserSensorNotificationsPaginated(userId: number, pageSize: number, pageIndex: number): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getUserSensorNotificationsPaginatedFromDB(userId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     * 
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns 
     */
     public async getAdminSensorNotificationsPaginated(adminId: number,pageSize: number, pageIndex: number): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getAdminSensorNotificationsPaginatedFromDB(adminId, pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     * 
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns 
     */
     public async getRootSensorNotificationsPaginated(pageSize: number, pageIndex: number): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getRootSensorNotificationsPaginatedFromDB(pageSize, pageIndex)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     * 
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns 
     */
    public async getAdminNotificationsCount(councilId: number): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getAdminNotificationsCountFromDB(councilId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     * 
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns 
     */
    public async getRootNotificationsCount(): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getRootNotificationsCountFromDB()
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     * 
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns 
     */
    public async getNotificationsByUserId(userId: number): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getNotificationsByUserIdFromDB(userId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    public async getSensorNotificationById(notificationId: number): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getSensorNotificationByIdFromDB(notificationId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * Get the information about a enviromental device given their ID
     * userId: N -> getDeviceById() -> EnviromentalDevice
     *
     * @param deviceId - ID of the enviromental device you want to get data from
     * @returns
     */
    public async getSensorNotificationsBySensorId(sensorId: number): Promise<SensorNotification> {
        return new Promise<SensorNotification>((resolve, reject) => {
            this.notificationDB.getSensorNotificationsBySensorIdFromDB(sensorId)
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
    public async createSensorNotification(notification: SensorNotification): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.notificationDB.createSensorNotificationInDB(notification)
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
    public async editSensorNotification(notification: SensorNotification): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.notificationDB.editSensorNotificationInDB(notification)
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
    public async removeNotification(notificationId: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.notificationDB.removeNotificationInDB(notificationId)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}
