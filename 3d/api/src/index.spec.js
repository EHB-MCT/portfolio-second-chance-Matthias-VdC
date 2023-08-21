// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const Client = require("socket.io-client");

// describe("server room", () => {
//     let io, serverSocket, clientSocket;

//     // Set up test server & test connection
//     beforeAll((done) => {
//         const httpServer = createServer();
//         io = new Server(httpServer);
//         httpServer.listen(() => {
//             const port = httpServer.address().port;

//             clientSocket = new Client(`http://localhost:${port}`, { forceNew: true });

//             io.on("connection", (socket) => {
//                 serverSocket = socket;
//             });
//             clientSocket.on("connect", done);
//         });
//     });


//     afterAll(() => {
//         io.close();
//         clientSocket.close();
//     });
// });







const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("Game server", () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });

    test("Limit connections to 2 player", (done) => {
        /**
        *   Limit max number of connections to 2
        */
        if (io.engine.clientsCount < 3) {
            serverSocket.on("err", (arg) => {
                expect(arg.message).toBe("Max connections reached");
                done();
            });
            clientSocket.emit("err", { message: "Max connections reached" });
        }
    });

    test("Movement & rotation data load", (done) => {
        /**
         *  Testing performance hit on fast updates (like movement & rotation)
         */
        serverSocket.on('updatePos', (data) => {
            expect(data.x).toBeGreaterThanOrEqual(0);
            expect(data.x).toBeLessThanOrEqual(1000000);
        });

        let count = 0

        while(count < 10000){
            clientSocket.emit("updatePos", {
                id: clientSocket.id,
                x: (Math.random() * (100000000 - 0) + 0) / 100,
                y: (Math.random() * (100000000 - 0) + 0) / 100,
                z: (Math.random() * (100000000 - 0) + 0) / 100,
            });
            count++;
        }

        if(count >= 10000) {
            done();
        }
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });
});