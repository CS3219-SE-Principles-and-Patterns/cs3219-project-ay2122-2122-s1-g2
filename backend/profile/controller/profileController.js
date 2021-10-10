const jwt = require("jsonwebtoken");
require("dotenv").config();

const Profile = require("../models/profile");
const ACCESS_SECRET = process.env.ACCESS_SECRET;

const ProfileController = {
    authTokenMW: (req, res, next) => {
        const aHeader = req.headers["authorization"];
        const aToken = aHeader && aHeader.split(" ")[1];
        if (aToken == null) {
            return res.status(401).send("Authentication token required");
        }

        jwt.verify(aToken, ACCESS_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Access Denied: Token is no longer valid");
            }
            req.user = user;
            next();
        });
    },
    get: async (req, res) => {
        // the req will mention username and we will use that to find the profile
        try {
        const user = req.user;
        if (!user)
            return res
            .status(401)
            .json({ error: "Unable to get user details from middleware" });
        const profile = await Profile.findOne({ username: user.username });
        res.json({
            message: "Success",
            data: profile,
        });
        } catch (err) {
        res.status(400).json({
            error: err.toString(),
        });
        }
    },
    create: async (req, res) => {
        try {
            const username = req.user.username;
            const currProfile = await Profile.findOne({ username: username });
            const { languages, proficiencies } = req.body;
            if (languages.length != proficiencies.length)
                return res.status(400)
                .json({ error: "Languages and Proficiencies array should be of same size" });
            
            var savedProfile;
            if (!currProfile){
                const newProfile = Profile();
                newProfile.languages = languages;
                newProfile.proficiencies = proficiencies;
                savedProfile = await newProfile.save();
            } else {
                currProfile.languages = languages;
                currProfile.proficiencies = proficiencies;
                savedProfile = await currProfile.save();
            }
            res.json({
                message: "Success",
                data: savedProfile,
            });

        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "Unable to communicate with database",
                error: err.toString(),
            });
        }
    },
    update: async (req, res) => {
        try {
            const user = req.user;
            const currProfile = await Profile.findOne({ username: user.username });
            if (!currProfile)
                return res
                .status(401)
                .json({ error: "Unable to get user details from database" });

            const { languages, proficiencies } = req.body;
            currProfile.languages = languages;
            currProfile.proficiencies = proficiencies;
            if (languages.length != proficiencies.length)
                return res.status(401)
                .json({ error: "Languages and Proficiencies array should be of same size" });
            const savedProfile = await currProfile.save();
            res.json({
                message: "Success",
                data: savedProfile,
            });
        } catch (err) {
            res.status(400).json({
                error: err.toString(),
            });
        }
    },
}

module.exports = ProfileController;
