
var express = require ("express");
var rabbit  = require ('./server/routes/rabbit.js');

var app = express ();

/*
 *  bodyParser
 *  -- these options allow larger POST requests to be sent over
 *  NOTE: required for POST requests
 */
// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000}));

app.use ('/', express.static(__dirname + '/dist', {maxAge:31557600000}));
app.use ('/rabbit', rabbit);

/*
 *  Allow client-side access to the server-side node modules.
 */
// app.use ('/node_modules', express.static(__dirname + '/node_modules', {maxAge:31557600000}));

/*
 *  Starts the node instance on port.
 */
app.listen(3003, function() {
  console.log('Listening on port  3003');
});
