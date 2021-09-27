const express = require("express");
const router = express.Router();

const DatabaseManager = require("../database/profileDatabase.js");

// router.get("/", (req, res) => {
// 	res.json("Profile Microservices are up");
// })

var profileController = require("../controller/profileController");

router.route('/')
	.post(profileController.create)
	.put(profileController.put)
	.get(profileController.get);

module.exports = router;
