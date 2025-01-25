const express = require("express");

const app = express();

// Importing the database connection function
const databaseConnection = require("./Config/database");
// Importing the User model
const User = require("./models/user");

// Route to handle user signup and save user data to the database
app.post("/signup", async (req, res) => {
  // Creating a new user instance with sample data
  const userInstace = new User({
    firstName: "Rahul",
    lastName: "Anand",
    email: "rahul@gmail.com",
    password: "rahul123",
  });

  try {
    // Saving the user data to the database
    await userInstace.save();
    // Sending a success message to the client
    res.send("User Data save successfully..");
  } catch {
    res.status(400).send("User Data not save");
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
