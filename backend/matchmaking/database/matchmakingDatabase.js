require('dotenv').config()
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Game = require('../models/game');

// const db = process.env.MONGO_URI;
const db = "mongodb://127.0.0.1:27017" 
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
		var user = new Game({username:req.params.username, 
			ratings:[{language: "Korean", rating: 1000}, {language: "Japanese", rating: 1000}, {language: "Chinese", rating: 1000}], 
			history:[]});
		try {
			const oldUser = await Game.findOne({ username: req.params.username })
			if (!oldUser || oldUser.ratings.length == 0) {
				user.save((err) => {
					if (err) {
						res.status(400).json({
							message: "Error",
							error: err.toString()
						})
					} else {
						res.status(200).json({
							data: user
						})
					}
				})
			} else {
				res.status(200).json({
					message: "Success",
					data: oldUser
				})
			}
			
		} catch(err) {
			res.status(400).json({
				message: "No games played yet",
				error: err.toString()
			})
		}
	},
	getRating: async (player) => {
		try {
			const user = await Game.findOne({ username: player.username })
			if (!user) return 1000;
			for (let i = 0; i < user[ratings].length; i++){
				if (user[ratings][i]['language'] == player.language) {
					return user[ratings][i][rating];
				}
			}
			// just return default rating if can't find a specified language rating for user
			return 1000;
		} catch(err) {
			// if can't even find user also return default rating
			return 1000;
		}
	}, 
	put: async (player) => {
		// frontend cannot update the game database only get from it
		var user = new Game({username:player.username, 
			ratings:[{language: "Korean", rating: 1000}, {language: "Japanese", rating: 1000}, {language: "Chinese", rating: 1000}], 
			history:[]});
		for (let i = 0; i < user[ratings].length; i++){
			user[ratings][i][rating] = user[ratings][i][language] == player.language ? player.rating : 1000  
		}
		try {
			const oldUser = await Game.findOne({ username: player.username });
			if (!oldUser || oldUser.ratings.length == 0) {
				user.save((err) => {
					if (err) {
						res.status(400).json({
							message: "Error",
							error: err.toString()
						})
					} else {
						res.status(200).json({
							data: user
						})
					}
				})
			} else {
				oldUser[history].push({language: player.language, result: player.result});
				for (let i = 0; i < oldUser[ratings].length; i++){
					oldUser[ratings][i][rating] = oldUser[ratings][i][language] == player.language ? player.rating : oldUser[ratings][i][rating];  
				}
				oldUser.save((err) => {
					if (err) {
						res.status(400).json({
							message: "Error",
							error: err.toString()
						})
					} else {
						res.status(200).json({
							data: oldUser
						})
					}
				})
			}
		} catch(err) {
			res.status(400).json({
				message: "Error",
				error: err.toString()
			})
		}
	}
}

module.exports = DatabaseManager;
