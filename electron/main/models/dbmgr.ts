const sqlite3 = require("sqlite3").verbose();
const dB = new sqlite3.Database("./Databases/ElectronNote.db");

exports.dB = dB;



