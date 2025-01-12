// console.log("Staring a new Project");

const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("1. Listing on the /");
});
app.use("/hello", (req, res) => {
  res.send("Listen on the /hello");
});
app.use("/test", (req, res) => {
  res.send("listen on the /test");
});

app.listen(7777, () => {
  console.log("Hello world");
});
