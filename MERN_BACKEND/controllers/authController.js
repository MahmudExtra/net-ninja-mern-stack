const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // using custom static method (signup) which was was created in authModel.
    const user = await User.signin(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register user

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // using custom static method (signup) which was was created in authModel.
    const user = await User.signup(username, email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// logout user

const logoutUser = async (req, res) => {
  res.send("logout user");
};

module.exports = { loginUser, registerUser, logoutUser };
