const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cookie: true });
let clients = [];


io.on("connection", (socket) => {

    /**
    *   Limit max number of connections to 2
    */
    if (io.engine.clientsCount > 2) {
        socket.emit("err", { message: "Max connections reached" });
        socket.disconnect();
        console.log("Disconnect: player limit reached");
        return;
    }

    /**
    *   Assign an id to every player
    */
    clients.push(socket.id);

    socket.join("lobby");

    socket.userData = { x: 0, y: 0, z: 0 }
    socket.gameData = { level: 0, money: 0, cubes: [] }

    console.log(`Player ${socket.id} connected!`);
    socket.emit('setId', { id: socket.id });

    /**
     *  Handle player disconnects
     */
    socket.on('disconnect', () => {
        console.log(`Player ${socket.id} disconnected!`);
        clients = arrayRemove(clients, socket.id);
        socket.disconnect();
    });

    /**
     *  Receive position data & send to other player
     */
    socket.on('updatePos', (data) => {
        for (let i of clients) {
            socket.to(i).emit('userPos', data);
        }
    });

    /**
     *  Receive rotation data & send to other player
     */
    socket.on('rotationUpdate', (data) => {
        for (let i of clients) {
            socket.to(i).emit('userRotation', data);
        }
    });
});

/**
 *  Removes connection id from array of conections
 *  @param {arr} arr Array of connections.
 *  @param {id} id Connection id.
 *  @return {Array} Returns array without the given connection id.
 */
function arrayRemove(arr, id) {
    return arr.filter((ele) => {
        return ele != id;
    });
}

httpServer.listen(8000, () => {
    console.log("listening on http://localhost:8000");
});

