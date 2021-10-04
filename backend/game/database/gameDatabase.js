require('dotenv').config()
const mongoose = require("mongoose");

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
    getAll: async (req, res) => {
        try {
            const users = await Game.find();
            res.json({
                message: "Success",
                data: users
            });
        } catch (err) {
            res.status(400).json({
                error: err.toString()
            });
        }
    },
    get: async (req, res) => {
        try {
            const game = await Game.findOne({ username: req.params.username });
            res.status(200).json({
                message: "Success",
                data: game
            });
        } catch (err) {
            res.status(400).json({
                error: err.toString()
            });
        }
    },
    insert: async (req, res) => {
        try {
            const data = req.body;
            const user = await Game.findOne({ username: data.username });
            if (user) throw "Sorry! User already exist.";
            // Update User's Game profile
            const newUser = new Game({
                username: data.username,
                proficiency: data.proficiency
                // Rating has a default value of 1000
            });
            const savedUser = await newUser.save();
            res.status(200).json({
                message: "Success",
                data: savedUser,
            });
        } catch (err) {
            res.status(400).json({
                error: err.toString()
            });
        }
    },
    update: async (req, res) => {
        try {
            const data = req.body;
            const user = await Game.findOne({ username: data.username });
            if (!user) throw "Sorry! User does not exist.";
            // Update User's Game profile
            const updateKeys = Object.keys(data);
            for (var i = 0; i < updateKeys.length; i++) {
                const key = updateKeys[i];
                user[key] = data[key]; // Update user with new values
            }
            const savedUser = await user.save();
            res.status(200).json({
                message: "Success",
                data: savedUser,
            });
        } catch (err) {
            res.status(400).json({
                error: err.toString()
            });
        }
    },
    delete: async (req, res) => {
        try {
            const user = await Game.deleteOne({username: req.params.username});
            res.status(200).json({
                message: "Success",
                data: user
            });
        } catch (err) {
            res.status(400).json({
                error: err.toString()
            });
        }
	},
}

module.exports = DatabaseManager;