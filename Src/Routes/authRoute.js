const express = require("express");
const authRoute = express.Router();
const { validitation } = require("../Utils/validitation");
const byrypt = require("bcrypt");
const User = require("../models/user");

authRoute.post("/signup", async (req, res) => {
  // Creating a new user instance with sample data

  try {
    validitation(req);

    const { firstName, lastName, email, password, age, gender, skills } =
      req.body;

    const passwordHash = await byrypt.hash(password, 10);
    // console.log(passwordHash);

    const userInstace = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      skills,
    });
    // Saving the user data to the database
    await userInstace.save();

    // Sending a success message to the client
    res.send("User Data save successfully..");
  } catch (err) {
    res.status(400).send("User Data not save" + err.message);
  }
});

authRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found!!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);
      res.send("Login Successfull!!!");
    } else {
      throw new Error("Invalid crediantials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = authRoute;
