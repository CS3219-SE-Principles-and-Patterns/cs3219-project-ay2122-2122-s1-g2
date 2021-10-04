const express = require("express");
const router = express.Router();

const { Server } = require("socket.io");
const io = new Server(server);
const socket = io();
// const DatabaseManager = require("../database/matchmakingDatabase.js");

router.get("/", (req, res) => {
	res.json("Matchmaking Microservice");
})

let players = [];

let onlinePlayers = set();

const playerMatcher = (player) => {
	player.matchFound = false;
	for (let i = 0; i < players.length; i++) {
		if (players[i].language == player.language && Math.abs(players[i].level - player.level) <= 2) {
			player.room = players[i].room; // make them both have the same room
			player.matchFound = true;
			players[i].matchFound = true;
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
			setTimeout(resolve, 10000); // 10 1 minute timeouts so that can check if the player ever gets a match
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

io.on('connection', (socket) => {
	onlinePlayers.add(socket.id);
	socket.on('Match Player', (player) => {
		players.push(player);
		if (playerMatcher(player)) {
			// match exists
			socket.emit("match found");
			socket.join(player.room);
		} else {
			socket.emit("no match found");
		}
		deletePlayer(player.username);
	})

	socket.on("disconnect", () => {
		onlinePlayers.delete(socket.id);
	})
})

module.exports = router;