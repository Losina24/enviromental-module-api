/**
 * Name: EnviromentaDeviceLogic.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the logic of the sensor feature
 */

import Sensor from "./Sensor";
import SensorDatabaseHandler from "./SensorDatabaseHandler";

export default class SensorLogic {

    // This atribute is used to manage the db interactions in the logic
    private sensorDB: SensorDatabaseHandler = new SensorDatabaseHandler()

    // Constructor
    constructor() {
        
    }

    // Logic Methods 
    /**
     * Get the information about a sensor given their ID
     * sensorId: N -> getSensorById() -> Sensor
     * 
     * @param sensorId - ID of the sensor you want to get data from
     * @returns 
     */
    public async getSensorById( sensorId: number ) : Promise<Sensor> {
        return new Promise<Sensor>((resolve, reject) => {
            this.sensorDB.getSensorByIdFromDB( sensorId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all user sensors
     * userId: N -> getAllUserSensors() -> [Sensor]
     * 
     * @param userId - ID of the user that you want to get all sensors from
     * @returns 
     */
    public async getAllUserSensors( userId: number ): Promise<Sensor[]> {
        return new Promise<Sensor[]>((resolve, reject) => {
            this.sensorDB.getAllUserSensorsFromDB( userId )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all user sensors ( * COUNT * )
     * userId: N -> getAllUserSensors() -> [Sensor]
     *
     * @param userId - ID of the user that you want to get all sensors from
     * @returns
     */
    public async getAllUserSensorsCount( userId: number ): Promise<Sensor[]> {
        return new Promise<Sensor[]>((resolve, reject) => {
            this.sensorDB.getAllUserSensorsCountFromDB( userId )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get sensors from a user in a pagination format
     * userId: N, pageSize: N, pageIndex: N -> getUserSensorPagination() -> [Sensor]
     * 
     * @param userId - ID of the user u want to get sensors from
     * @param pageSize - Number of devices returned by request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns 
     */
    public async getUserSensorPagination( userId: number, pageSize: number, pageIndex: number ): Promise<Sensor[]> {
        return new Promise<Sensor[]>((resolve, reject) => {
            this.sensorDB.getUserSensorPaginationFromDB( userId, pageSize, pageIndex )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all sensors from a council
     * councilId: N -> getAllCouncilSensors() -> [Sensor]
     * 
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns 
     */
    public async getAllCouncilSensors( councilId: number ): Promise<Sensor[]> {
        return new Promise<Sensor[]>((resolve, reject) => {
            this.sensorDB.getAllCouncilSensorsFromDB( councilId )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Store new sensor on database
     * sensor: Sensor -> storeSensor()
     * 
     * @param sensor - Sensor we want to store
     * @returns 
     */
    public async storeSensor( sensor: Sensor ): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.sensorDB.storeSensorInDB( sensor )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all admin related sensors with pagination format
     * adminId: N, pageSize: N, pageIndex: N -> getAdminSensorPagination() -> [Sensor]
     *
     * @param adminId - ID of the admin that you want to get all sensors from
     * @param pageSize - Number of sensors returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns 
     */
    public async getAdminSensorPagination( adminId: number, pageSize: number, pageIndex: number ): Promise<Sensor[]> {
        return new Promise<Sensor[]>((resolve, reject) => {
            this.sensorDB.getAdminSensorPaginationFromDB( adminId, pageSize, pageIndex )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all admin sensors
     * adminId: N -> getAdminAllSensors() -> [Sensor]
     * 
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @returns 
     */
    public async getAdminAllSensors( adminId: number) : Promise<Sensor[]> {
        return new Promise<Sensor[]>((resolve, reject) => {
            this.sensorDB.getAdminAllSensorsFromDB( adminId )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all council sensors with pagination format
     * councilId:N, pageSize:N, pageIndex:N -> getCouncilSensorPagination() -> [Sensor]
     * 
     * @param councilId - ID of the council you want to get the sensors from
     * @param pageSize - Number of devices returned by the request
     * @param pageIndex - Index of the page that you want to receive from the request
     * @returns 
     */
    public async getCouncilSensorPagination( councilId: number, pageSize: number, pageIndex: number ) : Promise<Sensor[]> {
        return new Promise<Sensor[]>((resolve, reject) => {
            this.sensorDB.getCouncilSensorPaginationFromDB( councilId, pageSize, pageIndex )
                .then( res => {
                    console.log("logicaRes")
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Get all device related sensors
     * deviceID: N -> getDeviceSensors() -> [Sensor]
     * 
     * @param deviceId - ID of the device we want to get the sensors from
     * @returns 
     */
    public async getDeviceSensors( deviceId: number ) : Promise<Sensor[]> {
        return new Promise<Sensor[]>((resolve, reject) => {
            this.sensorDB.getDeviceSensorsFromDB( deviceId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }

    /**
     * Remove a sensor
     * sensorId: N -> removeSensor()
     *
     * @param sensorId - ID of the sensor we want to delete
     * @returns
     */
    public async removeSensor(sensorId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.sensorDB.removeSensorInDB( sensorId )
                .then( res => {
                    resolve(res)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }
}
