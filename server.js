  
const PORT = process.env.PORT || 3002;
const fs = require('fs');
const path = require('path');
const changeNote = require('./addDelete/changenote')
const Dir = path.join(__dirname, '/public')

const express = require('express');
const app = express();

const allNotes = require('./db/db.json');
const { all } = require('./addDelete/changenote');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(Dir, './public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('*', (req, res) => {
    res.sendFile(path.join(Dir, './public/index.html'));
});


function createNote(body, notesArr) {
    const newNote = body;
    if (!Array.isArray(notesArr))
        notesArray = [];
    
    if (notesArr.length === 0)
        notesArr.push(0);

    body.id = notesArr[0];
    notesArr[0]++;

    notesArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, allNotes);
    console.log(newNote)
    res.json(newNote);
    fs.readFile('./db/db.json', (err,allNotes)=> {
        if(err)
        throw(err)
    })
    console.log('success')
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});









