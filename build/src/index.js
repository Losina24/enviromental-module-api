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
const UserRestRouter_1 = __importDefault(require("./users/UserRestRouter"));
const CouncilRestRouter_1 = __importDefault(require("./councils/CouncilRestRouter"));
const GatewayRestRouter_1 = __importDefault(require("./gateways/GatewayRestRouter"));
const NetworkServerRestRouter_1 = __importDefault(require("./network-server/NetworkServerRestRouter"));
const SensorNotificationRestRouter_1 = __importDefault(require("./notifications/SensorNotificationRestRouter"));
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
        // User
        this.app.use('/' + this.version + '/user', UserRestRouter_1.default);
        // Council
        this.app.use('/' + this.version + '/council', CouncilRestRouter_1.default);
        // Gateway
        this.app.use('/' + this.version + '/gateway', GatewayRestRouter_1.default);
        // Network server
        this.app.use('/' + this.version + '/NS', NetworkServerRestRouter_1.default);
        // Notifications
        this.app.use('/' + this.version + '/notifications', SensorNotificationRestRouter_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
