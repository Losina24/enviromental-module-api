/*var chai = require('chai');
var expect = chai.expect;    // Using Expect style
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const utilsTesting = require('./UtilsTesting')

describe('Test funcionalidad sensores', function () {

    // create new sensor
    it('storeSensor() -> http-code { 200 : OK }', async () => {
        const params = {
            deviceId: 1,
            name: "ambientalSensorX",
            deviceEUI: 213242,
            type: 1,
            status: 1
        }

        var response;
        await utilsTesting.postData('http://localhost:8080/v2/enviromental/sensors/add', params)
            .then(async data => {
                console.log(data); // JSON data parsed by `data.json()` call
                response = data
                let insertedSensorId = data.lastInsertId
                // Delete inserted sensor
                await fetch('http://localhost:8080/v2/enviromental/sensors/delete/' + insertedSensorId, {
                    method: 'DELETE'
                });
                expect(response.status).to.be.equal(200);
            }).catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                expect(response.status).to.be.equal(200);
            });


    });

        // get sensor by id
        it('getSensorById() -> http-code { 200 : OK }', async () => {
            var response = await fetch('http://localhost:8080/v2/enviromental/sensors/1');
            expect(response.status).to.be.equal(200);
        });

        // delete sensor by id
        it('removeSensor() -> http-code { 200 : OK }', async () => {
            const response = await fetch('http://localhost:8080/v2/enviromental/sensors/delete/1', {
                method: 'DELETE',
                body: {}
            });
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

});
*/