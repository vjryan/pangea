var app  = require('./app');
var http = require('http');

var port = 8000;
app.set('port', port);

var server = http.createServer(app);
server.listen(port, function(){

    console.log('Server started!');
});


module.exports = server;