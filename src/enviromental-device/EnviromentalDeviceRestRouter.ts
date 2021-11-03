/**
 * Name: EnviromentaDeviceRestRouter.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the rest rules of the environmental devices feature
 */

import { Router, Request, Response } from 'express';

class EnviromentalDeviceRestRouter {

    // This is Rest entry point that the express server uses.
    public router: Router = Router();

    // All methods created in a Rest Router class must be called in the constructor for them to work
    constructor() {
        this.getDeviceById();
    }

    /**
     * Get the information about a enviromental device
     * GET /device/:id
     * 
     * Response: {
     *  "http": 200,
     *  "status": "OK",
     *  "enviromentalDevice": {
     *      "": xx.xx
     *  }
     * }
     * 
     */
    public getDeviceById = () => this.router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        console.log('id', id);
        res.status(200).send({
            "id": id
        })
        

        /* usersController.getUserInformation(id)
            .then( response => {
                res.send(response)
            })
            .catch( err => {
                res.send(err)
            }) */
    })
}

const enviromentalDeviceRestRouter = new EnviromentalDeviceRestRouter();
export default enviromentalDeviceRestRouter.router;