import { app, BrowserWindow, shell, ipcMain, Tray, Menu } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import path from "path";
import fs from "fs";
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
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
	? join(process.env.DIST_ELECTRON, "../public")
	: process.env.DIST;

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

// Tray
let trayMenu = Menu.buildFromTemplate([{ label: "Item 1" }, { role: "quit" }]),
	tray: Tray;
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

// Context Menu
// let mainMenu = Menu.buildFromTemplate(require("./menu"));
let contextMenu = Menu.buildFromTemplate([
	{ label: "Item 1" },
	{ role: "editMenu" },
	{ label: "Item 3" },
]);

// Note Contextmenu
let NoteContextMenu = Menu.buildFromTemplate([
	{ label: "Item 1" },
	{ role: "editMenu" },
	{ label: "Item 3" },
]);

// Our Windows
let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url: string | undefined = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");
//* ----------------------------------------------------------

// Database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./Databases/ElectronNote.db");

function CreateDataBaseFileForUser(fullName, userName, passWord) {
	// Read Dir and Return list Of users(Files)

	const directoryPath = path.join(__dirname, "Users");
	//passsing directoryPath and callback function
	fs.readdir(directoryPath, function (err, files) {
		//handling error
		if (err) {
			return console.log("Unable to scan directory: " + err);
		}
		//listing all files using forEach
		files.forEach(function (file) {
			// Do whatever you want to do with the file
			console.log(file);
		});
	});

	// const db = new sqlite3.Database(`./Users/${userName}.db`);
	// fs.writeFile(`${userName}.db`, "", (err) => {
	// 	if (err) console.log("Error");
	// });
	// db.serialize(() => {
	// 	db.run("CREATE TABLE UserInfo (FullName,  TEXT)");
	// 	const stmt = db.prepare(
	// 		"INSERT INTO Notes (NoteName , NoteColor) VALUES  (?,?)"
	// 	);
	// 	stmt.run(NoteName, NoteColor);
	// 	stmt.finalize();
	// 	db.each("SELECT rowid AS id, NoteName FROM Notes", (err, row) => {
	// 		console.log(row.id + ": " + row.NoteName);
	// 	});
	// });
}

function insertNote(NoteName, NoteColor) {
	db.serialize(() => {
		//	db.run("CREATE TABLE Notes (NoteName TEXT)");
		const stmt = db.prepare(
			"INSERT INTO Notes (NoteName , NoteColor) VALUES  (?,?)"
		);
		stmt.run(NoteName, NoteColor);
		stmt.finalize();
		db.each("SELECT rowid AS id, NoteName FROM Notes", (err, row) => {
			console.log(row.id + ": " + row.NoteName);
		});
	});
	// db.close();
}

ipcMain.on("createNote", (_event, Argument) => {
	console.log(Argument);
	insertNote(Argument, "Green");
});

ipcMain.on("createUser", (_event, fullname, username, password) => {
	console.log(fullname, username, password);
	CreateDataBaseFileForUser(fullname, username, password);
});

// ? Send Data For User
// let	myNotes = [];
// db1.serialize(() => {
// 	db1.each("SELECT rowid AS id, NoteName FROM Notes", (err, row ) => {
// 		// console.log("line 167: " + row.id + ": " + row.NoteName);
// 		myNotes.push(row.NoteName);
// 		win?.webContents.send('fetchNotes', myNotes);
// 		console.log(myNotes);
// 	});
// })

//* ------------------------------------------------------------------
//! Create Windows

