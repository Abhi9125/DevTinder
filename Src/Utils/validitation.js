const validator = require("validator");

const validitation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName.length >= 4 || lastName < 50)) {
    throw new Error("Invalid first or last name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invaild email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Invalid password minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    );
  }
};

module.exports = { validitation };
