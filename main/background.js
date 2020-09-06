import { app, ipcMain, ipcRenderer } from 'electron'
import serve from 'electron-serve'
import * as Store from 'electron-store'
import { createWindow } from './helpers'

// DB
import StudioDB from '../db/stores/studio'
import WorkDB from '../db/stores/work'
import RateDB from '../db/stores/rate'
import DirectorDB from '../db/stores/director'

global.studioDB = StudioDB
global.workDB = WorkDB
global.rateDB = RateDB
global.directorDB = DirectorDB

global.mainWindow

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  global.mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await global.mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await global.mainWindow.loadURL(`http://localhost:${port}/home`);
    global.mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

const store = new Store({ name: 'messages' });

ipcMain.on('works-change', (event, arg) => {
  console.log('works change')
  global.mainWindow.webContents.send('work-change')
});

ipcMain.on('get-messages', (event, arg) => {
  event.returnValue = store.get('messages') || [];
});

ipcMain.on('add-message', (event, arg) => {
  const messages = store.get('messages') || [];
  messages.push(arg);
  store.set('messages', messages);
});
