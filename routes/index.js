const axios = require("axios");
var express = require("express");
var router = express.Router();
var usersRouter = require("./profile");
router.use("/profile", usersRouter);

/* GET home page. */
router.get("/", async (req, res, next) => {
  const response = await axios.get("https://aeich.pythonanywhere.com/api/v1/classpects/cotd");
  res.locals.cotd = response.data;
  res.locals.debugMode = true;
  res.render("index", {
    route: req.route.path
  });
});

router.get("/bio", (req, res, next) => {
  res.render("bio", {
    title: "Express App",
    route: req.route.path,
  });
});

module.exports = router;
