const express = require("express");
const router = express.Router();

// const DatabaseManager = require("../database/gameDatabase.js");

router.get("/", (req, res) => {
	res.json("Game Microservice");
})

module.exports = router;