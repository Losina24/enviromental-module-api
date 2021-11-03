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
    private enviromentalDeviceDB: EnviromentalDeviceDatabaseHandler

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
    public async getDeviceById( deviceId: number ) : Promise<EnviromentalDevice> {
        var ed = new EnviromentalDevice();
        return ed;
    }

    /**
     * Get all enviroment devices of a user
     * userId: N -> getAllUserDevices() -> [EnviromentalDevice]
     * 
     * @param userId - ID of the user that you want to get all enviromental devices
     * @returns 
     */
    public async getAllUserDevices( userId: number ): Promise<EnviromentalDevice[]> {
        var ed = new EnviromentalDevice();
        var array = [];
        array.push(ed);
        array.push(ed);

        return array;
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
    public async getUserDevicePagination( userId: number, pageSize: number, pageIndex: number ): Promise<EnviromentalDevice[]> {
        var ed = new EnviromentalDevice();
        var array = [];
        array.push(ed);
        array.push(ed);
        
        return array;
    }

    /**
     * Get all enviromental devices from a council
     * councilId: N -> getAllCouncilDevices() -> [EnviromentalDevice]
     * 
     * @param councilId - ID of the council that you want to get all enviromental devices
     * @returns 
     */
    public async getAllCouncilDevices( councilId: number ): Promise<EnviromentalDevice[]> {
        var ed = new EnviromentalDevice();
        var array = [];
        array.push(ed);
        array.push(ed);
        
        return array;
    }

    /**
     * Get enviromental devices of a gateway
     * gatewayId: N -> getGatewayDevices() -> [EnviromentalDevice]
     * 
     * @param gatewayId - ID of the gateway that you want to get all enviromental devices
     * @returns 
     */
    public async getAllGatewayDevices( gatewayId: number ): Promise<EnviromentalDevice[]> {
        var ed = new EnviromentalDevice();
        var array = [];
        array.push(ed);
        array.push(ed);
        
        return array;
    }

    /**
     * Save an enviromental device
     * enviromentalDevice: EnviromentalDevice -> storeDevice() -> boolean
     * 
     * @param enviromentalDevice - Enviromental device you want to store in the database
     * @returns 
     */
    public async storeDevice( enviromentalDevice: EnviromentalDevice ): Promise<boolean> {
        return true;
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
    public async getAdminDevicePagination( adminId: number, pageSize: number, pageIndex: number) : Promise<EnviromentalDevice[]> {
        var ed = new EnviromentalDevice();
        var array = [];
        array.push(ed);
        array.push(ed);
        
        return array;
    }

    /**
     * Get all enviromental devices from an admin
     * adminId: N -> getAllAdminDevices() -> [EnviromentalDevice]
     * 
     * @param adminId - ID of the admin that you want to get all enviromental devices
     * @returns 
     */
    public async getAllAdminDevices( adminId: number ) : Promise<EnviromentalDevice[]> {
        var ed = new EnviromentalDevice();
        var array = [];
        array.push(ed);
        array.push(ed);
        
        return array;
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
    public async getCouncilDevicePagination( councilId: number, pageSize: number, pageIndex: number) : Promise<EnviromentalDevice[]> {
        var ed = new EnviromentalDevice();
        var array = [];
        array.push(ed);
        array.push(ed);
        
        return array;
    }
}