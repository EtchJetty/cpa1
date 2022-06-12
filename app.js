var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

var app = express();
app.use(connectLiveReload());
app.use("/static/css", express.static(path.join(__dirname, "build")));
app.use("/static/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/static/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use("/static/css", express.static(path.join(__dirname, "public/stylesheets/")));
app.use("/static/css/fonts", express.static(path.join(__dirname, "node_modules/bootstrap-icons/font/fonts/")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// var pages = require("node-github-pages")(app, {
//   static: "public", // Static directory path(css, js...)
//   path: "docs" // Output path
// });
// pages.renderFiles([{
//   "view": "index",
//   "url": "",
//   "options": { title: "Express" }
// }]);

module.exports = app;
