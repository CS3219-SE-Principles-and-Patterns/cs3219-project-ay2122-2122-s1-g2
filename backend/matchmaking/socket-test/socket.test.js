const io = require("socket.io-client")
const http = require("http")
const ioBack = require("socket.io");
const { expect } = require("chai");

const DatabaseManager = require("../database/matchmakingDatabase");

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

beforeAll((done) => {
    httpServer = http.createServer().listen();
    httpServerAddr = httpServer.address();
    ioServer = ioBack(httpServer);
    done();
})

afterAll((done) => {
    // ioServer.close();
    httpServer.close();
    done();
})

beforeEach((done) => {
    socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      done();
    });
});

afterEach((done) => {
    // Cleanup
    // socket.disconnect();
    done();
});

describe('basic socket.io example', () => {
    test('should communicate with waiting for socket.io handshakes', (done) => {
      socket.emit('answer', {gameRes: true, timing: 48000});
      socket.emit('Match Player', {username: "player", language: "Korean"})
      
      setTimeout(() => {
        ioServer.on("connection", (mySocket) => {
          mySocket.on("answer", (data) => {
            expect(data.gameRes).toBe(true)
            expect(data.timing).toBe(48000);
            var increment = gameRes ? 1 : 0;
            var score = increment * (60000 - data.timing) / 1200
            expect(increment).toBe(1)
            expect(score).toBe(true);
            done();
          })


          mySocket.on("Match Player", async (player) => {
            expect(player.username).toBe("player");
            expect(player.language).toBe("Korean");
            mySocket.emit("flashcard", {question: "how are you", answer: "great"})
          })
        })

        socket.on("flashcard", (data) => {
          expect(data.question).toBe("how are you");
          expect(data.answer).toBe("great")
        })
      
        done();
      }, 5);
    });
});

