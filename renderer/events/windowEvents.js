import { remote } from 'electron'
import path from 'path'

const editWindow = (workId) => {

    const BrowserWindow = remote.BrowserWindow

    let editWorks = new BrowserWindow({
        width: 900,
        height: 700,
        title: 'New window',
        center: true,
        modal: true,
        show: false,
        frame: false,
        backgroundColor: '#2e2c29',
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });

    editWorks.show()
    editWorks.loadURL(
        process.env !== 'production' ?
            'http://localhost:8888/windows/edit-work?workId=' + workId :
            `file://${path.join(__dirname, '../build/windows/edit-work?workId=' + workId)}`
    );
    editWorks.webContents.openDevTools()
}


export {
    editWindow
}
