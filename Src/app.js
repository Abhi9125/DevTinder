const express = require("express");

const app = express();

// Importing the database connection function
const databaseConnection = require("./Config/database");
// Importing the User model
const User = require("./models/user");
const { validitation } = require("./Utils/validitation");
const byrypt = require("bcrypt");
const cookieParse = require("cookie-parser");
const JWT = require("jsonwebtoken");
const userAuth = require("./Middlewares/auth");

// Middleware to parse the json to js object
app.use(express.json());
app.use(cookieParse());

/**
 * Route to handle user signup and save user data to the database.
 * Expects user details in the request body.
 */
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (Error) {
    res.status(404).send("Error" + Error.message);
  }
});

app.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send("request connection send by the " + user.firstName);
  } catch (error) {
    res.status(400).send("Got error in connectionrequest" + error.message);
  }
});

databaseConnection()
  .then(() => {
    console.log("Database connected...");
    app.listen(7777, () => {
      console.log("Server is running");
    });
  })
  .catch(() => {
    console.error("Connection error..");
  });
