const express = require("express");
const router = express.Router();

const { Server } = require("socket.io");
const server = require("../index")
const io = new Server(server);

const DatabaseManager = require("../database/matchmakingDatabase.js"); 

// For now, assume no authTokenMW
router.get("/", DatabaseManager.authTokenMW, DatabaseManager.getUserRecord);
router.get("/getall", DatabaseManager.getAll);
router.post("/", DatabaseManager.insert);
router.delete("/:username", DatabaseManager.delete);

module.exports = router;
