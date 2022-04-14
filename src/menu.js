const buildTemplate = (
  appName, 
  local, 
  remote, 
  cloud, 
  isMac,
  onAdd,
  onLoadURL,
) => [
  ...(isMac ? [{
    role: 'appMenu'
  }] : []),
  {
    role: 'fileMenu'
  },
  {
    role: 'editMenu'
  },
  {
    role: 'viewMenu'
  },
  {
    label: '&Instances',
    submenu: [
        {
            label: 'Cloud',
            enabled:  cloud.length > 0,
            submenu : [
                ...cloud.map((instance, idx) => {
                    return {
                        label: instance,
                        accelerator: `CmdOrCtrl+C+${idx + 1}`,
                        click: () => onLoadURL(instance),
                    }
                })
            ]
        },
        {
            label: 'Remote',
            enabled: remote.length > 0,
            submenu : [
                ...remote.map((instance, idx) => {
                    return {
                        label: instance,
                        accelerator: `CmdOrCtrl+R+${idx + 1}`,
                        click: () => onLoadURL(instance),
                    }
                })
            ]
        },
        {
            label: 'Local',
            enabled: local.length > 0,
            submenu : [
                ...local.map((instance, idx) => {
                    return {
                        label: instance,
                        accelerator: `CmdOrCtrl+L+${idx + 1}`,
                        click: () => onLoadURL(instance),
                    }
                })
            ]
        },
        { 
          type: 'separator'
        },
        {
          label: 'Add Instance',
          click: onAdd
      },
    ]
  },
  {
    role: 'windowMenu'
  }
];

module.exports = {
  buildTemplate
};