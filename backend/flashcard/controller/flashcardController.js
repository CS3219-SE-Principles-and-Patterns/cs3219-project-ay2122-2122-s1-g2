require("dotenv").config();
const jwt = require("jsonwebtoken");
var ObjectId = require('mongoose').Types.ObjectId; 

const Flashcard = require("../models/flashcard.js");
const ACCESS_SECRET = process.env.ACCESS_SECRET;

const optionalChange = (value, curr) => {
  return value ? value : curr;
}

const FlashcardController = {
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
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ error: "Unable to get user details from middleware" });

    try {
      const userCard = await Flashcard.findOne({ _id: new ObjectId(req.params.id) });
      return res.status(200).json({
        message: "Success",
        data: userCard,
      });
    } catch (err) {
      res.status(400).json({
        error: err.toString(),
      });
    }
  },
  getAll: async (req, res) => {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ error: "Unable to get user details from middleware" });
    try {
      const userSets = await Flashcard.find({ username: user.username });
      // Get all sets by the user
      res.json({
        message: "Success",
        data: userSets,
      });
    } catch (err) {
      res.status(400).json({
        error: err.toString(),
      });
    }
  },
  delete: async (req, res) => {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ error: "Unable to get user details from middleware" });

    try {
      await Flashcard.deleteOne({ _id: new ObjectId(req.params.id) });

      return res.json({
        message: "Delete successful",
      });
    } catch (err) {
      res.status(400).json({
        message: "Error in deleting flashcard",
        error: err.toString(),
      });
    }
  },
  create: async (req, res) => {
    const user = req.user;
    if (!user)
        return res
          .status(401)
          .json({ error: "Unable to get user details from middleware" });
    try {
      const data = req.body;
      const userCard = await Flashcard.findOne({ username: user.username, title: data.title });
      if (userCard) throw "Sorry! Similar card already exists";
      const flashcard = Flashcard({
        username: user.username, // Maybe change this to use data username instead?
        title: data.title,
        language: data.language,
        difficulty: data.difficulty,
        description: data.description,
        flashcards: data.flashcards
      });
      const savedFlashcard = await flashcard.save();
      return res.status(200).json({
        message: "Success",
        data: savedFlashcard,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error in saving new flashcard",
        error: err.toString(),
      });
    }
  },
  updateDetails: async (req, res) => {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ error: "Unable to get user details from middleware" });

    try {
      const data = req.body;
      const userCard = await Flashcard.findOne({ _id: new ObjectId(data._id) });
      if (!userCard) throw "Sorry! Such a card does not exist";

      userCard.title = optionalChange(data.title, userCard.title);
      userCard.difficulty = optionalChange(data.difficulty, userCard.difficulty);
      userCard.language = optionalChange(data.language, userCard.language);
      userCard.description = optionalChange(data.description, userCard.description);
      userCard.flashcards = optionalChange(data.flashcards, userCard.flashcards);
      const savedCard = await userCard.save();
      // console.log(savedCard);
      return res.json({
        message: "Update successful",
        data: savedCard,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error in putting new flashcard in",
        error: err.toString(),
      });
    }
  }
};
module.exports = FlashcardController;
