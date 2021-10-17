require('dotenv').config()
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Game = require('../models/game');

//const db = process.env.MONGO_URI;
const db = "mongodb://127.0.0.1:27017" 
// Connect to MongoDB
const ACCESS_SECRET = process.env.ACCESS_SECRET;

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
    getUserRecord: async (req, res) => {
		try {
			// req.user obtained from authTokenMW
			const currUser = await Game.findOne({ username: req.user.username })
			var newUser = new Game({
				username: req.params.username, 
				ratings:[{language: "Korean", rating: 1000}, {language: "Japanese", rating: 1000}, {language: "Chinese", rating: 1000}], 
				history:[]
			});
			if (!currUser || currUser.ratings.length == 0) {
				currUser = await newUser.save();
			}

			res.status(200).json({
				message: "Success",
				data: currUser
			})
		} catch(err) {
			res.status(400).json({
				message: "No games played yet",
				error: err.toString()
			})
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
                ratings: data.ratings,
				history: data.history
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
	getRating: async (player) => {
		try {
			const user = await Game.findOne({ username: player.username })
			if (!user) return 1000;
			for (let i = 0; i < user[ratings].length; i++){
				if (user.ratings[i].language == player.language) {
					return user.ratings[i].rating;
				}
			}
			// just return default rating if can't find a specified language rating for user
			return 1000;
		} catch (err) {
			// if can't even find user also return default rating
			return 1000;
		}
	}, 
	put: async (player) => {
		// frontend cannot update the game database only get from it
		try {
			const currUser = await Game.findOne({ username: player.username });
			if (!currUser) throw "Sorry! User does not exist.";
			if (currUser.ratings.length == 0) throw "Sorry! User does not have any languages assigned.";
			const userRatings = currUser.ratings;
			for (let i = 0; i < userRatings.length; i++) {
				if (player.language == userRatings[i].language) 
					currUser.ratings[i].rating = player.rating;
			}
			const savedUser = await currUser.save();
			return savedUser;
		} catch(err) {
			return err;
		}
	},
}

module.exports = DatabaseManager;
