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
      },
      {
        label: "Height Position",
        id: "heightPosition",
        type: {
          id: "integer"
        }
      },
      {
        label: "Whidth Position",
        id: "whidthPosition",
        type: {
          id: "integer"
        }
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
    ],
    events: [
      {
        id: "lockerOverdue",
        label: "Locker Overdue"
      }
    ]
  },
  create: function () {
    return new Locker();
  },
};

Promise.prototype.fail = Promise.prototype.catch;
const OVERDUE_NOTIFICATION_INTEVAL = 3600000;


function Locker() {

  Locker.prototype.start = function () {
    this.operationalState = {
      status: 'PENDING',
      message: 'Waiting for state initialization...'
    };
    this.publishOperationalStateChange();


    this.overdueMessageInterval = undefined;

    this.state = {
      lockerId: this.id,
      status: 'unlocked',
      lockingUserAccount: '',
      lockingUserName: '',
      lockingTimeStamp: 0,
      expirationTimeStamp: 0,
      label: this.configuration.label,
      widthUnits: this.configuration.widthUnits,
      heightUnits: this.configuration.heightUnits,
      order: 0
    };

    if (this.configuration.whidthPosition && this.configuration.heightPosition) {
      this.state.order = this.calculateOrder(
        this.configuration.heightPosition ? this.configuration.heightPosition : 0,
        this.configuration.whidthPosition ? this.configuration.whidthPosition : 0
      );
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

    if (this.state.status === 'unlocked') {
      const loggedInUser = param.loggedInUser;
      const expirationTimeStamp = 
        param.expirationTimestamp ?
          new Date(param.expirationTimestamp).getTime() :
          Date.now() + 30 * 60 * 1000;

      this.state.status = 'locked';
      this.state.lockingUserAccount = loggedInUser.account;
      this.state.cuttedUserAccount = this.device.cutUserAccount(loggedInUser.account);
      this.state.lockingUserName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      this.state.expirationTimeStamp = expirationTimeStamp;
      this.state.errorMessage = '';
      this.publishState();

      this.startCheckingOverdue = setInterval(() => {
        clearInterval(this.startCheckingOverdue);
        this.overdueMessageInterval = setInterval(this.overdueNotification.bind(this), OVERDUE_NOTIFICATION_INTEVAL);          
      }, expirationTimeStamp - Date.now());
      
    } else {
      this.state.errorMessage = 'Locker already locked';
      this.publishState();
    }
    return Promise.resolve();
  }

  Locker.prototype.unlock = function (param) {
    const loggedInUser = param.loggedInUser;

    if (this.checkAccessRights(loggedInUser)) {
      this.state.status = 'unlocked';
      this.state.lockingUserAccount = '';
      this.state.cuttedUserAccount = '';
      this.state.lockingUserName = '';
      this.state.expirationTimeStamp = 0;
      this.state.errorMessage = '';
      this.publishState();
      if (this.startCheckingOverdue) {
        clearInterval(this.startCheckingOverdue);
      }
      if (this.overdueMessageInterval) {
        clearInterval(this.overdueMessageInterval);
      }
    } else {
      this.state.errorMessage = 'Access denied';
      this.publishState();
    }

    return Promise.resolve();
  }

  Locker.prototype.calculateOrder = function (heightPosition, whidthPosition) {
    const widthRate = Math.pow(10, this.device.configuration.totalUnitsWidth.toString().length + 1);
    const heightRate = Math.pow(10, this.device.configuration.totalUnitsHeight.toString().length + 1);
    return (heightPosition + heightRate) * widthRate + whidthPosition
  }


  Locker.prototype.checkAccessRights = function (userObject) {
    if (this.state.lockingUserAccount === userObject.account) {
      return true;
    }
    else if (Array.isArray(userObject.roles) && userObject.roles.includes(this.device.configuration.unlockRole)) {
      return true;
    }
    return false;
  }

  Locker.prototype.overdueNotification = function () {
    if (this.state.status === 'locked') {
      if (this.state.expirationTimeStamp < Date.now() + OVERDUE_NOTIFICATION_INTEVAL - 1000) {
        this.publishEvent('lockerOverdue', {});
      }
    }
  }
}