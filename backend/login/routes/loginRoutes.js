const express = require("express");
const router = express.Router();

const DatabaseManager = require("../database/loginDatabase.js");

router.get("/", DatabaseManager.getAll); 

<<<<<<< HEAD
router.get("/:username", DatabaseManager.get);
=======
const authTokenMW = (req, res, next) => {
	const aHeader = req.headers['authorization'];
	const aToken = aHeader && aHeader.split(' ')[1];
	if (aToken == null) {
		return res.status(401).send("Authentication token required");
	}
>>>>>>> master

router.post("/login", DatabaseManager.login);

router.post("/register", DatabaseManager.insert);

router.put("/update", DatabaseManager.authTokenMW, DatabaseManager.update);

router.delete("/:username", DatabaseManager.delete);


module.exports = router;