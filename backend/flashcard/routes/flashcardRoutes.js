const express = require("express");
const router = express.Router();

const flashcardController = require("../controller/flashcardController");
const DatabaseManager = require("../database/flashcardDatabase.js");

router
  .route("/")
  .post(flashcardController.authTokenMW, flashcardController.create)
  .get(flashcardController.authTokenMW, flashcardController.getAll);

router
  .route("/:id")
  .get(flashcardController.authTokenMW, flashcardController.get)
  .put(flashcardController.authTokenMW, flashcardController.put)
  .delete(flashcardController.authTokenMW, flashcardController.delete);

router
  .route("/test/test")
  .get(flashcardController.authTokenMW, flashcardController.getAll2)
  .post(flashcardController.authTokenMW, flashcardController.create2)
  .put(flashcardController.authTokenMW, flashcardController.updateDetails);

router
  .route("/test/test/:id")
  .get(flashcardController.authTokenMW, flashcardController.get2);


module.exports = router;
