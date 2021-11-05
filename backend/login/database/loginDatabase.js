require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/profile.js");
const Token = require("../models/token.js");

const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;
connection.once("open", (err) => {
  console.log("MongoDB database connection established successfully");
});

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY = 3600;
const REFRESH_TOKEN_EXPIRY = 86400;

const getJwtAccessToken = (data) => {
  return jwt.sign(
    {
      username: data.username,
      password: data.password,
    },
    ACCESS_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

const getJwtRefreshToken = (data) => {
  return jwt.sign(
    {
      username: data.username,
      password: data.password,
    },
    REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

const DatabaseManager = {
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
  verify: async (req, res) => {
    res.status(200).send("Valid access token!");
  },

  getAccessToken: async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ error: "Could not find refreshToken" });
    const token = await Token.findOne({ token: refreshToken });
    if (!token) return res.status(403).json({ error: "Invalid refreshToken" });

    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({
          error: err.toString(),
        });
      const newAccessToken = getJwtAccessToken({
        username: user.username,
        password: user.password,
      });
      const newRefreshToken = getJwtRefreshToken({
        username: user.username,
        password: user.password,
      });
      const newTokenDB = new Token({
        token: newRefreshToken,
      });
      newTokenDB.save();
      Token.deleteOne({ token: refreshToken });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRY * 1000,
      });
    });
  },
  getAll: async (req, res) => {
    try {
      const profiles = await Profile.find();
      res.json({
        message: "Success",
        data: profiles,
      });
    } catch (err) {
      res.status(400).json({
        error: err.toString(),
      });
    }
  },
  get: async (req, res) => {
    try {
      const profile = await Profile.findOne({ username: req.params.username });
      res.status(200).json({
        message: "Success",
        data: profile,
      });
    } catch (err) {
      res.status(400).json({
        error: err.toString(),
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
        if (key == "password") {
          // Need hash password
          const hashedPw = await bcrypt.hash(data[key], 10);
          profile[key] = hashedPw;
        } else {
          profile[key] = data[key]; // Update profile with new value
        }
      }
      const savedProfile = await profile.save();
      res.status(200).json({
        message: "Success",
        data: savedProfile,
      });
    } catch (err) {
      res.status(400).json({
        error: err.toString(),
      });
    }
  },
  login: async (req, res) => {
    try {
      const profile = await Profile.findOne({ username: req.body.username });
      if (!profile) throw "Access denied. Incorrect user details";
      const pwIsCorrect = await bcrypt.compare(
        req.body.password,
        profile.password
      );
      if (!pwIsCorrect) throw "Access denied. Incorrect user details";

      var refreshToken;
      const rToken = await Token.findOne({ username: profile.username });
      if (!rToken) {
        refreshToken = getJwtRefreshToken(profile);
        const newTokenDB = new Token({
          token: refreshToken,
        });
        await newTokenDB.save();
      } else {
        refreshToken = rToken.token;
      }

      res.status(200).json({
        message: "Success",
        accessToken: getJwtAccessToken(profile),
        refreshToken: refreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRY * 1000,
      });
    } catch (err) {
      res.status(401).json({
        error: err.toString(),
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
        password: hashedPw,
      });
      const savedProfile = await newProfile.save();
      var refreshToken;
      const rToken = await Token.findOne({ username: savedProfile.username });
      if (!rToken) {
        refreshToken = getJwtRefreshToken(savedProfile);
        const newTokenDB = new Token({
          username: savedProfile.username,
          token: refreshToken,
        });
        await newTokenDB.save();
      } else {
        refreshToken = rToken.token;
      }

      res.status(200).json({
        message: "Success",
        accessToken: getJwtAccessToken(savedProfile),
        refreshToken: refreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRY * 1000,
      });
    } catch (err) {
      res.status(400).json({
        error: err.toString(),
      });
    }
  },
  delete: async (req, res) => {
    try {
      const profile = await Profile.deleteOne({
        username: req.params.username,
      });
      const refresh_token = await Token.deleteOne({
        username: req.params.username,
      });
      if (!profile || profile.deletedCount === 0) throw "Profile not found";
      if (!refresh_token || refresh_token.deletedCount === 0)
        throw "Refresh token not found when deleting";
      res.status(200).json({
        message: "Success",
        data: profile,
      });
    } catch (err) {
      res.status(400).json({
        error: err.toString(),
      });
    }
  },
};

module.exports = DatabaseManager;
