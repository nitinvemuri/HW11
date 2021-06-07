const router = require('express').Router();
const { notes } = require('../db/db.json')
const { createNote,deleteNote} = require('../function')

router.get('./notes', (req,res) => {
    let saved = notes;
    res.json(saved);
})

router.post('./notes', (req,res) => {
    req.body.id = notes.length.toString();
    let note = createNote(req.body, notes);
    res.json(note);
});

router.delete('./notes', (req,res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
})

module.exports = router;