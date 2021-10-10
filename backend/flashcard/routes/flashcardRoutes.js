const express = require("express");
const router = express.Router();

const flashcardController = require("../controller/flashcardController");
const DatabaseManager = require("../database/flashcardDatabase.js");

router.route('/')
	.post(flashcardController.create)
	.get(flashcardController.get)
	.put(flashcardController.put);

module.exports = router;