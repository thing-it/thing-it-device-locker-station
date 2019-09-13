module.exports = {
  label: 'Default',
  id: 'default',
  autoDiscoveryDeviceTypes: [],
  devices: [
    {
      plugin: 'locker-station/lockerStation',
      actors: [
        {
          id: 'locker01',
          label: 'Locker 01',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 1',
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker02',
          label: 'Locker 02',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 2',
            heightUnits: 1,
            widthUnits: 2
          },          
        },
        {
          id: 'locker03',
          label: 'Locker 03',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 3',
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker04',
          label: 'Locker 04',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 4',
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker05',
          label: 'Locker 05',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 5',
            heightUnits: 2,
            widthUnits: 1
          },          
        },
        {
          id: 'locker06',
          label: 'Locker 06',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 6',
            heightUnits: 2,
            widthUnits: 2
          },          
        },
        {
          id: 'locker07',
          label: 'Locker 07',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 7',
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker08',
          label: 'Locker 08',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 8',
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker09',
          label: 'Locker 09',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 9',
            heightUnits: 1,
            widthUnits: 1
          },          
        },
        {
          id: 'locker10',
          label: 'Locker 10',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: 'locker 10',
            heightUnits: 1,
            widthUnits: 1
          },          
        }
      ],
      sensors: [],
      services: [],
      class: 'Device',
      id: 'lockerStation01',
      label: 'Generic Locker Station 01',
      logLevel: 'debug',
      configuration: {      
        simulated: true,
        totalHeightUnits:3,
        totalUnitsWidth: 6,
        unlockRole: 'testUnlockRole'
      }
    }
  ],
  services: [],
  eventProcessors: [],
  groups: [],
  jobs: [],
  data: []
};
