const jwt = require("jsonwebtoken");
const User = require("../models/user");

// check auth status
const checkAuth = (req, res, next) => {
    // get token from cookies
  const token = req.cookies.jwt;

  // if token exists, verify it
  if (token) {
    jwt.verify(token, "iddqd secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        res.redirect("/login");
        next();
      } else {
        console.log(decodedToken);
        res.locals.user = decodedToken.id;
        next();
      }
    });
  } else {
    // if token doesn't exist, set user to null
    res.locals.user = null;
    // redirect to login page
    res.redirect("/login");
    next();
  }
}

// check current user
const checkUser = (req, res, next) => {
    // get token from cookies
  const token = req.cookies.jwt;

  // if token exists, verify it
  if (token) {
    jwt.verify(token, "iddqd secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    // if token doesn't exist, set user to null
    res.locals.user = null;
    next();
  }
}

// export module
module.exports = { checkAuth, checkUser };