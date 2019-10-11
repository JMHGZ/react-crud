const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config({ path: ".env" });
require("./config/database");

const postsRouter = require("./routes/api/posts");
const userRouter = require("./routes/api/users");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/posts", postsRouter);
app.use("/api/users", userRouter);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
