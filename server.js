const { json } = require('body-parser');
const express = require('express');
const fs = require('fs');
const { charsets } = require('mime');
const path = require('path')
const app = express();
const savedNotes = require('./db/db.json')
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
const router = require('express').Router();
const { notes } = require('./db/db.json')
const { createNote,deleteNote} = require('./function')

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



function Notes (title,text) {
    this.title = title;
    this.text = text;
}

//ROUTES 

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public'))
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.post('/api/notes', (req,res) => {
    const newNote = req.body;
    console.log(newNote);
    fs.readFile('./db/db.json', (err,data)=> {
        if (err)
        throw(err)
    });
    const noteString = JSON.stringify(newNote)

    fs.writeFile('./db/db.json', noteString, (err) => {
         console.error(err);
         console.log('success!')
    });

    
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})






const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`API SERVER IS IN PORT ${PORT}`);
});