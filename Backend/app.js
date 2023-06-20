var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var cors = require('cors')


var users = require('./routes/users');
const mongoose  = require('mongoose');
const products = require('./routes/products');
const unzip = require('./routes/unzip');

const {MONGO_URI} = process.env

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI)
    .then(() => console.log("!Connect Complete!"))
    .catch((err) => console.log(err)) 
var app = express();



app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));

app.use('/users', users);
app.use('/products', products);
app.use('/unzip', unzip);

app.listen(3000, () => {
  console.log(`App is running at port 3000.`)
})

module.exports = app;
