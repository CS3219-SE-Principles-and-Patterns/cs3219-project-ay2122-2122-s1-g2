const express = require("express");
const router = express.Router();

const flashcardController = require("../controller/flashcardController");
const DatabaseManager = require("../database/flashcardDatabase.js");

router
  .route("/")
  .post(flashcardController.authTokenMW, flashcardController.create)
  .get(flashcardController.authTokenMW, flashcardController.getAll)
  .put(flashcardController.authTokenMW, flashcardController.updateDetails);

router
  .route("/:id")
  .get(flashcardController.authTokenMW, flashcardController.get)
  .delete(flashcardController.authTokenMW, flashcardController.delete);

module.exports = router;
