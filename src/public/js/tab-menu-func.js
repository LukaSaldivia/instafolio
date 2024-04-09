const { ipcRenderer } = require('electron')
const ipc = ipcRenderer
const maxWindow = document.querySelector('#maxWindow')
var isLeftMenuOpened = false


function changeStateMaxWindow(bool){
  maxWindow.classList.toggle('active',bool)
  maxWindow.title = ['Ampliar', 'Restaurar'][+bool] + ' ventana'
}

closeWindow.addEventListener('click', () => {
  ipc.send('window:close')
})

minWindow.addEventListener('click', () => {
  ipc.send('window:minimize')
})

maxWindow.addEventListener('click', () => {
  ipc.send('window:maximize')
})

ipc.on('window:maximized', () => { changeStateMaxWindow(true) })
ipc.on('window:restored', () => { changeStateMaxWindow(false) })

showHideLeft.addEventListener('click', () => {
  isLeftMenuOpened = !isLeftMenuOpened
  leftMenu.classList.toggle('active', isLeftMenuOpened)
  console.log(isLeftMenuOpened);
})