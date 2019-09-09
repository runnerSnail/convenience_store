import { app, BrowserWindow, globalShortcut, Tray, nativeImage, Menu } from 'electron';
let ffi = require('ffi-napi');
let path = require('path');

let threadCount = ffi.Library(path.join(__dirname, './rust_native/target/debug/librust_native'), {
  threadcount: ['int', ['int']]
});

console.log(threadCount.threadcount(12));
console.log(path.join(__dirname, '../rust_native/target/debug/librust_native'))

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray = null;

const createWindow = () => {
  app.dock.hide();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 580,
    height: 425,
    frame: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:3000/`);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  // mainWindow.hide();

  // test
  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  mainWindow.hide();

  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })
  // 系统托盘
  const tary = path.join(__dirname, 'app.ico');
  const icon = nativeImage.createFromPath(tary);
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: function () {
        app.quit();
        app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu);
  tray.on('click', function () {
    mainWindow.isVisible() ? win.hide() : win.show()
    mainWindow.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
  })

  mainWindow.on('close', (e) => {
    //回收BrowserWindow对象
    if (mainWindow.isMinimized()) {
      mainWindow = null;
    } else {
      e.preventDefault();
      mainWindow.minimize();
    }
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Shift+A', () => {
    mainWindow.show();
  })
})