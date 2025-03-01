const express = require("express");

const app = express();

// Importing the database connection function
const databaseConnection = require("./Config/database");
// Importing the User model
const User = require("./models/user");
const byrypt = require("bcrypt");
const cookieParse = require("cookie-parser");
const authRoute = require("./Routes/authRoute");
const profileRoute = require("./Routes/profileRoute");
const requestRoute = require("./Routes/requestRoute");

// Middleware to parse the json to js object
app.use(express.json());
app.use(cookieParse());

app.use("/", authRoute);
app.use("/", profileRoute);
app.use("/", requestRoute);

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
