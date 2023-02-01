const mongoose = require("mongoose");
const { mongoose: mongoosekey } = require("./key");
const url = mongoosekey.url;

const connMongoose = function () {
  mongoose
    .connect(url)
    .then((conn) => {
      console.log("Connect to Mongoose successfully.");
    })
    .catch((err) => console.log(err));
};

module.exports = connMongoose;
