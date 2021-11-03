export default class Utils {
    /**
     * This method parse an array of enviromental devices to an array of objects
     * enviromentalDevices: [EnviromentalDevice] -> enviromentalDevicesToObjects() -> [object]
     * 
     * @param enviromentalDevices 
     * @returns 
     */
	static enviromentalDevicesToObjects( enviromentalDevices: EnviromentalDevice[] ): object[] {
		let res: any = [];

		// Generating an object for each enviromental device
		enviromentalDevices.forEach( (element) => {
			const device = {
				id: element.getId(),
				name: element.getName(),
				mac: element.getMac(),
				gatewayId: element.getGatewayId(),
				//sensors: element.getSensors(),
				coords: element.getCoords(),
				status: element.getStatus(),
			};

			res.push(device);
		});

        return res;
	}

	/**
     * This method parse an array of enviromental devices to an array of objects
     * enviromentalDevice: EnviromentalDevice -> enviromentalDeviceToObject() -> object
     * 
     * @param enviromentalDevice
     * @returns 
     */
	 static enviromentalDeviceToObject( enviromentalDevice: EnviromentalDevice ): object {

		// Generating an object by the enviromental device given
		let res: object = {
			id: enviromentalDevice.getId(),
			name: enviromentalDevice.getName(),
			mac: enviromentalDevice.getMac(),
			gatewayId: enviromentalDevice.getGatewayId(),
			//sensors: enviromentalDevice.getSensors(),
			coords: enviromentalDevice.getCoords(),
			status: enviromentalDevice.getStatus(),
		}

        return res;
	}
}
