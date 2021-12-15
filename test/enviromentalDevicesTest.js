var chai = require('chai');
var expect = chai.expect; // Using Expect style
// mod.cjs
const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
const utilsTesting = require('./UtilsTesting')

describe('Test funcionalidad dispositivos', function() {
    let insertedDeviceId
        // create new sensor
    it('storeDevice() -> http-code { 200 : OK }', async() => {
        const params = {
            "name": "namePOST",
            "deviceEUI": 1212312,
            "gatewayId": 2,
            "latitude": 36,
            "longitude": 32
        }
        var response;
        await utilsTesting.postData('http://localhost:8080/v2/enviromental/devices/2', params)
            .then(async data => {
                response = data
                insertedDeviceId = data.result
                expect(response.http).to.be.equal(200);
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                expect(response.http).to.be.equal(200);
            });
    });

    // create new sensor (empty params)
    it('storeDevice(empty params) -> http-code { 400 : Bad request }', async() => {
        var response;
        await utilsTesting.postData('http://localhost:8080/v2/enviromental/devices/2', {})
            .then(async data => {
                response = data
                expect(response.http).to.be.equal(400);
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                expect(response.http).to.be.equal(400);
            });
    });

    // create new sensor (wrong params)
    it('storeDevice(wrong params) -> http-code { 400 : Bad request }', async() => {
        const params = {
            "name": 1239999,
            "deviceEUI": "12X12312",
            "gatewayId": "2X",
            "latitude": "3X6",
            "longitude": "3X"
        }
        var response;
        await utilsTesting.postData('http://localhost:8080/v2/enviromental/devices/2', params)
            .then(async data => {
                response = data
                expect(response.http).to.be.equal(400);
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                expect(response.http).to.be.equal(400);
            });
    });

    // delete device by id
    it('removeDevice() -> http-code { 200 : OK }', async() => {
        const response = await fetch('http://localhost:8080/v2/enviromental/devices/' + insertedDeviceId, {
            method: 'DELETE',
            body: {}
        });
        expect(response.status).to.be.equal(200);
    });

    // delete device by id (device doesnt exist)
    it('removeDevice(id not matching) -> http-code { 204 : Empty }', async() => {
        const response = await fetch('http://localhost:8080/v2/enviromental/devices/' + insertedDeviceId, {
            method: 'DELETE',
            body: {}
        });
        expect(response.status).to.be.equal(204);
    });

    // delete device by id (wrong params)
    it('removeDevice(wrong params) -> http-code { 400 : Bad request }', async() => {
        const response = await fetch('http://localhost:8080/v2/enviromental/devices/X', {
            method: 'DELETE',
            body: {}
        });
        expect(response.status).to.be.equal(400);
    });

    // get device by id test
    it('getDeviceById() -> http-code { 200 : OK }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/1');
        expect(response.status).to.be.equal(200);
    });

    // get device by id test (device doesnt exist)
    it('getDeviceById(id not matching) -> http-code { 204 : Empty }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/1111');
        expect(response.status).to.be.equal(204);
    });

    // get device by id test (wrong params)
    it('getDeviceById(wrong params) -> http-code { 400 : Bad request }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/X');
        expect(response.status).to.be.equal(400);
    });

    // get user devices by user id test
    it('getAllUserDevices() -> http-code { 200 : OK }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/user/2');
        expect(response.status).to.be.equal(200);
    });

    // get user devices by user id test (id not matching)
    it('getAllUserDevices(id not matching) -> http-code { 204 : Empty }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/user/2222');
        expect(response.status).to.be.equal(204);
    });

    // get user devices by user id test (wrong params)
    it('getAllUserDevices(wrong params) -> http-code { 400 : Bad request }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/user/X');
        expect(response.status).to.be.equal(400);
    });

    // get devices count by user id test
    it('getAllUserDevicesCount() -> http-code { 200 : OK }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/count/user/2');
        expect(response.status).to.be.equal(200);
    });

    // get devices count by user id test (id not matching)
    it('getAllUserDevicesCount(id not matching) -> http-code { 204 : Empty }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/count/user/2222');
        expect(response.status).to.be.equal(204);
    });

    // get devices count by user id test (wrong params)
    it('getAllUserDevicesCount(wrong params) -> http-code { 400 : Bad request }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/count/user/X');
        expect(response.status).to.be.equal(400);
    });

    // get user devices by user id test
    it('getUserDevicePagination() -> http-code { 200 : OK }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/user/2/2/1');
        expect(response.status).to.be.equal(200);
    });

    // get user devices by user id test (id not matching)
    it('getUserDevicePagination(id not matching) -> http-code { 204 : Empty }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/user/2222/2222/1111');
        expect(response.status).to.be.equal(204);
    });

    // get user devices by user id test (wrong params)
    it('getUserDevicePagination(wrong params) -> http-code { 400 : Bad request }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/user/X/X/X');
        expect(response.status).to.be.equal(400);
    });

    // get council devices by council id test
    it('getAllCouncilDevices() -> http-code { 200 : OK }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/council/1');
        expect(response.status).to.be.equal(200);
    });

    // get council devices by council id test (id not matching)
    it('getAllCouncilDevices(id not matching) -> http-code { 204 : Empty }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/council/1111');
        expect(response.status).to.be.equal(204);
    });

    // get council devices by council id test (wrong params)
    it('getAllCouncilDevices(wrong params) -> http-code { 400 : Bad request }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/council/X');
        expect(response.status).to.be.equal(400);
    });

    // get gateway devices by gateway id test
    it('getAllGatewayDevices() -> http-code { 200 : OK }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/gateway/1');
        expect(response.status).to.be.equal(200);
    });

    // get gateway devices by gateway id test (id not matching)
    it('getAllGatewayDevices(id not matching) -> http-code { 204 : Empty }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/gateway/1111');
        expect(response.status).to.be.equal(204);
    });

    // get gateway devices by gateway id test (wrong params)
    it('getAllGatewayDevices(wrong params) -> http-code { 400 : Bad request }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/gateway/X');
        expect(response.status).to.be.equal(400);
    });

    // get admin devices by admin id test
    it('getAdminDevicePagination() -> http-code { 200 : OK }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/admin/2/2/1');
        expect(response.status).to.be.equal(200);
    });

    // get admin devices by admin id test (id not matching)
    it('getAdminDevicePagination(id not matching) -> http-code { 204 : Empty }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/admin/2222/2222/1111');
        expect(response.status).to.be.equal(204);
    });

    // get admin devices by admin id test (wrong params)
    it('getAdminDevicePagination(wrong params) -> http-code { 400 : Bad request }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/admin/X/X/X');
        expect(response.status).to.be.equal(400);
    });

    // get council devices by council id test
    it('getCouncilDevicePagination() -> http-code { 200 : OK }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/council/1/2/1');
        expect(response.status).to.be.equal(200);
    });

    // get council devices by council id test (id not matching)
    it('getCouncilDevicePagination(id not matching) -> http-code { 204 : Empty }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/council/1111/2222/1111');
        expect(response.status).to.be.equal(204);
    });

    // get council devices by council id test (wrong params)
    it('getCouncilDevicePagination(wrong params) -> http-code { 400 : Bad request }', async() => {
        var response = await fetch('http://localhost:8080/v2/enviromental/devices/council/X/X/X');
        expect(response.status).to.be.equal(400);
    });
})