async function createWindow() {
	createTray();
	let winState = windowStateKeeper({
		defaultWidth: 1600,
		defaultHeight: 800,
	});

	win = new BrowserWindow({
		title: "ElectroNote",
		width: winState.width,
		height: winState.height,
		x: winState.x,
		y: winState.y,
		backgroundColor: "#161616",
		show: false,
		frame: false,
		// transparent: true,
		// icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
		webPreferences: {
			preload,
			// Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
			// Consider using contextBridge.exposeInMainWorld
			// Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(url!);
		win.webContents.openDevTools();
	} else {
		win.loadFile(indexHtml);
	}

	// Test actively push message to the Electron-Renderer
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith("https:")) shell.openExternal(url);
		return { action: "deny" };
	});
	win.webContents.on("will-navigate", (event, url) => {});

	electron.powerMonitor.on("resume", (e) => {
		if (!win) createWindow();
	});
	electron.powerMonitor.on("suspend", (e) => {
		console.log("Saving Some Data");
	});
	// close
	ipcMain.on("closeApp", () => {
		win!.close();
	});
	// minimizeApp
	ipcMain.on("minimizeApp", () => {
		win!.minimize();
	});
	// maximizeApp
	ipcMain.on("maximizeApp", () => {
		if (win!.isMaximized()) {
			win!.restore();
		} else {
			win!.maximize();
		}
	});

	// Menu.setApplicationMenu(mainMenu);
	win.webContents.on("context-menu", (e) => {
		contextMenu.popup();
	});

	win.once("ready-to-show", () => {
		win.show();
	});
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	win = null;
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

//* ------------------------------------------------------------------

// const sqlite3 = require("sqlite3").verbose();
// const filepath = "./Databases/ElectronNote.db";

// function createTable(db) {
// 	db.exec(`
// 	CREATE TABLE Notes
// 	(
// 		ID INTEGER PRIMARY KEY AUTOINCREMENT,
// 		name   VARCHAR(50) NOT NULL,
// 		color   VARCHAR(50) NOT NULL,
// 		weight INTEGER NOT NULL
// 	);
// `);
// }

// function createDbConnection() {
// 	if (fs.existsSync(filepath)) {
// 		console.log('return new sqlite3.Database(filepath);');
// 		return new sqlite3.Database(filepath);
// 	} else {
// 		const db = new sqlite3.Database(filepath, (error) => {
// 			if (error) {
// 				return console.error(error.message);
// 			}
// 			createTable(db);
// 		});
// 		console.log("Connection with SQLite has been established");
// 		return db;
// 	}
// }
// createDbConnection();
// // createTable(createDbConnection());

// function insertRow($NoteName: string, $Color: string) {
// 	const [noteName = $NoteName, color = $Color] = process.argv.slice(2);
// 	createDbConnection().run(
// 		`INSERT INTO Notes (NoteName , Color)`, [noteName, color],
// 		function (error) {
// 			if (error) {console.error(error.message);}
// 			console.log(`Inserted a row with the ID: ${this.lastID}`);
// 		}
// 	);
// }

// ipcMain.on("createNote", (_event, Argument) => {
// 	console.log(Argument);
// 	insertRow(Argument, "Green");
// });

// function selectRows() {
// 	createDbConnection().each(`SELECT * FROM Notes`, (error, row) => {
// 		if (error) {
// 			throw new Error(error.message);
// 		}
// 		console.log(row);
// 	});
// }
// // selectRows();

// function updateRow($id, $name, $color) {
// 	let [id, name, color] = process.argv.slice(3);
// 	createDbConnection().run(
// 		`UPDATE Notes SET name = ? , color = ? WHERE id = ?`,
// 		[(name = $name), (color = $color), (id = $id)],
// 		function (error) {
// 			if (error) {
// 				console.error(error.message);
// 			}
// 			console.log(`Row ${id} has been updated`);
// 		}
// 	);
// }

// // updateRow(1, "Ahmed", "Green");

// async function deleteRow() {
// 	const [id] = process.argv.slice(2);
// 	createDbConnection().run(
// 		`DELETE FROM Notes WHERE id = ?`,
// 		[id],
// 		function (error) {
// 			if (error) {
// 				return console.error(error.message);
// 			}
// 			console.log(`Row with the ID ${id} has been deleted`);
// 		}
// 	);
// }

// // deleteRow();
