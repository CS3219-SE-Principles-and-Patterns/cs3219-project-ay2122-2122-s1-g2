const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    allowHeaders: ["sessionId", "Content-Type", "x-refresh-token"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    origin: true,
  })
);
const flashcardRoutes = require("./routes/flashcardRoutes.js");

app.use("/api/flashcard", flashcSardRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});

module.exports = app;
