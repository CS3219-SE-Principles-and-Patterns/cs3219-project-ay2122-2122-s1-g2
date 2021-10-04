const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const matchmakingRoutes = require("./routes/matchmakingRoutes.js");

app.use("/api/matchmaking", matchmakingRoutes);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log(`Server up and running on port ${port}!`);
});

const socket = require("socket.io");
// NOTE: For some reason socket.io only works if "node server.js" is used when running the app
// Starting a socket on the specified server
let io = socket(server);

io.on("connection", (socket) => {
    // In joining a room, you also create it
    socket.on("joinRoom", (joinData) => {
        socket.join(joinData.roomID);
        io.to(joinData.roomID).emit("joined", joinData);
    });

    // Need to emit with the roomID
    socket.on("new-message", (msg) => {
        io.to(msg.roomID).emit("new-message", msg.data);
    });
});
