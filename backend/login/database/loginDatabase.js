require('dotenv').config()
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

const Profile = require("../models/profile.js");
const ACCESS_SECRET = "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e";

const getJwtToken = (data) => {
	return jwt.sign({
		username: data.username,
		password: data.password
	}, ACCESS_SECRET);
}

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
            const profiles = await Profile.find();
            res.json({
                message: "Success",
                data: profiles
            });
        } catch (err) {
            res.json({
                message: "Error",
                error: err
            });
        }
    },
    get: async (req, res) => {
        try {
            const profile = await Profile.findOne({ username: req.params.username });
            res.json({
                message: "Success",
                data: profile
            });
        } catch (err) {
            res.json({
                message: "Error",
                error: err
            });
        }
    },
    update: async (req, res) => {
        try {
            const data = req.body;
            const profile = await Profile.findOne({ username: data.username });
            if (!profile) throw "Sorry! User does not exist.";
            // Update profile
            const updateKeys = Object.keys(data);
            for (var i = 0; i < updateKeys.length; i++) {
                const key = updateKeys[i];
                if (key == "password") throw "Password cannot be updated.";
                profile[key] = data[key]; // Update profile with new value
            }
            const savedProfile = await profile.save();
            res.json({
                message: "Success",
                data: savedProfile,
            })
        } catch (err) {
            res.json({
                message: "Error",
                error: err
            });
        }
    },
    login: async (req, res) => {
		try {
            const profile = await Profile.findOne({ username: req.body.username });
			const pwIsCorrect = await bcrypt.compare(req.body.password, profile.password);
			if (!pwIsCorrect) throw "Incorrect password";
            res.json({
                message: "Success",
                accessToken: getJwtToken(profile)
            });
        } catch (err) {
			res.json({
                message: "Error",
                error: err
            });
        }
	},
    insert: async (req, res) => {
        try {
            const data = req.body;
            const profile = await Profile.findOne({ username: data.username });
            if (profile) throw "Sorry! User already exists.";
            // Create profile
            const hashedPw = await bcrypt.hash(data.password, 10);
            const newProfile = new Profile({
                username: data.username,
                password: hashedPw
            });
            const savedProfile = await newProfile.save();
            res.json({
                message: "Success",
                data: savedProfile,
            })
        } catch (err) {
            res.json({
                message: "Error",
                error: err
            });
        }
    },
    delete: async (req, res) => {
        try {
            const profile = await Profile.deleteOne({username: req.params.username});
            res.json({
                message: "Success",
                data: profile
            });
        } catch (err) {
            res.json({
                message: "Error",
                error: err
            });
        }
	},
}

module.exports = DatabaseManager;