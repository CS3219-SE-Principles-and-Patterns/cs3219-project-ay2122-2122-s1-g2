let players = [];

const delay = (ms) => new Promise(res => setTimeout(res, ms * 1000)); // 100 ms timeout?
	
const playerMatcher = async (socket, player, time) => {
    if (player.matchFound) {
        console.log(player.room)
        socket.join(player.room)
        deletePlayer(player.username)
        return true
    }
    if (time == 0) {
        return false;
    }
    if (!players.includes(player)){
        players.push(player)
    }
    player.matchFound = false;
    for (let i = 0; i < players.length; i++) {
        var matchPlayer = players[i]
		if (matchPlayer.username != player.username 
            && matchPlayer.language == player.language 
            && Math.abs(matchPlayer.rating - player.rating) <= 200) {
            player.room = matchPlayer.username; // make them both have the same room
            player.matchFound = true;
			matchPlayer.matchFound = true;
            var otherPlayerName = matchPlayer.username
            socket.join(player.room) 
            // remove both players from the array of players in the waiting queue
            deletePlayer(player.username);
			//deletePlayer(otherPlayerName);
            return true;
		}
	}
	player.room = player.username;
    await delay(5);
    return playerMatcher(socket, player, time - 1);
}

const deletePlayer = (username) => {
	const index = players.findIndex((p_user) => p_user.username === username);  
	if (index !== -1) {
	  return players.splice(index, 1)[0];
	}
}

exports.delay = delay;
exports.playerMatcher = playerMatcher;
exports.deletePlayer = deletePlayer;
