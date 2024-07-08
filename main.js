const createWindow = require('./src/libs/createWindow');

const { app, BrowserWindow, ipcMain } = require('electron')
const Controller = require('./src/controllers/Controller')


// instancias
const empresas = require('./src/controllers/empresas.controller.js')
const categorias = require('./src/controllers/categorias.controller.js')
const tiposDeVenta = require('./src/controllers/tiposDeVenta.controller.js')

app.whenReady().then(()=> {
  // createWindow(['components','_table'],true, {
  //   table : empresas.table()
  // })
  createWindow(['index'],true, {
    instances : Controller.instances.map(i => {
      return {
        json : i.model.json, 
        color : i.color
      }
    })
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(['index'],true,{title:'Hola mundito'})
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

})