let dbmgr = require('./dbmgr');
let db = dbmgr.dB;

exports.getNames = () => {
	const sql = "SELECT * FROM Notes";
	let stmt = db.prepare(qry);
	let res = stmt.all();
	return res;
}