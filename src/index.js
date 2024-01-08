const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

ipcMain.on('get-file', (event, fileName) => {
  console.log(event, fileName);
  const data = fs.readFileSync('D:/fauxData/' + fileName + '.json', 'utf8')
  event.sender.send('get-file-response', data, fileName)
  console.log('file got and res and logged');
})

ipcMain.on('write-to-file', (event, data, fileName) => {
  fs.writeFileSync('D:/fauxData/' + fileName + '.json', data, {'flag':'a'},  function(err) {
    if (err) {
        return console.error(err);
    }
  });
  event.sender.send('file-written-to', data, fileName)
  console.log('file written to');
});

ipcMain.on('watch-file', (event, fileName) => {
  fs.watch('D:/fauxData/' + fileName + '.json', (eventType, filename) => {
    if (filename) {
      console.log(filename);
      event.sender.send('file-changed', filename)
    }
  });
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      webSecurity: false,
      //nodeIntegration: true,
      contextIsolation: true, // Required for IPC to work
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
