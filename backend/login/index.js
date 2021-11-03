const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const loginRoutes = require("./routes/loginRoutes.js");

app.use("/api/login", loginRoutes);

app.get("/healthz", (req, res) => {
  res.send("ok");
  console.log("ok outside");
});

app.get("/", (req, res) => {
  res.send("success outside");
  console.log("success outside");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});

module.exports = app;
