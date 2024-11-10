// app.js
const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

// Criar um novo produto (Create)
app.post('/produtos', (req, res) => {
    const {nome, preco} = req.body;
    const query = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
    db.run(query, [nome, preco], function (err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({
            id: this.lastID,
            message: 'Produto criado com sucesso!'
        });
    });
});

// Listar todos os produtos (Read)
app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (rows.length === 0) {
            res.json("Nenhum registro encontrado!");
        }
        res.json(rows);
    });
});

// Obter um produto específico por ID (Read)
app.get('/produtos/:id', (req, res) => {
    const query = 'SELECT * FROM produtos WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (!row) {
            return res.status(404).json({message: `Registro com o id ${req.params.id} não encontrado!`});
        }
        res.json(row);
    });
});

// Atualizar um produto por ID (Update)
app.put('/produtos/:id', (req, res) => {
    const {nome, preco} = req.body;
    const query = 'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?';
    db.run(query, [nome, preco, req.params.id], function (err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({updated: this.changes, message: 'Produto atualizado com sucesso!'});
    });
});

// Excluir um produto por ID (Delete)
app.delete('/produtos/:id', (req, res) => {
    const query = 'DELETE FROM produtos WHERE id = ?';
    db.run(query, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({deleted: this.changes, message: 'Produto excluído com sucesso!'});
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
