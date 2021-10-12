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

DatabaseManager.put({
	username: "passwordis123", 
	language: "Korean",
	rating: 1069,
});

const startGame = async (player, socket, rounds, result, questions) => {
	if (rounds == 0) {
		let score = player.score
		let actualRes = result >= 3
		return {score, actualRes};
	}
	socket.emit("flashcard", questions[5-rounds])
	socket.on("answer", (data) => { // need to use this hack method to make sure we only listen to events pertaining to this room - not sure if it will work
		var increment = 0
		if (data.gameRes) increment = 1
		player.score += (increment / 1200) * (60000 - data.timing); // the max a player can increase in a game is 50 in 1 round
		result += increment
	})
	socket.on("disconnect", () => {
		// if they disconnect during game instant loss
		let finalScore = -100; // penalty
		let finalResult = false;
		// need to commuincate this with the other guy somehow => ping socket room
		return {finalScore, finalResult};
	})
	await delay(60) // 1 minute rounds
	return startGame(player, socket, rounds - 1, result, questions);
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
			// here we get the database in so we find like 5 random mcqs and send them in
			var questions = [{question: "Select the correct answer", correctAnswer: "No", answers: ["Hi", "No", "Eat", "Sh"]},
			{question: "Select what your heart chooses", correctAnswer: "Noooo", answers: ["Hiiii", "Noooo", "Eatttt", "Shhhh"]},
			{question: "Select my answer", correctAnswer: "No", answers: ["Hi", "No", "Eat", "Sh"]},
			{question: "Select the wrong answer", correctAnswer: "No", answers: ["Hi", "No", "Eat", "Sh"]}, 
			{question: "correct answer", correctAnswer: "No", answers: ["Hi", "No", "Eat", "Sh"]}]
			socket.emit("match found");
			player.score = 0;
			let {score, result} = await startGame(player, socket, 5, 0, questions); // this is the actual game 
			player.rating += score;	
			player.result = result;
			//await DatabaseManager.put(player);
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
