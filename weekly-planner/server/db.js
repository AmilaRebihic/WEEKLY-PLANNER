import Database from 'better-sqlite3';

const db = new Database("planner.db");

/**
 * Skapar tabellen "tasks" om den inte finns.
 * done = 0/1 eftersom SQLite ofta använder 0/1 istället för true/false.
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT NOT NULL,
    text TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL
  );
`);
export default db;