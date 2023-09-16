const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const exphbs = require('express-handlebars');

// Load config 
dotenv.config({ path: './config/.env' });

// Connect to database
connectDB();

const app = express();

// Handelbars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
// app.set('views', './views');

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('', require('./routes/index'))

const PORT = process.env.PORT || 3000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)