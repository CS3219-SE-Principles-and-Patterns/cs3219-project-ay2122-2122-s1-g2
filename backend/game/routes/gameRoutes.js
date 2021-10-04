const express = require("express");
const router = express.Router();

const DatabaseManager = require("../database/gameDatabase.js");

router.get("/", (req, res) => {
	res.json("Game Microservice");
})

router.get("/", DatabaseManager.authTokenMW, DatabaseManager.getAll);

router.get("/:username", DatabaseManager.authTokenMW, DatabaseManager.get);

router.post("/insert", DatabaseManager.authTokenMW, DatabaseManager.insert);

router.put("/update", DatabaseManager.authTokenMW, DatabaseManager.update);

router.delete("/:username", DatabaseManager.authTokenMW, DatabaseManager.delete);


module.exports = router;