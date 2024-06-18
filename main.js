const createWindow = require('./src/libs/createWindow');

const { app, BrowserWindow, ipcMain } = require('electron')


app.whenReady().then(()=> {
  createWindow(['index'],true, {
    title : 'Hola mundito'
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(['index'],true,{title:'Hola mundito'})
  })

  app.on('window-all-closed', () => {
    if (process.platform!== 'darwin') app.quit()
  })

})