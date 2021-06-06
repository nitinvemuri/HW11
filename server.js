const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

const notes = require('./Develop/db/db.json')


//ROUTES _____________________________________________________________________________________________________________
app.get('/api/notes', (req,res) => {
    res.json(notes.slice(1));
});
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public'))
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
});

function createNotes(body,notesArray) {
    const newNotes = body;
    if (!Array.isArray(notesArray))
    notesArray = [];
}

const PORT = process.env.PORT || 3002;



app.listen(PORT, () => {
    console.log(`API SERVER IS IN PORT ${PORT}`);
});