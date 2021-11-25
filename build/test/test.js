"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var chai = require('chai');
var expect = chai.expect; // Using Expect style
// mod.cjs
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// metodo POST
function postData(url = '', data = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // Opciones por defecto estan marcadas con un *
        const response = yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    });
}
describe('Test funcionalidad sensores', function () {
    // create new sensor
    it('storeSensor() -> http-code { 200 : OK }', () => __awaiter(this, void 0, void 0, function* () {
        const params = {
            deviceId: 1,
            name: "ambientalSensorX",
            deviceEUI: 213242,
            type: 1,
            status: 1
        };
        var response = undefined;
        yield postData('http://localhost:8080/v2/enviromental/sensors/add', params)
            .then((data) => __awaiter(this, void 0, void 0, function* () {
            console.log(data); // JSON data parsed by `data.json()` call
            response = data;
            let insertedSensorId = data.lastInsertId;
            // Delete inserted sensor
            yield fetch('http://localhost:8080/v2/enviromental/sensors/delete/' + insertedSensorId, {
                method: 'DELETE'
            });
        })).catch(function (error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
        if (response) {
            expect(response.status).to.be.equal(200);
        }
    }));
    /*
        // get sensor by id
        it('getSensorById() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/1');
            expect(response.status).to.be.equal(200);
        });

        // delete sensor by id
        it('removeSensor() -> http-code { 200 : OK }', async () => {
            const response = await fetch('http://localhost:8080/v2/enviromental/sensors/delete/1', {method: 'DELETE', body: {}});
            expect(response.status).to.be.equal(200);
        });

        // get all user related sensors
        it('getAllUserSensors() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/3');
            expect(response.status).to.be.equal(200);
        });

        // get sensor by id test
        it('getUserSensorPagination() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/user/3/2/1');
            expect(response.status).to.be.equal(200);
        });

        // get sensor by id test
        it('getAllCouncilSensors() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/council/2');
            expect(response.status).to.be.equal(200);
        });

        // get sensor by id test
        it('getAdminSensorPagination() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/admin/2/2/1');
            expect(response.status).to.be.equal(200);
        });

        // get sensor by id test
        it('getAdminAllSensors() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/admin/2');
            expect(response.status).to.be.equal(200);
        });

        // get sensor by id test
        it('getCouncilSensorPagination() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/council/2/3/1');
            expect(response.status).to.be.equal(200);
        });

        // get sensor by id test
        it('getDeviceSensors() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/device/2');
            expect(response.status).to.be.equal(200);
        });
    */
});
