const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true, // if there is any whitespace, it will be removed
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
  },
});

// custom method
// static method

userSchema.statics.signup = async function (username, email, password) {
  // validation
  if (!email || !password || !username) {
    throw Error("All field must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please use a valid email address!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Please put strong password that contains min length of 8, 1 uppercase, 1 lower and 1 symbol"
    );
  }

  const usernameExsits = await this.findOne({ username });
  if (usernameExsits) {
    throw new Error("Username already exists");
  }
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });

  return user;
};

// static signin method
userSchema.statics.signin = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All field must be filled!");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email does not exists");
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
