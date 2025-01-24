const mongoose = require("mongoose");

const databaseConnection = async () =>
  await mongoose.connect(
    "mongodb+srv://abhisingh3132:sV8jbsD93RBrtBmZ@cluster0.aiuj7.mongodb.net/DevTinder"
  );

module.exports = databaseConnection;
