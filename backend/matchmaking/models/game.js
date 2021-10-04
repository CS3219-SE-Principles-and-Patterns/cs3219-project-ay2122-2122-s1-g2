const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blueprint of what an item would look like in our DB.
const GameSchema = new Schema({
    username: {
        type: String,
		required: true
    },
	proficiency: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		default: 1000 
	}
});

// Makes a model of the above schema.
const Game = mongoose.model("Game", GameSchema);

// Exporting the model so that it can be used in server.js and/or other files.
module.exports = Game;