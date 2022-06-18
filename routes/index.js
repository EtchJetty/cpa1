var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express App", 
    route: req.route.path, 
    navi: {
        "Home": "/", 
        "Bio": "/bio", 
        "Profiles": "/profiles"
    }});
});

module.exports = router;
