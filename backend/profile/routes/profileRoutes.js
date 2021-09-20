const express = require("express");
const router = express.Router();

// const DatabaseManager = require("../database/profileDatabase.js");

router.get("/", (req, res) => {
	res.json("Profile Microservice");
})

module.exports = router;