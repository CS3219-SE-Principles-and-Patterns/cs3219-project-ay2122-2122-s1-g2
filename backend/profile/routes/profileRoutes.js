const express = require("express");
const router = express.Router();

const DatabaseManager = require("../database/profileDatabase.js");

// router.get("/", (req, res) => {
// 	res.json("Profile Microservices are up");
// })

var ProfileController = require("../controller/profileController");

router
  .route("/")
  .post(ProfileController.create)
  .post(ProfileController.authTokenMW, ProfileController.update)
  .put(ProfileController.authTokenMW, ProfileController.update)
  .get(ProfileController.authTokenMW, ProfileController.get);

module.exports = router;
