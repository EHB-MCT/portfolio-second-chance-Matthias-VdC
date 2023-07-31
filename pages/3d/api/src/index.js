const app = require('express')();
const http = require('http').Server(app);
// https://socket.io/docs/v3/handling-cors/
const io = require("socket.io")(http, { cookie: true });

let clients = [];

io.on('connection', function (socket) {
    if (io.engine.clientsCount > 2) { socket.disconnect() }
    clients.push(socket.id);
    socket.join("lobby");
    socket.userData = { x: 0, y: 0, z: 0 }
    socket.gameData = { level: 0, money: 0, cubes: [] }
    console.log(`Player ${socket.id} connected!`);
    socket.emit('setId', { id: socket.id });

    socket.on('disconnect', function () {
        console.log(`Player ${socket.id} disconnected!`);
        clients = arrayRemove(clients, socket.id);
        socket.disconnect();
    });
    socket.on('update', function (data) {
        for (let i of clients) {
            socket.to(i).emit('userPos', data);
        }
    });
});

http.listen(8000, function () {
    console.log('listening on http://localhost:8000');
});

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}
