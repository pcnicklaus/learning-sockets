var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;

mongo.connect('mongodb://127.0.0.1/chat', function (err, db) {
    if (err) {
      throw err;
    }

    client.on('connection', function (socket) {

        var msgCol = db.collection('messages');
        var sendStatus = function (s) {
          socket.emit('status', s);
        };

        msgCol.find().limit(100).sort({_id: 1}).toArray(function(err, res) {
            if (err) throw (err);
            socket.emit('output', res);
        })

        socket.on('input', function (data) {
          var name = data.name;
          var message = data.message;
          var whiteSpacePattern = /^\s*$/;

          // this logic isn't working yet!!!!
          if (whiteSpacePattern.test(name) || whiteSpacePattern.test(message)) {
            sendStatus('name and message are required');
          } else {

            msgCol.insert({name: name, message: message}, function () {

              client.emit('output', [data]);

              sendStatus({
                message: "message sent",
                clear: true
              });
            });
          }

        });

    });

});


