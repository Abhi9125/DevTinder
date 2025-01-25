const mongoose = require("mongoose");

// Defining the schema for the User Collection
const userSchema = mongoose.Schema({
  firstName: {
    type: String, // User's first name as a string
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

// Creating the Model for the User schema
const User = mongoose.model("User", userSchema);

module.exports = User;
