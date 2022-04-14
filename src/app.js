const { app, ipcMain, BrowserWindow, Menu } = require('electron');
const path = require('path');

const instanceManager = require('./instance-manager');
const { buildTemplate } = require('./menu');
const { Sources } = require('./sources');

const splashWidth = 448;
const splashHeight = 256;
const sourcesWidth = 512;
const sourcesHeight = 400;
const mainWidth = 1024;
const mainHeight = 1024;

const createWindow = async () => {
  const splash = new BrowserWindow({
    width: splashWidth, 
    height: splashHeight, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true 
  });
  const mainWindow = new BrowserWindow({
    width: sourcesWidth,
    height: sourcesHeight,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  await splashToMain(splash, mainWindow);
  await bindIpc(mainWindow);
  await bindMenu(mainWindow);
};

const splashToMain = async (splash, mainWindow) => {
  splash.loadFile(path.join(__dirname, 'splash', 'splash.html'));

  const url = await new Promise((resolve, reject) => {
    instanceManager.getCurrentInstanceUrl(resolve);
  });

  if (url !== null && typeof url === 'string') {
    mainWindow.loadURL(url);
    mainWindow.setSize(mainWidth, mainHeight);
  } else {
    mainWindow.loadFile(path.join(__dirname, 'add-source', 'add-source.html'));
    mainWindow.setSize(sourcesWidth, sourcesHeight);
  }

  mainWindow.center();
  mainWindow.show();
  splash.close();
};

const bindIpc = async (mainWindow) => {
  ipcMain.on('add-instance-type', (event, type, url) => {
    instanceManager.addInstanceType(type, url);
    console.log('Adding type binding menu:', type, url);
    bindMenu(mainWindow);
  });
  ipcMain.on('load-url', (event, url) => {
    instanceManager.setCurrentInstanceUrl(url);
    mainWindow.loadURL(url);
  });
  ipcMain.on('load-file', (event, file) => {
    mainWindow.loadFile(file);
  });
  ipcMain.on('resize', (event, width, height) => {
    mainWindow.setSize(width, height);
    mainWindow.center();
  });
};

const bindMenu = async (mainWindow) => {
  const locals = await instanceManager.getInstanceTypeUrls(Sources.LOCAL);
  const remotes = await instanceManager.getInstanceTypeUrls(Sources.SELF_HOSTED);
  const clouds = await instanceManager.getInstanceTypeUrls(Sources.CLOUD);

  const template = buildTemplate(app.name, locals, remotes, clouds, true, () => {
    mainWindow.loadFile(path.join(__dirname, 'add-source', 'add-source.html'));
    mainWindow.setSize(sourcesWidth, sourcesHeight);
    mainWindow.center();
  }, (url) => {
    instanceManager.setCurrentInstanceUrl(url);
    mainWindow.loadURL(url);
    mainWindow.setSize(mainWidth, mainHeight);
    mainWindow.center();
  });

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
