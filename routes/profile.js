var express = require("express");
var router = express.Router();
const axios = require("axios");
const User = require("../models/User");

/* GET home page. */
// router.get(
//   "/",
//   (req, res, next) => {
//     res.render("cspectTest.ejs", { navi:{ "Home" : "/" , "Bio" : "/bio" , "Profiles" : "/profiles" },
//       route: "/profiles" + req.route.path,
//     });
//   }
//   // },
//   // (req, res, next) => {
//   //   res.render("bio");
//   // }
// );

router.get("/", async (req, res, next) => {
  try {
    res.locals.users = await User.find();
    res.render("profile/profiles",{route: "/profile" + req.route.path});
  } catch (e) {
    next(e);
  }
});

router.get("/add", (req, res) => {
  res.render("profile/add", {route: "/profile" + req.route.path});
});

router.post("/add", async (req, res, next) => {
  try {
    let newUser = new User({
      name: req.body.name,
      description: req.body.description,
      classpect: {class: req.body.classp, aspect: req.body.aspectp},
      createdAt: new Date()
    });

    await newUser.save();
    res.redirect("/profile/" + newUser._id);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    res.locals.userInfo = await User.findOne({_id: id}, "name description classpect createdAt");
    res.render("profile/viewProfile", {route: "/profile" + req.route.path});
  } catch (e) {
    next(e);
  }
});

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
