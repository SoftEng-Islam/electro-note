import db from "./dbmgr";

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




export default insertNote;