//https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
//use path module
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// initialize our express app
const app = express();
//use hbs view engine
var ejs = require('ejs')

var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');



//console.log('h_'+flash); return false;
//Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/productstutorial';
//let dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey',resave: true,saveUninitialized: true}));
app.use(flash());
app.use(expressValidator());
app.use(function(req, res, next){
// if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

const routes = require('./routes/route'); // Imports routes for the products

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

//set folder public as static folder for static file
//app.use('/assets',express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));



let port = 7000;

app.listen(port, () => {
    console.log('Welcome! Server is up and running on port numner ' + port);
});