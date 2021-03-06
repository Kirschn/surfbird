const { shell, ipcMain } = require('electron')
const fs = require('fs')

module.exports = function (app, mainWindow) {
  ipcMain.on('surfbird:send:themes', function (e) {
    fs.readdir(app.getPath('documents'), function (err, files) {
      if (err) return console.log(err)

      if (files !== undefined) {
        files.forEach(function (theme) {
          if (theme.indexOf('.css') > -1) {
            var th = {name: theme.split('.')[0], fullpath: app.getPath('documents') + theme}

            mainWindow.webContents.send('surfbird:get:themes', th)
          }
        })
      }
    })
  })

  ipcMain.on('surfbird:open:themes', function (e) {
    shell.openExternal('file:///' + app.getPath('documents'))
  })
}
