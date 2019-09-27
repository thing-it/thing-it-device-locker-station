'use strict'

module.exports = {
  metadata: {
    family: 'locker-station',
    plugin: 'lockerStation',
    label: 'Locker Station',
    tangible: true,
    manufacturer: '',
    discoverable: false,
    persistent: true,
    actorTypes: [],
    sensorTypes: [],
    configuration: [
      {
        label: 'Total Units Height ',
        id: 'totalUnitsHeight ',
        type: {
          id: 'integer'
        },
        defaultValue: '0'
      },
      {
        label: 'Total Units Width',
        id: 'totalUnitsWidth',
        type: {
          id: 'integer'
        },
        defaultValue: '0'
      },
      {
        label: 'Unlock Role ',
        id: 'unlockRole ',
        type: {
          id: 'string'
        },
        defaultValue: '0'
      }
    ],
    services: [
      {
        id: 'unlock',
        label: 'Unlock',
      },
      {
        id: 'lock',
        label: 'Lock',
      }
    ]
  },
  create: function () {
    return new LockerStation();
  }
};

Promise.prototype.fail = Promise.prototype.catch;

function LockerStation() {

  LockerStation.prototype.start = function () {
    this.operationalState = {
      status: 'PENDING',
      message: 'Waiting for state initialization...'
    };
    this.publishOperationalStateChange();

    this.state = {
      heightUnits: this.configuration.totalHeightUnits,
      widthUnits: this.configuration.totalUnitsWidth,
      arrayOfLockers: []
    };    

    this.operationalState = {
      status: 'OK',
      message: 'Initialization not implement...'
    };
    this.publishOperationalStateChange();

    return Promise.resolve();
  }

  LockerStation.prototype.stop = function () {
    this.operationalState = {
      status: 'PENDING',
      message: 'Waiting for closing...'
    };
    this.publishOperationalStateChange();

    return Promise.resolve();
  }

  LockerStation.prototype.getState = function () {
    this.updateArrayOfLockers();
    return this.state;
  }

  LockerStation.prototype.updateArrayOfLockers = function () {
    let result = [];
    this.actors.forEach(actor => {
      if (actor.type === 'locker') {
        result.push(actor.state);
      }
    });

    result.sort((a, b) => {
      return a.order - b.order;
    });
    
    this.state.arrayOfLockers =  result;
  }

  LockerStation.prototype.lock = function (param) {
    const lockerId = param.lockerId;
    this.actors.forEach(item => {
      if (item.state.lockerId == lockerId) {
        item.lock(param);
      }
    });
    this.publishStateChange();
  }

  LockerStation.prototype.unlock = function (param) {
    const lockerId = param.lockerId;
    this.actors.forEach(item => {
      if (item.state.lockerId == lockerId) {
        item.unlock(param);
      }
    });
    this.publishStateChange();
  }

  LockerStation.prototype.cutUserAccount = function (userAccount) {
    const accountParts = userAccount.split('@');
    let cutUserName = '';
    if (accountParts.length === 2) {
      cutUserName = accountParts[0][0] + '*' + accountParts[0][accountParts[0].length - 1] + '@';
      const dommainParts = accountParts[1].split('.');
      if (dommainParts.length >= 2) {
        cutUserName = cutUserName
          + dommainParts[0][0]
          + '*'
          + dommainParts[dommainParts.length - 2][dommainParts[dommainParts.length - 2].length - 1]
          + '.' + dommainParts[dommainParts.length - 1];
      } else {
        cutUserName = cutUserName + accountParts[1];
      }
    } else {
      cutUserName = userAccount[0] + '*' + userAccount[userAccount.length - 1];
    }
    return cutUserName;
  }
}