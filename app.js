// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    connect = require('connect'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    multer = require('multer');
    

// import routes
var routes = require('./controller/index');
//var user  = require('./controller/user');
var card = require('./controller/card');
var cardtype = require('./controller/cardtype');
var manufacturer = require('./controller/manufacturer');


// initialize express web application framework
// http://expressjs.com/
var app = express();

// these two lines replace bodyParser()
//app.use(express.bodyParser({uploadDir:'./tmp'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(multer({ dest: './Images/'}));

// configure static directory
app.use(express.static('public'));
app.use(express.static('Images'));

//configure view rendering engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// subtitle values access via the header template
app.set('subtitle', 'Hockey Cards');

//configure routes
app.use('/', routes);
//app.use('/user', user);
app.use('/card', card);
app.use('/cardtype', cardtype);
app.use('/manufacturer', manufacturer);
app.use('/Images', express.static(__dirname + "/Images"))

app.set('port', 8010);
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));
