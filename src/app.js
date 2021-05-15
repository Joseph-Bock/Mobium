// Modules

const path = require('path');
const cors = require('cors');
const session = require('express-session');
const methodOverride = require('method-override')

const home = require('./routes/home');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const users = require('./routes/users');
const products = require('./routes/products');
const catalog = require('./routes/catalog');
const cart = require('./routes/cart');

//Middlewares

const globalData = require('./middlewares/globalData');
const guestRoutes = require('./middlewares/guestRoutes');


// Express Setup

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(session({secret: 'Mobium',
                 resave: false,
                 saveUninitialized: false}));

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));


//Express Routes

app.use(globalData);

app.use('/', home);

app.use('/register', guestRoutes, register);

app.use('/login', guestRoutes, login);

app.use('/logout', logout);

app.use('/users', users);

app.use('/products', products);

app.use('/catalog', catalog);

app.use('/cart', cart);

app.use('/', (req, res) => {
    return res.redirect('/');
});


//Set up Server on Port 3000

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Initialized - Port:3000");
})