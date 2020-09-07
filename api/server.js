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

// server.get('/:id', (req, res) => {
//     db.select()
// })

server.post('/', (req, res) => {
    const post = req.body;

    db('accounts').insert(post, 'id')
        .then(ids => {
            res.status(201).json({ inserted: ids })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.message })
        })
})

server.put('/:id', (req, res) => {
    const changes = req.body
    const id = req.params.id

    db('accounts').where({ id: id }).update(changes)
        .then(count => {
            if(count) {
                res.status(200).json({ messgae: "updated successfully" })
            } else { 
                res.status(404).json({ error: "thing not found" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.message })
        })
})

server.delete('/:id', (req, res) => {
    const id = req.params.id

    db('accounts').where({ id: id }).del()
        .then(account => {
            if(account) {
                res.status().json({ message: "successfully deleted account" })
            } else {
                res.status(404).json({ error: "account does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err.message })
        })
})

module.exports = server;
