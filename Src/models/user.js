const mongoose = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Defining the schema for the User Collection
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      // minLength: 5, // User's first name as a string
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new error("Invalid email addresss: " + value);
        }
      },
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

//  Not use the arrow function here bcz in arrow fuction this not use.
userSchema.methods.getJWT = async function () {
  // this is pointing the user schema
  const user = this;

  const token = await JWT.sign({ _id: user._id }, "Dev@Tinder123");

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

// Creating the Model for the User schema
const User = mongoose.model("User", userSchema);

module.exports = User;
