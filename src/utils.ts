import EnviromentalDevice from "./enviromental-device/EnviromentalDevice";
import {Response} from "express";

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

	public static sendRestResponse(output:any, res: Response){
		res.status(output.http).send({
			http: output.http,
			message: output.message,
			result: output.result
		})
	}

	public static generateLogicError(message: string, error: any){
		return {
			http: 400,
			message: message,
			result: error
		}
	}

	public static generateLogicSuccess(message: string, result: any){
		return {
			http: 200,
			message: message,
			result: result
		}
	}

	public static generateLogicSuccessEmpty(message: string){
		return {
			http: 204,
			message: message,
		}
	}
}
