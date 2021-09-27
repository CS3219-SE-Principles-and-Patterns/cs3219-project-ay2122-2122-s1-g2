const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const flashcardRoutes = require("./routes/flashcardRoutes.js");

app.use("/flashcard", flashcardRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => {
	console.log(`Server up and running on port ${port}!`);
});
