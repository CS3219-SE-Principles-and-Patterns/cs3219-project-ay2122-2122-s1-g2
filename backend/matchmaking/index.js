const express = require("express");
const app = express();
const http = require('http').createServer(app);
const cors = require("cors");
const DatabaseManager = require("./database/matchmakingDatabase")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const io = require("socket.io")(http, {
	cors: {
	  origin: "*"
	}
});

const matchmakingRoutes = require("./routes/matchmakingRoutes.js");
const {playerMatcher, deletePlayer, delay} = require("./playerMatchingUtils/utils");

app.use("/api/matchmaking", matchmakingRoutes);

const port = process.env.PORT || 4000;
const server = http.listen(port, () => {
	console.log(`Server up and running on port ${port}!`);
});

const startGame = async (player, socket, rounds, result) => {
	if (rounds == 0) {
		let score = player.score
		let actualRes = result >= 3
		return {score, actualRes};
	}
	console.log(socket.rooms)
	io.to(socket.rooms[1]).emit("flashcard", {question: "Select the correct answer", correctAnswer: 1, answers: ["Hi", "No", "Eat", "Sh"]});
	socket.on(socket.rooms[1], (gameRes, timing) => { // need to use this hack method to make sure we only listen to events pertaining to this room - not sure if it will work
		player.score += gameRes * (1000 - timing); // result will be 1 for victory 0 for loss
		result += gameRes 
	})  // unsure how to get win or loss tbh need help there (probably frontend broadcast winner into the room)
	await delay()
	return startGame(player, socket, rounds - 1, result);
}

io.on('connection', (socket) => {
	console.log("In backend")
	socket.on('Match Player', async (player) => {
        /* player from frontend will look like 
        {
            username: "Ambrose",
            language: "Korean"
        }
        */
	    player.rating = await DatabaseManager.getRating(player);
		var isMatched = await playerMatcher(socket, player, 10)
		if (isMatched) {
			socket.emit("match found");
			player.score = 0;
			let {score, result} = await startGame(player, socket, 5, 0); // this is the actual game 
			player.rating += score;	
			player.result = result;
			await DatabaseManager.put(player);
		} else {
			socket.emit("no match found");
			deletePlayer(player.username);
		}
	})

	socket.on("disconnect", () => {
		console.log("Some player disconnected");
	})
})


module.exports = server;
// const socket = require("socket.io");
// // NOTE: For some reason socket.io only works if "node server.js" is used when running the app
// // Starting a socket on the specified server
// let io = socket(server);

// io.on("connection", (socket) => {
//     // In joining a room, you also create it
//     socket.on("joinRoom", (joinData) => {
//         socket.join(joinData.roomID);
//         io.to(joinData.roomID).emit("joined", joinData);
//     });

//     // Need to emit with the roomID
//     socket.on("new-message", (msg) => {
//         io.to(msg.roomID).emit("new-message", msg.data);
//     });
// });
