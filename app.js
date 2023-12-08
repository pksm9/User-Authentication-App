const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
// const bodyParser = require("body-parser");

const app = express();


// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://admin:test1234@cluster0.co5a0qd.mongodb.net/user-auth";
mongoose
  .connect(dbURI,
//      {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   }
  )
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/content", (req, res) => res.render("content"));
app.use(authRoutes);
