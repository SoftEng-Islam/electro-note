import { app, BrowserWindow, shell, ipcMain, Tray, Menu} from "electron";
import { release } from "node:os";
import { join } from "node:path";

import electron from "electron";
import windowStateKeeper from "electron-window-state";


// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;


// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'





// Our Windows
let win: BrowserWindow | null = null;
let login: BrowserWindow | null = null;


// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')

const url: string | undefined = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");
const loginHtml = join(process.env.DIST, "login.html");



// #########
// #### Tray
// #########
let trayMenu = Menu.buildFromTemplate([{ label: "Item 1" }, { role: "quit" }]);
let tray;
function createTray() {
	tray = new Tray(join(process.env.DIST!, "../public/logo.png"));
	tray.setToolTip("ElectroNote");
	tray.on("click", (e) => {
		if (e.shiftKey) {
			app.quit();
		} else {
			win!.isVisible() ? win!.hide() : win!.show();
		}
	});
	tray.setContextMenu(trayMenu);
}


// #################
// Context Menu
// let mainMenu = Menu.buildFromTemplate(require("./menu"));
let contextMenu = Menu.buildFromTemplate([
	{ label: "Item 1" },
	{ role: "editMenu" },
	{ label: "Item 3" },
]);

// #################
// Note Contextmenu
let NoteContextMenu = Menu.buildFromTemplate([
	{ label: "Item 1" },
	{ role: "editMenu" },
	{ label: "Item 3" },
]);



// ##################
// #### Create Window
// ##################
async function createWindow() {
	createTray();
	let winState = windowStateKeeper({
		defaultWidth: 1600,
		defaultHeight: 800,
	});


	win = new BrowserWindow({
		// transparent: true,
		width: winState.width,
		height: winState.height,
		x: winState.x,
		y: winState.y,
		frame: false,
		title: "ElectroNote",
		// icon: join("favicon.ico"),
		webPreferences: {
			// enableRemoteModule: true,
			nodeIntegration: true,
			contextIsolation: false,
			// preload: join(__dirname, "./preloader.js"),
			preload: preload,
		},
	});

	login = new BrowserWindow({
		width: 450,
		height: 450,
		frame: false,
		transparent: true,
		title: "Login",
		// icon: join(process.env.PUBLIC, "favicon.ico"),
		parent: win,
		show: false,
		webPreferences: {
			// nodeIntegration: true,
			// contextIsolation: false,
			// preload: preload,
		},
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(url!);
		win.webContents.openDevTools();
		// login.loadURL(url!);
	} else {
		win.loadFile(indexHtml);
		// login.loadFile(loginHtml);
	}
	electron.powerMonitor.on("resume", (e) => {if (!win) createWindow();});
	electron.powerMonitor.on("suspend", (e) => {console.log("Saving Some Data");});

	// close
	ipcMain.on("closeApp", () => {win!.close();});
	// minimizeApp
	ipcMain.on("minimizeApp", () => {win!.minimize();});
	// maximizeApp
	ipcMain.on("maximizeApp", () => {
		if (win!.isMaximized()) {win!.restore();}
		else {win!.maximize();}
	});



	// Menu.setApplicationMenu(mainMenu);
	win.webContents.on("context-menu", (e) => {
		contextMenu.popup();
	});



	// Test actively push message to the Electron-Renderer
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());

		const sqlite31 = require("sqlite3").verbose();
		const db1 = new sqlite31.Database("./Databases/ElectronNote.db");
		let	myNotes = [];
		db1.serialize(() => {
			db1.each("SELECT rowid AS id, NoteName FROM Notes", (err, row ) => {
				// console.log("line 167: " + row.id + ": " + row.NoteName);
				myNotes.push(row.NoteName);
				win?.webContents.send('fetchNotes', myNotes);
				console.log(myNotes);
			});
		})
	});

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith("https:")) shell.openExternal(url);
		return { action: "deny" };
	});
	// win.webContents.on('will-navigate', (event, url) => { }) #344
}












app.whenReady().then(createWindow);


app.on("window-all-closed", () => {
	win = null;
	login = null;
	if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on("activate", () => {
	const allWindows = BrowserWindow.getAllWindows();
	if (allWindows.length) {
		allWindows[0].focus();
	} else {
		createWindow();
	}
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
	const childWindow = new BrowserWindow({
		webPreferences: {
			preload: join(__dirname, "./preloader.js"),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		childWindow.loadURL(`${url}#${arg}`);
	} else {
		childWindow.loadFile(indexHtml, { hash: arg });
	}
});


const testMgr = require("./models/testmgr");
