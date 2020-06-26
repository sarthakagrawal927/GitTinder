const express = require("express");
const app = express();
const connectDB = require("./config/db");
const compression = require("compression");
const path = require("path");

//Connect Database
connectDB();

//adding middleware
app.use(express.json());

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
    level: 8,
  }),
);

//Caching
app.get("/*", function (req, res, next) {
  if (
    req.url.indexOf("/images/") === 0 ||
    req.url.indexOf("/stylesheets/") === 0
  ) {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  }
  next();
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
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
