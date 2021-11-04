"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// Hay que cambiar esta información por la de nuestra base de datos
const conn = mysql_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proyectodb'
});
exports.default = conn;
