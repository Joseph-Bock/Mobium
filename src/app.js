// Modules

const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override')

const home = require('./routes/home');
const register = require('./routes/register');
const login = require('./routes/login')
const catalog = require('./routes/catalog');


// Express Setup

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));


//Express Routes

app.use('/', home);

app.use('/register', register);

app.use('/login', login);

app.use('/catalog', catalog);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Initialized - Port:3000");
})