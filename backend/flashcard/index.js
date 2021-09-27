const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const flashcardRoutes = require("./routes/flashcardRoutes.js");

app.use("/api/flashcard", flashcardRoutes);

const port = process.env.PORT || 1000;
app.listen(port, () => {
	console.log(`Server up and running on port ${port}!`);
});