var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose(); // Import sqlite3 module
const path = require('path'); // Import path module

const dbPath = path.join(__dirname, '../db/produkter.db'); // Define the path to the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not open database', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
  }
});

//skapa tabellen
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produkter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    namn TEXT,
    beskrivning TEXT,
    pris REAL,
    bildURL TEXT,
    publicerad DATETIME DEFAULT CURRENT_TIMESTAMP,
    lagersaldo INTEGER,
    skapad DATETIME DEFAULT CURRENT_TIMESTAMP
  ) `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "produkter" is ready.');
    }
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
