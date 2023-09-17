import { release } from "node:os";
import { join } from "node:path";
import electron from "electron";
import { app, BrowserWindow, shell, ipcMain, Tray, Menu } from "electron";
import windowStateKeeper from "electron-window-state";

// Database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./Databases/ElectronNote.db");
// -----------------------------------------


// Application Configuration
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
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "false";
// -----------------------------------------





// Our Windows
let win: BrowserWindow | null = null;
let login: BrowserWindow | null = null;


// const preload = join(__dirname, "./preloader.js");
const url: string | undefined = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");
const loginHtml = join(process.env.DIST, "login.html");



// #########################
// #### Tray
// #########################
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


// #########################
// #### Context Menu
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





// #########################
// #### Create Window
// #########################
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
			preload: join(__dirname, "./preloader.js"),
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
			// preload: join(__dirname, "./preloader.js"),
		},
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(url!);
		win.webContents.openDevTools();
	} else {
		win.loadFile(indexHtml);
	}
	// login.loadURL(url!);
	// login.loadFile(loginHtml);


	/**
	 * Menus
	 */
	// Menu.setApplicationMenu(mainMenu);
	win.webContents.on("context-menu", (e) => {
		contextMenu.popup();
	});








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



// $$$$$$$$$$$$$$$$$$
// $$$$ Database $$$$
// $$$$$$$$$$$$$$$$$$
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
