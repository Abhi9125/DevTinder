// Starting a new project
const express = require("express");

const app = express();

// Handle GET requests to the /user route
app.get("/user/:id", (req, res) => {
  // Responds to client GET requests made specifically to the /user endpoint
  const userId = req.params;
  console.log(userId);
  res.send(
    "Checking routing using GET method. In the GET method, the server only responds to requests made to /user, not to anything else like /userxyz."
  );
});
app.get("/user/:id/:name", (req, res) => {
  // Responds to client GET requests made specifically to the /user endpoint
  const { id, name } = req.params;
  console.log(id);
  console.log(name);
  res.send(
    "Checking routing using GET method. In the GET method, the server only responds to requests made to /user, not to anything else like /userxyz."
  );
});

app.get("/user/:id/:name", (req, res) => {
  // Responds to client GET requests made specifically to the /user endpoint
  const { id, name } = req.params;
  console.log(id);
  console.log(name);
  res.send(
    "Checking routing using GET method. In the GET method, the server only responds to requests made to /user, not to anything else like /userxyz."
  );
});

app.get("/user", (req, res) => {
  const id1 = req.query.a;

  res.send("A value " + id1);
});
app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
