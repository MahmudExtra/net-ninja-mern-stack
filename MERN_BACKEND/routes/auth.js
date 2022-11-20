const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/authController");

const AuthRouter = express.Router();

// login
AuthRouter.post("/login", loginUser);

// register
AuthRouter.post("/register", registerUser);

// logout
AuthRouter.post("/logout", logoutUser);

module.exports = AuthRouter;
