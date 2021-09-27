const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const profileRoutes = require("./routes/profileRoutes.js");

app.use("/profile", profileRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server up and running on port ${port}!`);
});