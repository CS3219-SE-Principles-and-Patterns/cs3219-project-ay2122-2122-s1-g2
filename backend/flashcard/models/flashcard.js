const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blueprint of what an item would look like in our DB.
const FlashcardSchema = new Schema({
    id: {
        type: String,
		required: true
    },
	password: {
		type: String,
		required: true
	},
});

// Makes a model of the above schema.
const Flashcard = mongoose.model("Flashcard", FlashcardSchema);

// Exporting the model so that it can be used in server.js and/or other files.
module.exports = Flashcard;