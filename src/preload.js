// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('appwrite', {
    loadURL: (url) => ipcRenderer.send('load-url', url),
    loadFile: (file) => ipcRenderer.send('load-file', file),
    addInstanceType: (type, url) => ipcRenderer.send('add-instance-type', type, url),
    resize: (width, height) => ipcRenderer.send('resize', width, height),
})