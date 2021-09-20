const express = require("express");
const router = express.Router();

// const DatabaseManager = require("../database/matchmakingDatabase.js");

router.get("/", (req, res) => {
	res.json("Matchmaking Microservice");
})

module.exports = router;