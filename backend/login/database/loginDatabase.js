require('dotenv').config()
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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

const DatabaseManager = {
    getAll: (callback) => {
        Profile.find()
            .then((profiles) => callback(profiles, null))
            .catch(err => callback(null, err));
    },
    get: (data, callback) => {
        Profile.findOne({ username: data.username })
            .then((res) => {
                console.log(res);
                if (!res) throw "User does not exist";
                callback(res, null);
            })
            .catch((err) => callback(null, err));
    },
    update: (data, callback) => {
        Profile.findOne({username: data.username})
            .then(profile => {
                if (profile) {
                    // Update profile
                    profile.username = data.username;
                    // Use default salt of 10
                    bcrypt.hash(data.password, 10, function(err, hashedPw) {
                        profile.password = hashedPw;
                        profile.save()
                            .then((res) => callback(res, null))
                            .catch((err) => callback(null, err));
                    });
                } else {
                    throw "Sorry! User does not exist.";
                }
            })
            .catch(err => callback(null, err));
    },
    insert: (data, callback) => {
        Profile.findOne({username: data.username})
            .then(profile => {
                if (profile) {
                    throw "Sorry! User already exists.";
                } else {
                    // Create new profile
                    bcrypt.hash(data.password, 10, function(err, hashedPw) {
                        const newProfile = new Profile({
                            username: data.username,
                            password: hashedPw
                        });
                        newProfile.save()
                            .then((res) => callback(res, null))
                            .catch((err) => callback(null, err));
                    });
                }
            })
            .catch(err => callback(null, err));
    },
    delete: (data, callback) => {
        Profile.deleteOne({username: data.username})
            .then((res) => {
                callback(res, null);
            })
            .catch((err) => callback(null, err));
	},
}

module.exports = DatabaseManager;