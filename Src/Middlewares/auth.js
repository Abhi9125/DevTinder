const JWT = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    // console.log("Cookies - "+ cookies);
    const { token } = cookies;
    console.log(token);

    if (!token) {
      throw new error("Token invalid!!!");
    } else {
      const decodeMessage = await JWT.verify(token, "Dev@Tinder123");
      console.log(decodeMessage);

      const { _id } = decodeMessage;
      console.log(_id);
      const user = await User.findById(_id);
      console.log(user);
      if (!user) {
        throw new Error("User not found");
      }

      req.user = user;
      next();
    }
  } catch (error) {
    res.send("Error" + error.message);
  }
};

module.exports = userAuth;
