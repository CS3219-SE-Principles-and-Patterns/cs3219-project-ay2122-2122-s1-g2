const express = require("express");
const router = express.Router();

const { Server } = require("socket.io");
const server = require("../index")
const io = new Server(server);

const DatabaseManager = require("../database/matchmakingDatabase.js"); 

router.get("/:username", DatabaseManager.getUserRecord); // should have authentication but currently i never add the authTokenMW thingy
router.get("/", DatabaseManager.getAll);

let players = [];

const playerMatcher = (player) => {
	player.matchFound = false;
	for (let i = 0; i < players.length; i++) {
		if (players[i].language == player.language && Math.abs(players[i].level - player.level) <= 2) {
			player.room = players[i].room; // make them both have the same room
			player.matchFound = true;
			players[i].matchFound = true;
			// remove both players from the array of players in the waiting queue
			deletePlayer(player.username);
			deletePlayer(players[i].username);
			return true;
		}
	}
	player.room = player.username;
	new Promise((resolve) => {
		let i = 10;
		while (i != 0) {
			i--;
			if (player.matchFound) {
				return true;
			}
			setTimeout(resolve, 100); // 10 100ms timeouts so that can check if the player ever gets a match
		}
	})
	return player.matchFound;
}

const deletePlayer = (id) => {
	const index = players.findIndex((p_user) => p_user.id === id);  
	if (index !== -1) {
	  return players.splice(index, 1)[0];
	}
}

const startGame = (roomId, socket) => {
	let score = 0;
	let result = true;
	new Promise(resolve => {
		let numberOfRounds = 5; // arbitrary for now
		while (numberOfRounds != 0) {
			numberOfRounds--;
			// need to link to flashcard db or maybe even have a quiz db which we prepopulate?
			io.to(roomId).emit("flashcard", {question: "Select the correct answer", correctAnswer: 1, answers: ["Hi", "No", "Eat", "Sh"]});
			socket.on(roomId, (result, timing) => { // need to use this hack method to make sure we only listen to events pertaining to this room - not sure if it will work
				score += result * (1000 - timing); // result will be 1 for victory 0 for loss
			})  // unsure how to get win or loss tbh need help there (probably frontend broadcast winner into the room)
			// 1 minute max timing
			setTimeout(resolve, 1000);
		}
	});
	return {score, result};
}

io.on('connection', (socket) => {
	socket.on('Match Player', async (player) => {
        /* player from frontend will look like 
        {
            username: "Ambrose",
            language: "Korean"
        }
        */
	    player.rating = DatabaseManager.getRating(player);
		players.push(player);
		if (playerMatcher(player.username)) {
			socket.emit("match found");
			socket.join(player.room); // we set this in the playerMatcher function
			let {score, result} = await startGame(player.room, socket); // this is the actual game 
			player[rating] += score;	
			player.result = result;
			await DatabaseManager.put(player);
		} else {
			socket.emit("no match found");
		}
		deletePlayer(player.username);
	})

	socket.on("disconnect", () => {
		console.log("Some player disconnected");
	})
})

module.exports = router;
