const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('db'));
app.use(express.static('public'));

app.get()

const PORT = process.env.PORT || 3002;



app.listen(PORT, () => {
    console.log(`API SERVER IS IN PORT ${PORT}`);
});