const express = require("express");
const router = express.Router();

const DatabaseManager = require("../database/loginDatabase.js");

router.get("/healthz", (req, res) => {
  res.send("ok inside");
  console.log("ok inside");
});

router.get("/", DatabaseManager.getAll);

router.get("/:username", DatabaseManager.get);

router.post("/login", DatabaseManager.login);

router.post("/register", DatabaseManager.insert);

router.put("/update", DatabaseManager.update);

router.delete("/:username", DatabaseManager.delete);

router.post("/token", DatabaseManager.getAccessToken);

router.post("/verify", DatabaseManager.authTokenMW, DatabaseManager.verify);

module.exports = router;
