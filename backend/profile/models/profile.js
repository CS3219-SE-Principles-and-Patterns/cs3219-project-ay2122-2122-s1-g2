const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blueprint of what an item would look like in our DB.
const ProfileSchema = new Schema({
    username: {
		type: String,
		required: true,
	},
	languages: {
		type: Array,
		required: true
	},
	proficiencies: {
		type: Array,
		required: true
	}
});

// Makes a model of the above schema.
const Profile = mongoose.model("User", ProfileSchema);

// Exporting the model so that it can be used in server.js and/or other files.
module.exports = Profile;