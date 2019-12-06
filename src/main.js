const electron = require('electron')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

/**
 * Disable menu.
 */
const Menu = electron.Menu;
Menu.setApplicationMenu(null);


class Desktop {
  constructor() {
    this.win = null;
    this.createWindow();
    this.handleEvents();
    this.develop();
  }

  createWindow() {
    this.win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
  }
  
  handleEvents() {
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.close);
  }

  /**
   * Debug for developers.
   */
  develop() {
    const globalShortcut = electron.globalShortcut;
    globalShortcut.register('Control+Shift+i', () => {
      this.win.webContents.openDevTools();
    })
  }
  
  run() {
    // Load index.html file
    this.win.loadURL('http://127.0.0.1:8080')
  
    // Handle window closed.
    this.win.on('closed', () => {
      this.win = null
    });
  }

  close() {
    // Keep app active on MacOS.
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }
}


const desktop = new Desktop();
desktop.run();
