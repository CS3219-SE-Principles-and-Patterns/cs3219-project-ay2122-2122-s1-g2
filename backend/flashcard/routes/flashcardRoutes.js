const express = require("express");
const router = express.Router();

const flashcardController = require("../controller/flashcardController");
const DatabaseManager = require("../database/flashcardDatabase.js");

router
  .route("/")
  .post(flashcardController.authTokenMW, flashcardController.create)
  .get(flashcardController.authTokenMW, flashcardController.getAll)
  .put(flashcardController.authTokenMW, flashcardController.put);

module.exports = router;
