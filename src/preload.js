// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getFile: (fileName) => ipcRenderer.send('get-file', fileName),
    onFileResponse: (func) => ipcRenderer.on('get-file-response', (event, data, fileName) => func(data, fileName)),
    writeToFile: (data, fileName) => ipcRenderer.send('write-to-file', data, fileName),
    onWriteToFileResponse: (func) => ipcRenderer.on('file-written-to', (event, data, fileName) => func(data, fileName)),
    watchFile: (fileName) => ipcRenderer.send('watch-file', fileName),
    onFileChange: (func) => ipcRenderer.on('file-changed', (event, path) => func(path))
});