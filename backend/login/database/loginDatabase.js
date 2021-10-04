require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const Profile = require("../models/profile.js");
const Token = require("../models/token.js");
const ACCESS_SECRET =
  "67150a61ce9088f7cdddda574ef237e32acc7086c7b89cc831f3c6192aa3703abad10a241908127322e311f3528e8bc5d961aae4f9f9a14fc63736b5ffc6499e";
const REFRESH_SECRET =
  "32c9438a16cfbdae22d57a79d6ad4d462c2399ebd186c1aa82b8fc504b96e4c0a440a0f230802143c6f8137d6f65640e861cb300add22f6b38789b725132ab54";

const getJwtAccessToken = (data) => {
  return jwt.sign(
    {
      username: data.username,
      password: data.password,
    },
    ACCESS_SECRET,
    {
      expiresIn: "1800s",
    }
  );
};

const getJwtRefreshToken = (data) => {
  return jwt.sign(
    {
      username: data.username,
      password: data.password,
    },
    REFRESH_SECRET
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
  getAccessToken: async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(401);
    // if token not in database, send unauthorized
    const token = await Token.findOne({ token: refreshToken });
    if (!token) {
      res.status(401);
    }

    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      const accessToken = getJwtAccessToken({
        username: user.username,
        password: user.password,
      });
      res.json({ accessToken: accessToken });
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
          username: profile.username,
          token: refreshToken,
        });
        await newTokenDB.save();
      } else {
        refreshToken = rToken.token;
      }
      //res.setHeader("Set-Cookie", [`refreshToken=${refreshToken}`]);
      res
        .cookie("refreshToken", JSON.stringify(refreshToken), {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .send({
          message: "Success",
          accessToken: getJwtAccessToken(profile),
          refreshToken: refreshToken,
        });
    } catch (err) {
      res.status(400).send({
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
          username: profile.username,
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
