const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blueprint of what an item would look like in our DB.
const TokenSchema = new Schema({
    token: {
        type: String,
		required: true
    },
});

// Makes a model of the above schema.
const Token = mongoose.model("Token", TokenSchema);

// Exporting the model so that it can be used in server.js and/or other files.
module.exports = Token;