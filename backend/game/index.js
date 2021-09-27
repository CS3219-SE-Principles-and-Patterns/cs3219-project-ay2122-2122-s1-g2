const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const gameRoutes = require("./routes/gameRoutes.js");

app.use("/", gameRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server up and running on port ${port}!`);
});