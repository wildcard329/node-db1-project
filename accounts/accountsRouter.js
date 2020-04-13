const express = require('express')

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('accounts').then(account => {
        res.status(200).json({ data: account })
    })
    .catch(error => {
        console.error(error.message);
        res.status(500).json({ error: error.message })
    });
});

router.get("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json({ data: acount })
        })
        .catch(error => {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        });
});

router.post('/', (req, res) => {
    const accountData = req.body;
    db('accounts')
        .insert(accountData, 'id')
        .then(ids => {
            const id = ids[0];
            db('accounts')
                .where({ id })
                .first()
                .then(account => {
                    res.status(201).json({ data: account });
                });
        })
        .catch(error => {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        });
});

router.patch('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    db('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'update successful' });
            } else {
                res.status(404).json({ message: "no accounts by that id found "})
            }
        })
        .catch(error => {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        });
});

router.delete('/:id', (req, res) => {
    db('posts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'record deleted successfully' })
            } else {
                res.status(404).json({ message: 'no accounts by that id found' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});