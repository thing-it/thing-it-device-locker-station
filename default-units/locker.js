'use strict';

module.exports = {
  metadata: {
    plugin: 'locker',
    label: 'Locker',
    role: 'actor',
    family: 'locker',
    deviceTypes: ['locker-station/lockerStation'],
    discoverable: false,
    persistent: true,
    events: [],
    configuration: [
      {
        label: "Label",
        id: "label",
        type: {
          id: "string"
        }
      },
      {
        label: "Height Units",
        id: "heightUnits",
        type: {
          id: "integer"
        },
        defaultValue: 1
      },
      {
        label: "Width Units",
        id: "widthUnits",
        type: {
          id: "integer"
        },
        defaultValue: 1
      }
    ],
    state: [
      {
        label: "Locking User Account",
        id: "lockingUserAccount",
        type: {
          id: "srting"
        }
      },
      {
        label: "Locking User Name",
        id: "lockingUserName",
        type: {
          id: "srting"
        }
      },
      {
        label: "Locking Timestamp",
        id: "lockingTimestamp",
        type: {
          id: "integer"
        }
      },
      {
        label: "Expiration Timestamp",
        id: "expirationTimestamp",
        type: {
          id: "integer"
        }
      },
      {
        label: "Error Mmessage",
        id: "errorMessage",
        type: {
          id: "string"
        }
      }
    ],
    services: [
      {
        id: "lock",
        label: "Lock",
      },
      {
        id: "unlock",
        label: "Unlock",
      }
    ]
  },
  create: function () {
    return new Locker();
  },
};

Promise.prototype.fail = Promise.prototype.catch;

function Locker() {

  Locker.prototype.start = function () {
    this.operationalState = {
      status: 'PENDING',
      message: 'Waiting for state initialization...'
    };
    this.publishOperationalStateChange();

    if (this.isSimulated()) {
      this.state = {
        lockerId: this.id,
        status: 'unlocked',
        lockingUserAccount: '',
        lockingUserName: '',
        lockingTimeStamp: 0,
        expirationTimeStamp: 0,
        label: this.configuration.label,
        widthUnits: this.configuration.widthUnits,
        heightUnits: this.configuration.heightUnits
      };
    }

    this.operationalState = {
      status: 'OK',
      message: 'Initialization not implement...'
    };
    this.publishOperationalStateChange();
    return Promise.resolve();
  }

  Locker.prototype.stop = function () {

    return Promise.resolve();
  }

  Locker.prototype.getState = function () {
    return this.state;
  }

  Locker.prototype.lock = function (param) {
    const loggedInUser = param.loggedInUser;
    const lockingTimeStamp = new Date().getTime();
    const expirationTimeStamp =
      param.expirationTimestamp ?
        new Date(param.expirationTimestamp).getTime() :
        new Date().getTime() + 30 * 60 * 1000;

    if (this.isSimulated()) {
      this.state.status = 'locked';
      this.state.lockingUserAccount = loggedInUser.account;
      this.state.lockingUserName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      this.state.lockingTimeStamp = lockingTimeStamp;
      this.state.expirationTimeStamp = expirationTimeStamp;
      this.publishState();
    }

    return Promise.resolve();
  }

  Locker.prototype.unlock = function (param) {
    const loggedInUser = param.loggedInUser;
    if (this.isSimulated()) {
      if (this.state.lockingUserAccount == loggedInUser.account) {
        this.state.status = 'unlocked';
        this.state.lockingUserAccount = '';
        this.state.lockingUserName = '';
        this.state.lockingTimeStamp = 0;
        this.state.expirationTimeStamp = 0;
        this.publishState();
      } else {
        this.state.errorMessage = 'Wrong user account';
        this.publishState();
      }
    }
    return Promise.resolve();
  }
}