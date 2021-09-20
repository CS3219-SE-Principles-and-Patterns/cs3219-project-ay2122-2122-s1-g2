const express = require("express");
const router = express.Router();

// const DatabaseManager = require("../database/flashcardDatabase.js");

router.get("/", (req, res) => {
	res.json("Flashcard Microservice");
})

module.exports = router;