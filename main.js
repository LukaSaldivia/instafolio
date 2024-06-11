const createWindow = require('./src/libs/createWindow');

const { app, BrowserWindow, ipcMain } = require('electron')


app.whenReady().then(()=> {
  createWindow(['index'],true)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(['index'],true)
  })

  app.on('window-all-closed', () => {
    if (process.platform!== 'darwin') app.quit()
  })

})