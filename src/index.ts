import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import enviromentalDeviceRestRouter from './enviromental-device/EnviromentalDeviceRestRouter';
import sensorRestRouter from './sensor/SensorRestRouter';


class Server {

    public app: Application;
    private version: string = 'v2';

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 8080);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}))
    }

    routes(): void {
        this.app.use('/'+ this.version +'/enviromental/devices', enviromentalDeviceRestRouter);
        this.app.use('/'+ this.version +'/sensors', sensorRestRouter);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'))
        })
    }
}

const server = new Server();
server.start();
