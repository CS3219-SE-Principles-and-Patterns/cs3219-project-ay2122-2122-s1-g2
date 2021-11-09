let players = [];

const delay = (ms) => new Promise(res => {
    setTimeout(res, ms * 1000)
}); 

const gameDelay = async (socket, time) => {
    await delay(25); // choose a timeout of 60 means must choose diff of like 59000
    if (new Date() - time > 20000) {
        rounds++;
        if (rounds != 5) {
            socket.emit("flashcard", questions[rounds]);
            gameDelay();
        } else {
            socket.emit("End game", {result: result, score: score});
            DatabaseManager.put(Player);
        }
    }
};
	
const playerMatcher = async (socket, player, time) => {
    if (player.matchFound) {
        socket.join(player.room)
        let room = player.room
        deletePlayer(player.username)
        return {matched: true, room: room}
    }
    if (time == 0) {
        return {matched: false, room: ""};
    }
    if (!players.includes(player)){
        players.push(player)
    }
    player.matchFound = false;
    for (let i = 0; i < players.length; i++) {
        var matchPlayer = players[i]
		if (matchPlayer.username != player.username 
            && matchPlayer.language == player.language 
            && Math.abs(matchPlayer.rating - player.rating) <= 500) {
            player.room = matchPlayer.username; // make them both have the same room
            player.matchFound = true;
			matchPlayer.matchFound = true;
            var otherPlayerName = matchPlayer.username
            socket.join(player.room) 
            // remove both players from the array of players in the waiting queue
            deletePlayer(player.username);
            await delay(5);
			deletePlayer(otherPlayerName);
            return {matched: true, room: otherPlayerName};
		}
	}
	player.room = player.username;
    await delay(5);
    return playerMatcher(socket, player, time - 1);
}

const deletePlayer = (username) => {
	const index = players.findIndex((p_user) => p_user.username === username);  
    if (index !== -1) {
      players.splice(index, 1)[0];
	}
}

exports.delay = delay;
exports.playerMatcher = playerMatcher;
exports.deletePlayer = deletePlayer;
