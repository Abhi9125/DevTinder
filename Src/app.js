const express = require("express");

const app = express();

// Importing the database connection function
const databaseConnection = require("./Config/database");
// Importing the User model
const User = require("./models/user");
const { validitation } = require("./Utils/validitation");
const byrypt = require("bcrypt");
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

  try {
    validitation(req);

    const { firstName, lastName, email, password, age, gender, skills } =
      req.body;

    const passwordHash = await byrypt.hash(password, 10);
    console.log(passwordHash);

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

//

app.patch("/userupdate/:userId", async (req, res) => {
  const userID = req.params.userId;

  const userUpdateData = req.body;
  try {
    const Allowed_Update = ["firstName", "password", "age", "gender", "skills"];

    const isUpdateAllowed = Object.keys(userUpdateData).every((k) =>
      Allowed_Update.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Udate not allowed");
    }
    if (userUpdateData?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const updateUser = await User.findByIdAndUpdate(userID, userUpdateData, {
      returnDocument: "after",
      runValidators: true,
    });

    console.log(updateUser);
    res.send(updateUser);
  } catch (Error) {
    res.status(404).send("User not updated" + Error.message);
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
