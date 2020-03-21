var app = require('express')();

const port = 3012;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', reason => {
    console.log('user disconnected');
  });


  socket.on('room', data => {
    console.log('room join');
    console.log(data);
    socket.join(data.room);
  });

  socket.on('leave room', data => {
    console.log('leaving room');
    console.log(data);
    socket.leave(data.room)
  });

  socket.on('new message', data => {
    console.log(data.room, "vaay new message");

    socket.broadcast
      .to(data.room)
      .emit('receive message', data)
  });

  setInterval(() => {
    const randomObject = getRandomString(3, 4)().map(item => ({[item]: makeid(56)}));
    const staticObject = getStaticString().map(item => ({ [item]: item }));
    // socket.emit('new message', getStaticString().concat(getRandomString(3,3)()));
    socket.emit('new message', randomObject.concat(staticObject));
  }, 4000)
});

const getRandomString = function f(arrLength, stringLength) {
  const arr = Array(arrLength).fill("").map(() => makeid(stringLength));

  return function () {
    return arr;
  };
};

const getStaticString = getRandomString(5, 8);

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

server.listen(port);