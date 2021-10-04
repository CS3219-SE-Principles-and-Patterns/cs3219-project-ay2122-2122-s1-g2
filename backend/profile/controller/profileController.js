const jwt = require('jsonwebtoken');
require('dotenv').config()

const Profile = require("../models/profile");

const authTokenMW = (req, res) => {
    const ACCESS_SECRET = process.env.ACCESS_SECRET;
    //const ACCESS_SECRET = "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e";
	const aHeader = req.headers['authorization'];
	const aToken = aHeader && aHeader.split(' ')[1];
    if (aToken == null) {
		return res.status(401).send("Invalid Token");
	}
    userCred = {}
	jwt.verify(aToken, ACCESS_SECRET, (err, user) => {
		if (err) {
			return res.status(403).send("Access Denied: Token is no longer valid");
		}
        userCred = user;
	})
    return userCred;
}

exports.get = (req, res) => {
    // the req will mention username and we will use that to find the profile
    const user = authTokenMW(req, res);
    if (!user) return;
    Profile.findOne({username: user.username}, (err, profile) => {
        if (err) {
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Success",
                data: profile
            })
        }
    })
}

exports.create = (req, res) => {
    var profile = Profile();
    const user = authTokenMW(req, res);
    if (!user) return;
    profile.username = user.username;
    profile.languages = req.body.languages ? req.body.languages : [];
    Profile.findOne({username: profile.username}, (err, oldProfile) => {
        if (err) {
            res.status(400).json({
                error: err.toString()
            })
        } else if (!oldProfile) {
            // no such profile exists so we just put it in
            profile.save((err) => {
                if (err) {
                    res.status(400).json({
                        error: err.toString()
                    })
                } else {
                    res.json({
                        message: "Success",
                        data: profile
                    })
                }
            })
        } else {
            oldProfile.languages = req.body.languages ? req.body.languages: oldProfile.languages;
            oldProfile.save((err) => {
                if (err) {
                    res.status(400).json({
                        error: err.toString()
                    })
                } else {
                    res.json({
                        message: "Profile updated",
                        data: oldProfile
                    })
                }
            })
        }
    })   
}

exports.put = (req, res) => {
    const user = authTokenMW(req, res);
    if (!user) return;
    Profile.findOne({username: user.username}, (err, oldProfile) => {
        if (err || ! oldProfile) {
            res.status(400).json({
                error: err.toString()
            })
        } else {
            var languages = oldProfile.languages;
            languages.push(req.body.language);
            oldProfile.languages = languages;
            oldProfile.save((err) => {
                if (err) {
                    res.status(400).json({
                        error: err
                    })
                } else {
                    res.json({
                        message: "Success",
                        data: oldProfile
                    })
                }
            })           
        }
    })
}
