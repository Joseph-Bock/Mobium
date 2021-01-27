// Express Setup

const express = require('express');
const app = express();

// Modules

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Initialized");
})