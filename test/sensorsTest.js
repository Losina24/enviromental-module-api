
var chai = require('chai');
var expect = chai.expect;    // Using Expect style
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const utilsTesting = require('./UtilsTesting')

describe('Test funcionalidad sensores', function () {
    let insertedSensorId
    // create new sensor
    it('storeSensor() -> http-code { 200 : OK }', async () => {
        const params = {
            deviceId: 1,
            name: "ambientalSensorXX",
            deviceEUI: 2132421,
            type: 1,
            status: 1
        }

        await utilsTesting.postData('http://localhost:8080/v2/enviromental/sensors/', params)
            .then(async data => {
                insertedSensorId = data.result
                expect(data.http).to.be.equal(200);
            }).catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                expect(data.http).to.be.equal(200);
            });
    });

    // create new sensor with (empty params)
    it('storeSensor(empty) -> http-code { 400 : Bad request }', async () => {
        await utilsTesting.postData('http://localhost:8080/v2/enviromental/sensors/', { empty: "empty" })
            .then(async data => {
                expect(data.http).to.be.equal(400);
            }).catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                expect(data.http).to.be.equal(400);
            });
    })

    // create new sensor (wrong params)
    it('storeSensor(wrong params) -> http-code { 400 : Bad request }', async () => {
        const params2 = {
            deviceId: "abc",
            name: 123,
            deviceEUI: "abx",
            type: "d",
            status: "c"
        }
        await utilsTesting.postData('http://localhost:8080/v2/enviromental/sensors/', params2)
            .then(async data => {
                expect(data.http).to.be.equal(400);
            }).catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                expect(data.http).to.be.equal(400);
            });
    })

    // delete sensor by id
    it('removeSensor() -> http-code { 200 : OK }', async () => {
        const response = await fetch('http://localhost:8080/v2/enviromental/sensors/' + insertedSensorId, {
            method: 'DELETE'
        });
        expect(response.status).to.be.equal(200);
    });

    // delete sensor by id (id not matching)
    it('removeSensor(id not matching) -> http-code { 204 : Empty }', async () => {
        const response = await fetch('http://localhost:8080/v2/enviromental/sensors/' + insertedSensorId, {
            method: 'DELETE'
        });
        expect(response.status).to.be.equal(204);
    })
    // delete sensor by id (wrong params)
    it('removeSensor(wrong params) -> http-code { 400 : Bad request }', async () => {
        const response = await fetch('http://localhost:8080/v2/enviromental/sensors/TEXT', {
            method: 'DELETE'
        });
        expect(response.status).to.be.equal(400);
    })
    // get sensor by id
    it('getSensorById() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/5');
        expect(response.status).to.be.equal(200);
    });

    // get sensor by id (no sensor with that id)
    it('getSensorById(id not matching) -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/5555');
        expect(response.status).to.be.equal(204);
    });

    // get sensor by id (wrong params)
    it('getSensorById(wrong params) -> http-code { 400 : Bad request }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/X');
        expect(response.status).to.be.equal(400);
    });

    // get all user related sensors
    it('getAllUserSensors() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/3');
        expect(response.status).to.be.equal(200);
    });

    // get all user related sensors (no sensor with that id)
    it('getAllUserSensors(id not matching) -> http-code { 204 : Empty }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/33333');
        expect(response.status).to.be.equal(204);
    });

    // get all user related sensors (wrong param)
    it('getAllUserSensors(wrong params) -> http-code { 400 : Bad request }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/X');
        expect(response.status).to.be.equal(400);
    });

    // get user sensors by id test
    it('getUserSensorPagination() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/user/3/2/1');
        expect(response.status).to.be.equal(200);
    });

    // get user sensors by id test (given ids dont exist)
    it('getUserSensorPagination(id not matching) -> http-code { 204 : Empty }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/user/3333/2222/1111');
        expect(response.status).to.be.equal(204);
    });

    // get user sensors by id test
    it('getUserSensorPagination(wrong params) -> http-code { 400 : Bad request }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/user/X/X/X');
        expect(response.status).to.be.equal(400);
    });

    // get council sensors by id test
    it('getAllCouncilSensors() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/council/1');
        expect(response.status).to.be.equal(200);
    });

    // get council sensors by id test (given id doesnt exist)
    it('getAllCouncilSensors(id not matching) -> http-code { 204 : Empty }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/council/1111');
        expect(response.status).to.be.equal(204);
    });

    // get council sensors by id test (wrong params)
    it('getAllCouncilSensors(wrong params) -> http-code { 400 : Bad request }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/council/X');
        expect(response.status).to.be.equal(400);
    });

    // get admin sensors by id test
    it('getAdminSensorPagination() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/admin/2/2/1');
        expect(response.status).to.be.equal(200);
    });

    // get admin sensors by id test (admin doesnt exist)
    it('getAdminSensorPagination(id not matching) -> http-code { 204 : Empty }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/admin/2222/2222/1111');
        expect(response.status).to.be.equal(204);
    });

    // get admin sensors by id test (wrong params)
    it('getAdminSensorPagination(wrong params) -> http-code { 400 : Bad request }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/admin/x/x/x');
        expect(response.status).to.be.equal(400);
    });

    // get sensor by id test
    it('getAdminAllSensors() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/admin/2');
        expect(response.status).to.be.equal(200);
    });

    // get sensor by id test (no admin with given id)
    it('getAdminAllSensors(id not matching) -> http-code { 204 : Empty }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/admin/2222');
        expect(response.status).to.be.equal(204);
    });

    // get sensor by id test (wrong params)
    it('getAdminAllSensors(wrong params) -> http-code { 400 : Bad request }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/admin/X');
        expect(response.status).to.be.equal(400);
    });

    // get council sensors by id test
    it('getCouncilSensorPagination() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/council/1/3/1');
        expect(response.status).to.be.equal(200);
    });

    // get council sensors by id test
    it('getCouncilSensorPagination(id not matching) -> http-code { 204 : Empty }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/council/1111/3333/1111');
        expect(response.status).to.be.equal(204);
    });

    // get council sensors by id test
    it('getCouncilSensorPagination() -> http-code { 400 : Bad request }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/list/council/X/X/X');
        expect(response.status).to.be.equal(400);
    });

    // get device sensors by id test
    it('getDeviceSensors() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/device/2');
        expect(response.status).to.be.equal(200);
    });

    // get device sensors by id test
    it('getDeviceSensors(id not matching) -> http-code { 204 : Empty }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/device/2222');
        expect(response.status).to.be.equal(204);
    });

    // get device sensors by id test
    it('getDeviceSensors() -> http-code { 400 : Bad request }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/device/X');
        expect(response.status).to.be.equal(400);
    });
});
