const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    db.select('*').from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.message })
        })
})

server.get('/:id', (req, res) => {
    db.select()
})

server.post('/', (req, res) => {
    const post = req.body;

    db('accounts').insert(post)
        .then(ids => {
            res.status(201).json({ inserted: ids })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.message })
        })
})

module.exports = server;
