const express = require("express");
const app = express();
const connectDB = require("./config/db");
const compression = require("compression");
const path = require("path");
var cors = require("cors");

//Connect Database
connectDB();

//adding middleware
app.use(express.json());
app.use(cors());

//Compression
const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) {
    return false;
  }
  return compression.filter(req, res);
};
app.use(
  compression({
    filter: shouldCompress,
    level: 9,
  }),
);

//Securing
app.use((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect("https://" + req.headers.host + req.url);
  }
});

//All routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/postfeatures"));
app.use("/api/leaderboard", require("./routes/api/leaderboard"));
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build", { maxAge: 8640000000 }));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
