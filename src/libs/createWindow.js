const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ejse = require('ejs-electron')
const ipc = ipcMain

function createWindow(filename = ['index'], isMain = false, data = {}){
  const win = new BrowserWindow({
    width: 940,
    height: 560,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  })


  const basePath = `${path.join(__dirname,'..', 'public')}`;

  let file = filename.pop() 
  ejse.data({
    basePath,
    data
  })
  win.loadFile(path.join(__dirname, '..','views',...filename,`${file}.ejs`));
  

  // ACTIONS
  ipc.on('window:close', ()=> {
    if (isMain)
      app.quit();
    else
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

  return win

}

module.exports = createWindow