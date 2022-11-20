const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const WorkoutRoute = require("./routes/workouts");
const AuthRoute = require("./routes/auth");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// by default server route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/workouts", WorkoutRoute);
app.use("/api/auth", AuthRoute);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
