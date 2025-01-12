// Starting a new project
const express = require("express");

const app = express();

// Handle GET requests to the /user route
app.get("/user", (req, res) => {
  // Responds to client GET requests made specifically to the /user endpoint
  res.send(
    "Checking routing using GET method. In the GET method, the server only responds to requests made to /user, not to anything else like /userxyz."
  );
});

// Handle POST requests to the /user route
app.post("/user", (req, res) => {
  // Typically used to send data to the server to save or create a resource (e.g., saving user data to a database)
  res.send("Sending the request using POST method to save the user data.");
});

// Handle DELETE requests to the /user route
app.delete("/user", (req, res) => {
  // Used to delete a resource (e.g., deleting a user from the database)
  res.send("Deleting the data.");
});

/*
Uncommented routes from previous examples:
These routes can be added to handle other paths.
*/

// app.use("/", (req, res) => {
//   // Default route that listens to all requests made to /
//   res.send("1. Listening on the / route");
// });

// app.use("/hello", (req, res) => {
//   // Handles requests made to /hello
//   res.send("Listening on the /hello route");
// });

// app.use("/test", (req, res) => {
//   // Handles requests made to /test
//   res.send("Listening on the /test route");
// });

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
