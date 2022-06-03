const express = require('express');
const http = require('http');
const app = express();
const { Server, Socket } = require('socket.io');

const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connect', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      console.log('message: ' + msg);
    });
  });
server.listen(3000, () => console.log('Listening in PORT 3000....'))
