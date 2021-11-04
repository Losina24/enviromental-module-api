var chai = require('chai');
var expect = chai.expect;    // Using Expect style
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

describe('Test funcionalidad sensores', function () {

    // create new sensor
    it('storeSensor() -> http-code { 200 : OK }', async () => {
        const params = new URLSearchParams();
        params.append('deviceId', 1);
        params.append('name', "ambientalSensorX");
        params.append('deviceEUI', 21415153);
        params.append('type', 1);
        params.append('status', 1);

        const response = await fetch('http://localhost:8080/v2/enviromental/sensors/add', {method: 'POST', body: params});
        expect(response.status).to.be.equal(200);
    });

    // get sensor by id
    it('getSensorById() -> http-code { 200 : OK }', async () => {
        var response = await fetch('http://localhost:8080/v2/enviromental/sensors/1');
        expect(response.status).to.be.equal(200);
    });

    // delete sensor by id
    it('removeSensor() -> http-code { 200 : OK }', async () => {
        const response = await fetch('http://localhost:8080/v2/enviromental/sensors/delete/1', {method: 'DELETE', body: {}});
        console.log(response)
        console.log(response.json)
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
