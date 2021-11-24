var express = require("express");
var cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

var router = require("./routes/router");
var app = express();
// Enable Cors & Body Parsing
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging using morgan & log file using node buildin modules
app.use(morgan("dev"));
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "/logs/access.log"),
  { flags: "a" }
);
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(router);

// Error Handling
app.use((req, res, next) => {
  var error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Configure the Port and Run the Server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running at port:" + port);
  }
});
