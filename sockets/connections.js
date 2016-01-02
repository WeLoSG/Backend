module.exports = function(io) {
  var app = require('express');
  var router = app.Router();

  // Socket
  io.on('connection', function(socket) {
    socket.on('init', function(data) {
      console.log('Receive data' + JSON.stringify(data));
    });
  });

  return router;
};
