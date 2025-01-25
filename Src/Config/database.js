const mongoose = require("mongoose");

// Function connect to the MongoDb database using the Mongoose
const databaseConnection = async () =>
  await mongoose.connect(
    "mongodb+srv://abhisingh3132:sV8jbsD93RBrtBmZ@cluster0.aiuj7.mongodb.net/DevTinder"
  );

module.exports = databaseConnection;
