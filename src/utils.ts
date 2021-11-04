import EnviromentalDevice from "./enviromental-device/EnviromentalDevice";

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
			res.push(element.toObject());
		});

        return res;
	}
}
