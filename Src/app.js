const express = require("express");

const app = express();

// Importing the database connection function
const databaseConnection = require("./Config/database");
// Importing the User model
const User = require("./models/user");

// Middleware to parse the json to js object
app.use(express.json());

/**
 * Route to retrieve a user by their email.
 * Expects 'emailId' in the request body.
 */
app.get("/user", async (req, res) => {
  // Extracting the emailId from the request body
  const userEmail = req.body.emailId;
  // console.log(userEmail);
  try {
    const user = await User.find({ email: userEmail });
    res.send(user);
  } catch (err) {
    res.status(404).send("User not found" + err.message);
  }
});

/**
 * Route to retrieve all users from the database.
 */
app.get("/feed", async (req, res) => {
  try {
    // Fetching all users
    const alluser = await User.find({});

    res.send(alluser);
  } catch (err) {
    res.status(404).send("User not found" + err.message);
  }
});

/**
 * Route to retrieve a user by their unique ID.
 * Expects 'id' in the request body.
 */
app.get("/id", async (req, res) => {
  // Extracting the Id from the request body
  const id = req.body.id;
  try {
    const userById = await User.findById(id);

    res.send(userById);
  } catch (err) {
    res.status(404).send("User not found" + err.message);
  }
});

/**
 * Route to retrieve a single user by their email.
 * Expects 'emailId' in the request body.
 */
app.get("/findone", async (req, res) => {
  const emails = req.body.emailId;
  try {
    const userById = await User.findOne({ email: emails });

    res.send(userById);
  } catch (err) {
    res.status(404).send("User not found" + err.message);
  }
});

/**
 * Route to handle user signup and save user data to the database.
 * Expects user details in the request body.
 */
app.post("/signup", async (req, res) => {
  // Creating a new user instance with sample data

  const userInstace = new User(req.body);

  try {
    // Saving the user data to the database
    await userInstace.save();
    // Sending a success message to the client
    res.send("User Data save successfully..");
  } catch (err) {
    res.status(400).send("User Data not save" + err.message);
  }
});

//
app.patch("/userupdate", async (req, res) => {
  const updateUserId = req.body.userId;
  const userupdate = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: updateUserId },
      userupdate,
      { returnDocument: "after", runValidators: true }
    );

    console.log(updateUser);
    res.send(updateUser);
  } catch (err) {
    res.status(404).send("User not updated" + err.message);
  }
});

/**
 * Route to delete a single user by their Id.
 * Expects 'Id' in the request body.
 */
app.delete("/deleteuser", async (req, res) => {
  const userId = req.body.userId;

  try {
    const deleteUser = await User.findByIdAndDelete({ _id: userId });

    console.log(User.length);
    res.send("User Deleted Succucessfully");
  } catch (err) {
    res.status(400).send("User Data not delete" + err.message);
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
