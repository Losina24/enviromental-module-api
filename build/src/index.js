"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const EnviromentalDeviceRestRouter_1 = __importDefault(require("./enviromental-device/EnviromentalDeviceRestRouter"));
const MeasureRestRouter_1 = __importDefault(require("./measures/MeasureRestRouter"));
const MeasureMqttRouter_1 = __importDefault(require("./measures/MeasureMqttRouter"));
const SensorRestRouter_1 = __importDefault(require("./sensor/SensorRestRouter"));
class Server {
    constructor() {
        this.version = 'v2';
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 8080);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        // Enviromental devices
        this.app.use('/' + this.version + '/enviromental/devices', EnviromentalDeviceRestRouter_1.default);
        this.app.use('/' + this.version + '/enviromental/sensors', SensorRestRouter_1.default);
        // Measures 
        this.app.use('/' + this.version + '/enviromental/measures', MeasureRestRouter_1.default);
        const measureMqttRouter = new MeasureMqttRouter_1.default();
        //measureMqttRouter.
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
