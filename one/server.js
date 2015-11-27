var http = require('http'),
fs = require('fs'),
io = require('socket.io'),
index;
fs.readFile('./index.html', function (err, data) {
 if (err) {
    throw err;
 }
 index = data;
});
var server = http.createServer(function(request, response) {
  response.writeHeader(200, {'Content-Type': 'text/html'});
  response.write(index);
  response.end();
}).listen(1223);
//and replace var socket = io.listen(1223, "1.2.3.4"); with:
var socket = io.listen(server);
