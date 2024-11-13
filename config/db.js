const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongodb = () => {
  mongoose
    .connect(process.env.MongoDB)
    .then(console.log("mongo db is connected"))
    .catch((err) => console.log(err));
};

module.exports = mongodb;
