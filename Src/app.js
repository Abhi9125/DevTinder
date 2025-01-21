// Episode - 5
const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    // res.send("Response from 1");
    setTimeout(() => {
      console.log("1st response");
    }, 5000);
    next();
  },
  (req, res, next) => {
    console.log("2nd Responce");
    next();
    // res.send("Responce from 2nd");
  },
  [
    (req, res, next) => {
      console.log("3nd Responce");
      next();
      // res.send("Responce from 2nd");
    },
    (req, res, next) => {
      console.log("4nd Responce");
      res.send("Responce from 4nd");
    },
  ]
);

app.listen(7777, () => {
  console.log("Server is running");
});
