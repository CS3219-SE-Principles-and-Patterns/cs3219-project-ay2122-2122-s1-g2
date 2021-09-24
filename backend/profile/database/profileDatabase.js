require('dotenv').config()
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;
// Connect to MongoDB

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        console.log(err)
    });

const connection = mongoose.connection;
connection.once("open", (err) => {
    console.log("MongoDB database connection established successfully");
});

module.exports = connection;