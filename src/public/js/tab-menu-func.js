const { ipcRenderer } = require('electron')
const ipc = ipcRenderer
const maxWindow = document.querySelector('#maxWindow')

function changeStateMaxWindow(bool){
  const titles = ['Ampliar', 'Restaurar']
  maxWindow.classList.toggle('active',bool)
  maxWindow.title = titles[+bool] + ' ventana'
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