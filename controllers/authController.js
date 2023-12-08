const User = require("../models/user");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      // console.log(properties.path);
      // console.log(properties.message);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password} = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);

  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send("error, user not created");
  }

  // console.log(email, password);
  // res.send("new signup");
};

module.exports.login_post = async (req, res) => {
  const { email, password} = req.body;

  console.log(email, password);
  res.send("user login");
};
