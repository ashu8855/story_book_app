const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const { default: mongoose } = require('mongoose');

// Load config 
dotenv.config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select, } = require('./helpers/hbs');

// Handelbars
app.engine('.hbs', exphbs.engine({ helpers: { formatDate, stripTags, truncate, editIcon, select }, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');


// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI + '/' + process.env.DATABASE }),
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
});

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 3000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)