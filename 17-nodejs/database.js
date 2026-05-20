const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./evangeliondb.sqlite');

db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON');

    // Users table for authentication
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    // Evangelion characters
    db.run(`CREATE TABLE IF NOT EXISTS characters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        organization TEXT,
        synchronization_rate INTEGER,
        image TEXT
    )`);

    // EVA units piloted by characters
    db.run(`CREATE TABLE IF NOT EXISTS eva_units(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code_name TEXT UNIQUE NOT NULL,
        model_type TEXT NOT NULL,
        status TEXT,
        pilot_id INTEGER NOT NULL,
        image TEXT,
        FOREIGN KEY (pilot_id) REFERENCES characters(id)
    )`);

    // Angels confronted by EVA units and characters
    db.run(`CREATE TABLE IF NOT EXISTS angels(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        angel_number INTEGER NOT NULL,
        attack_type TEXT,
        threat_level TEXT,
        eva_unit_id INTEGER NOT NULL,
        character_id INTEGER NOT NULL,
        image TEXT,
        FOREIGN KEY (eva_unit_id) REFERENCES eva_units(id),
        FOREIGN KEY (character_id) REFERENCES characters(id)
    )`);

    // Tokens closed with logout
    db.run(`CREATE TABLE IF NOT EXISTS blacklisted_tokens(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT UNIQUE,
        expires_at INTEGER
    )`);

    // Images for characters, eva_units, and angels
    db.run(`CREATE TABLE IF NOT EXISTS images(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        filepath TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id INTEGER NOT NULL,
        uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
