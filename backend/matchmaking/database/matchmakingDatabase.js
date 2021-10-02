require('dotenv').config()
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const db = process.env.MONGO_URI;
// Connect to MongoDB

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        console.log(err)
    });

const connection = mongoose.connection;
connection.once("open", (err) => {
    console.log("MongoDB database connection established successfully");
});

const Game = require("../models/game.js");

const DatabaseManager = {
    authTokenMW: (req, res, next) => {
		const aHeader = req.headers['authorization'];
		const aToken = aHeader && aHeader.split(' ')[1];
		if (aToken == null) {
			return res.status(401).send("Authentication token required");
		}
	
		jwt.verify(aToken, ACCESS_SECRET, (err, user) => {
			if (err) {
				return res.status(403).send("Access Denied: Token is no longer valid");
			}
			req.user = user;
			next();
		})
	},
    
}

module.exports = DatabaseManager;