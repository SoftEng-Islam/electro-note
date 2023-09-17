import {ipcMain } from "electron";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./Databases/ElectronNote.db");
// -----------------------------------------




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
