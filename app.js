var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const layouts = require("express-ejs-layouts");
const axios = require("axios");


// *********************************************************** //
//  Loading models
// *********************************************************** //

const Course = require('./models/User')

// *********************************************************** //
//  Connecting to the database
// *********************************************************** //

const mongoose = require( 'mongoose' );
//const mongodb_URI = 'mongodb://localhost:27017/cs103a_todo'
const mongodb_URI = 'mongodb+srv://vweiss:TaylorVarga1337@cluster0.pys6a5t.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect( mongodb_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
// fix deprecation warnings
//mongoose.set('useFindAndModify', false); 
//mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});


var indexRouter = require("./routes/index");

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

app.use(layouts);
app.use("/", indexRouter);

app.get("/githubInfo/:githubId", async (req, res, next) => {
  const id = req.params.githubId;
  const response = await axios.get("https://api.github.com/users/" + id + "/repos");
  console.dir(response.data.length);
  res.locals.repos = response.data;
  res.render("cspectTest",{
    route: req.route.path});
  //res.json(response.data.slice(100,105));
});

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
  res.render("error", {
    route: req.route.path,
  });
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
