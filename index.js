const express = require("express");
const app = express();
const connectDB = require("./config/db");
const compression = require("compression");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

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
    level: 9,
  }),
);

//All routes
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/profile", require("./routes/profile"));
app.use("/profile", require("./routes/profile_stats"));
app.use("/posts", require("./routes/postfeatures"));
app.use("/leaderboard", require("./routes/leaderboard"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build", { maxAge: 8640000 }));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    }),
  );
}
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
