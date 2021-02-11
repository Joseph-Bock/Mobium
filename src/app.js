// Modules

const path = require('path');

const home = require('./routes/home');
const register = require('./routes/register');
const catalog = require('./routes/catalog');


// Express Setup

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', home);

app.use('/register', register);

app.use('/catalog', catalog);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Initialized");
})