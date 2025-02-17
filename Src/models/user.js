const mongoose = require("mongoose");

// Defining the schema for the User Collection
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5, // User's first name as a string
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        const validGender = ["male", "female", "other"];
        if (!validGender.includes(value.toLowerCase())) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Creating the Model for the User schema
const User = mongoose.model("User", userSchema);

module.exports = User;
