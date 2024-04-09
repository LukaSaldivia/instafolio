const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ejse = require('ejs-electron')
const ipc = ipcMain

function createWindow(){
  const win = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })
  win.loadFile(path.join(__dirname, 'src','views','index.ejs'))

  // ACTIONS
  ipc.on('window:close', ()=> {
    win.close()
  })
  ipc.on('window:minimize', ()=> {
    win.minimize()
  })
  ipc.on('window:maximize', ()=> {
    if (win.isMaximized()) {
      win.restore()
    }else{
      win.maximize()
    }
  })

  win.on('maximize', ()=> {
    win.webContents.send('window:maximized')
  })
  win.on('unmaximize', ()=> {
    win.webContents.send('window:restored')
  })

}

app.whenReady().then(()=> {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform!== 'darwin') app.quit()
  })

})