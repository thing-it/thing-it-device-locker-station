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