const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blueprint of what an item would look like in our DB.

const FlashcardSchema = new Schema({
	username: { type: String, required: true },
	title: {type: String, default: ""},
	difficulty: {type: Number, default: 1},
	language: String,
	description: {type: String, default: ""},
	flashcards: [
		{
			body: {type: String, default: ""},
			altText: {type: String, default: ""},
			notes: {type: String, default: ""},
		} 
	]
})

// Makes a model of the above schema.
const Flashcard = mongoose.model("Flashcard", FlashcardSchema);

// Exporting the model so that it can be used in server.js and/or other files.
module.exports = Flashcard;
