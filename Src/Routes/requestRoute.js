const express = require("express");
const userAuth = require("../Middlewares/auth");
const requestRoute = express.Router();

requestRoute.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send("request connection send by the " + user.firstName);
  } catch (error) {
    res.status(400).send("Got error in connectionrequest" + error.message);
  }
});

module.exports = requestRoute;
