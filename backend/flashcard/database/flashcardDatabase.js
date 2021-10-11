require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;
// const db = "mongodb://127.0.0.1:27017"

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;
connection.once("open", (err) => {
  console.log("MongoDB database connection established successfully");
});

module.exports = connection;
