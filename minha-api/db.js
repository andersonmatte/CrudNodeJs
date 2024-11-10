// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); // Banco de dados em memória

// Criação da tabela de produtos
db.serialize(() => {
    db.run(`
        CREATE TABLE produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL
        )
    `);
});

module.exports = db;
