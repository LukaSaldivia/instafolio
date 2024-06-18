const createWindow = require('./src/libs/createWindow');

const { app, BrowserWindow, ipcMain } = require('electron')
// const empresas = require('./src/controllers/empresas.controller')


app.whenReady().then(()=> {
  // createWindow(['components','_table'],true, {
  //   table : empresas.table()
  // })
  createWindow(['index'],true, {
    title : 'Este es el índice'
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(['index'],true,{title:'Hola mundito'})
  })

  app.on('window-all-closed', () => {
    if (process.platform!== 'darwin') app.quit()
  })

})