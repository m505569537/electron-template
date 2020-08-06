const { app, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(path.resolve(__dirname, 'dist'), {
  electron: require('./node_modules/electron')
})

function createWindow () {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./dist/index.html')
}

app.whenReady().then(createWindow)

// 当所有窗口都关闭后退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})