const express = require("express");
const router = express.Router();

const DatabaseManager = require("../database/loginDatabase.js");

router.get("/", DatabaseManager.getAll); 

router.get("/:username", DatabaseManager.get);

router.post("/login", DatabaseManager.login);

router.post("/register", DatabaseManager.insert);

router.put("/update", DatabaseManager.authTokenMW, DatabaseManager.update);

router.delete("/:username", DatabaseManager.delete);


module.exports = router;