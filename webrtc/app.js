var express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser');
  PeerServer = require('peer').PeerServer;

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', routes.index);

app.set('port', process.env.PORT || 200);


// peer_server

var ExpressPeerServer = require('peer').ExpressPeerServer;
var peerExpress = require('express');
var peerApp = peerExpress();
var peerServer = require('http').createServer(peerApp);

var options = { debug: true }
var peerPort = 4937;

peerApp.use('/', ExpressPeerServer(peerServer, options));
peerServer.listen(peerPort);
var server = app.listen(app.get('port'), function() {
	// log a message to console!
});

module.exports = app;
