const { app, BrowserWindow } = require('electron')
const path = require('path')
require('dotenv').config()

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 300,
    icon: path.join(__dirname, '/view/logo.png'),
    // autoHideMenuBar: true,

    webPreferences: {
      preload: path.join(__dirname, 'index.js'),
      nodeIntegration: true,
      // contextIsolation: false,
      // allowRunningInsecureContent: true,
      // webSecurity: false,

    }
  })


  // and load the index.html of the app.
  mainWindow.loadFile('./src/view/index.html')
  // mainWindow.loadFile('src/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.