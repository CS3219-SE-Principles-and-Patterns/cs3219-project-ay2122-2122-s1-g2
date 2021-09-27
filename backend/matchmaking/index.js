const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const matchmakingRoutes = require("./routes/matchmakingRoutes.js");

app.use("/api/matchmaking", matchmakingRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server up and running on port ${port}!`);
});