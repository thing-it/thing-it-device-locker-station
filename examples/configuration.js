module.exports = {
  label: 'Default',
  id: 'default',
  autoDiscoveryDeviceTypes: [],
  devices: [
    {
      plugin: 'locker-station/lockerStation',
      actors: [        
        {
          id: 'locker02',
          label: 'Locker 02',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '2',
            heightUnits: 1,
            widthUnits: 2,
            heightPosition: 1,
            whidthPosition: 2
          },          
        },
        {
          id: 'locker03',
          label: 'Locker 03',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '3',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 1,
            whidthPosition: 3
          },          
        },

        {
          id: 'locker01',
          label: 'Locker 01',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '1',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 1,
            whidthPosition: 1
          },          
        },
        {
          id: 'locker05',
          label: 'Locker 05',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '5',
            heightUnits: 2,
            widthUnits: 1,
            heightPosition: 1,
            whidthPosition: 6
          },          
        },
        {
          id: 'locker06',
          label: 'Locker 06',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '6',
            heightUnits: 2,
            widthUnits: 2,
            heightPosition: 2,
            whidthPosition: 1
          },          
        },
        {
          id: 'locker07',
          label: 'Locker 07',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '7',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 2,
            whidthPosition: 2
          },          
        },
        {
          id: 'locker04',
          label: 'Locker 04',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '4',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 1,
            whidthPosition: 4
          },          
        },
        {
          id: 'locker08',
          label: 'Locker 08',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '8',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 2,
            whidthPosition: 3
          },          
        },
        {
          id: 'locker09',
          label: 'Locker 09',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '9',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 2,
            whidthPosition: 4
          },          
        },
        {
          id: 'locker10',
          label: 'Locker 10',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '10',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 3,
            whidthPosition: 2
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
        totalUnitsHeight:3,
        totalUnitsWidth: 6,
        unlockRole: 'testUnlockRole'
      }
    },
    {
      plugin: 'locker-station/lockerStation',
      actors: [        
     
        {
          id: 'locker02',
          label: 'Locker 02',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '2',
            heightUnits: 1,
            widthUnits: 3,
            heightPosition: 1,
            whidthPosition: 2
          },          
        },

        {
          id: 'locker03',
          label: 'Locker 03',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '3',
            heightUnits: 3,
            widthUnits: 1,
            heightPosition: 2,
            whidthPosition: 2
          },          
        },
        {
          id: 'locker05',
          label: 'Locker 05',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '5',
            heightUnits: 2,
            widthUnits: 1,
            heightPosition: 2,
            whidthPosition: 4
          },          
        },
        {
          id: 'locker04',
          label: 'Locker 04',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '4',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 2,
            whidthPosition: 3
          },          
        },        
        {
          id: 'locker01',
          label: 'Locker 01',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '1',
            heightUnits: 6,
            widthUnits: 1,
            heightPosition: 1,
            whidthPosition: 1
          },          
        },        
        {
          id: 'locker07',
          label: 'Locker 07',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '7',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 4,
            whidthPosition: 4
          },          
        },
        {
          id: 'locker10',
          label: 'Locker 10',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '10',
            heightUnits: 1,
            widthUnits: 2,
            heightPosition: 6,
            whidthPosition: 3
          },          
        },        
        {
          id: 'locker08',
          label: 'Locker 08',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '8',
            heightUnits: 1,
            widthUnits: 3,
            heightPosition: 5,
            whidthPosition: 2
          },          
        },
        {
          id: 'locker09',
          label: 'Locker 09',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '9',
            heightUnits: 1,
            widthUnits: 1,
            heightPosition: 6,
            whidthPosition: 2
          },          
        },
        {
          id: 'locker06',
          label: 'Locker 06',
          type: 'locker',
          logLevel: 'debug',
          configuration: {
            simulated: true,
            label: '6',
            heightUnits: 2,
            widthUnits: 1,
            heightPosition: 3,
            whidthPosition: 3
          },          
        }        
      ],
      sensors: [],
      services: [],
      class: 'Device',
      id: 'lockerStation02',
      label: 'Generic Locker Station 02',
      logLevel: 'debug',
      configuration: {      
        simulated: true,
        totalUnitsWidth: 4,
        totalUnitsHeight:6,
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
