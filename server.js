var express = require ("express");
var route = require ('./server/routes/route');

var PORT_NUMBER = 3003;
var server = express ();

/** Exposes the Express routes
    to the public **/
server.use ('/', express.static (__dirname + '/dist'));
server.use ('/route', route);

/** Enable server
    and listen on given port number **/
server.listen (PORT_NUMBER, function () {
  console.log ('Express is listening on port ' + PORT_NUMBER);
});
