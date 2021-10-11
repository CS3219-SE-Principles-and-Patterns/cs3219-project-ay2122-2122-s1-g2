const jwt = require("jsonwebtoken");
require("dotenv").config();

const Flashcard = require("../models/flashcard.js");
/*
Sample post request
{
    "flashcards": [
        {
            "body": "Hi",
            "title": "ML",
            "language": "tagalog",
            "altText": "yolo",
            "difficulty": 5 ,
            "notes": "this is for me to learn!!"
        }
    ]
}
*/
const ACCESS_SECRET = process.env.ACCESS_SECRET;

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
      const flashcard = await Flashcard.findOne({ username: user.username });
      res.json({
        message: "Success",
        data: flashcard.flashcards,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error in getting user credentials",
        error: err.toString(),
      });
    }
  },

  create: async (req, res) => {
    const user = req.user;
    const newFlashcard = req.body;
    if (!user)
      return res
        .status(401)
        .json({ error: "Unable to get user details from middleware" });
    var flashcard = Flashcard();
    flashcard.username = user.username;
    var oldUserCard;
    try {
      oldUserCard = await Flashcard.findOne({ username: user.username });
    } catch (err) {
      res.status(400).json({
        message: "Error in creating mongodb database",
        error: err.toString(),
      });
    }
    try {
      if (!oldUserCard) {
        // no such profile exists so we just put it in
        flashcard.flashcards = [newFlashcard];
        console.log("saving one new flashcard", flashcard);
        await flashcard.save();
        return res.status(200).json({
          message: "Success",
          data: flashcard,
        });
      }
      oldUserCard.flashcards.push(newFlashcard);
      console.log("saving updated flashcard", oldUserCard);
      await oldUserCard.save();
      return res.status(200).json({
        message: "Flashcards updated",
        data: oldUserCard,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error in saving new flashcard",
        error: err.toString(),
      });
    }
  },
  put: async (req, res) => {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ error: "Unable to get user details from middleware" });
    var flashCard = req.body.flashcard;

    try {
      const userCard = await Flashcard.findOne({ username: user.username });
      userCard.flashcards.push(flashCard);
      await userCard.save();
      return res.json({
        message: "Update successful",
        data: userCard,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error in putting new flashcard in",
        error: err.toString(),
      });
    }
  },
};
module.exports = FlashcardController;
