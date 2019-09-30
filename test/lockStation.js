const assert = require("assert");
const _ = require("lodash");

describe('Test Server fixture functionality', function () {
  let testDriver;

  before(function () {
    testDriver = require("thing-it-test").createTestDriver({ logLevel: "debug" });

    testDriver.registerDevicePlugin("locker-station", __dirname + "/../lockerStation");
    testDriver.registerUnitPlugin(__dirname + "/../default-units/locker");

    testDriver.start({
      configuration: require(__dirname + "/../examples/configuration.js"),
      heartbeat: 10
    });

  });

  describe('Initialization', function () {
    this.timeout(60000);

    it('operational state of device and all actors should be ok', function (done) {
      setTimeout(function () {
        assert.deepEqual(testDriver.lockerStation01.operationalState.status, 'OK', 'device is not started correctly');
        done();
      }.bind(this), 2000);
    });




    it('lockerStation should close and opens properly', function (done) {
      setTimeout(function () {

        assert.deepEqual(testDriver.lockerStation01.locker01.state.status, 'unlocked', 'locker should be unlocked b default');
        assert.deepEqual(testDriver.lockerStation01.locker02.state.status, 'unlocked', 'locker should be unlocked b default');
        assert.deepEqual(testDriver.lockerStation01.locker03.state.status, 'unlocked', 'locker should be unlocked b default');
        testDriver.lockerStation01.lock({
          lockerId: 'locker01',
          loggedInUser: {
            _id: 4711,
            account: 'user@domain.com',
            firstName: 'FirstName',
            lastName: 'LastName',
            roles: [
              'notAdminRole'
            ]
          }
        });
        testDriver.lockerStation01.lock({
          lockerId: 'locker02',
          loggedInUser: {
            _id: 4711,
            account: 'user@domain.com',
            firstName: 'FirstName',
            lastName: 'LastName',
            roles: [
              'notAdminRole'
            ]
          }
        });
        testDriver.lockerStation01.lock({
          lockerId: 'locker03',
          loggedInUser: {
            _id: 4711,
            account: 'user@domain.com',
            firstName: 'FirstName',
            lastName: 'LastName',
            roles: [
              'notAdminRole'
            ]
          }
        });        

        assert.deepEqual(testDriver.lockerStation01.locker01.state.status, 'locked', 'locker should be locked');
        assert.deepEqual(testDriver.lockerStation01.locker02.state.status, 'locked', 'locker should be locked');
        assert.deepEqual(testDriver.lockerStation01.locker03.state.status, 'locked', 'locker should be locked');

        testDriver.lockerStation01.lock({
          lockerId: 'locker01',
          loggedInUser: {
            _id: 4711,
            account: 'user1@domain.com',
            firstName: 'FirstName',
            lastName: 'LastName',
            roles: [
              'notAdminRole'
            ]
          }
        });

        assert.deepEqual(testDriver.lockerStation01.locker01.state.status, 'locked', 'locker should return error and stay locked previous user');
        assert.deepEqual(testDriver.lockerStation01.locker01.state.lockingUserAccount, 'user@domain.com', 'locker should return error and stay locked previous user');
        assert.deepEqual(testDriver.lockerStation01.locker01.state.errorMessage, 'Locker already locked', 'locker should return error and stay locked previous user');

        testDriver.lockerStation01.unlock({
          lockerId: 'locker01',
          loggedInUser: {
            _id: 4711,
            account: 'user@domain.com',
            firstName: 'FirstName',
            lastName: 'LastName',
            roles: [
              'notAdminRole'
            ]
          }
        });
        testDriver.lockerStation01.unlock({
          lockerId: 'locker02',
          loggedInUser: {
            _id: 4711,
            account: 'user1@domain.com',
            firstName: 'FirstName',
            lastName: 'LastName',
            roles: [
              'adminRole'
            ]
          }
        });
        testDriver.lockerStation01.unlock({
          lockerId: 'locker03',
          loggedInUser: {
            _id: 4711,
            account: 'user2@domain.com',
            firstName: 'FirstName',
            lastName: 'LastName',
            roles: [
              'notAdminRole'
            ]
          }
        });


        assert.deepEqual(testDriver.lockerStation01.locker01.state.status, 'unlocked', 'locker should be unlocked by the same user account');
        assert.deepEqual(testDriver.lockerStation01.locker01.state.errorMessage, '', 'after any access operation error message should be cleared');
        assert.deepEqual(testDriver.lockerStation01.locker02.state.status, 'unlocked', 'locker should be unlocked by the admin account');
        assert.deepEqual(testDriver.lockerStation01.locker03.state.status, 'locked', 'locker should not be unlocked by another not admin user');
        assert.deepEqual(testDriver.lockerStation01.locker03.state.errorMessage, 'Access denied', 'locker should set error message, if user have not rights to open the locker');
        
        done();
      }.bind(this), 3000);
    });


    it('device cut user account', function (done) {
      setTimeout(function () {
        assert.equal(testDriver.lockerStation01.cutUserAccount('textwithoutat'), 't*t', 'user account shoud cut properly text without @');
        assert.equal(testDriver.lockerStation01.cutUserAccount('user-name@domain.info'), 'u*e@d*n.info', 'user account shoud cut properly domain.com');
        assert.equal(testDriver.lockerStation01.cutUserAccount('user-name@subdomain.domain.tv'), 'u*e@s*n.tv', 'user account shoud cut properly subdomain.domain.com');
        done();
      }.bind(this), 2000);
    });




    after(function () {
      testDriver.stop();
    });
  });
});