var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStregy = require("passport-local");
var Admin = require("../models/admin");

//==============
//Auth Routes Admins
//=============


//reg form admin

router.get("/register/admin", function(req, res) {
    res.render("admin/register")
});
//handle sign up logic
router.post("/register/admin", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, { isadmin: req.body.isadmin }, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("admin/register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds")
        });
    })
})

//show login form
router.get("/login/admin", function(req, res) {
    res.render("admin/login");
})


//handling login logic
router.post("/login/admin", passport.authenticate("local",

        {

            successRedirect: "/campgrounds",
            faliurRedirect: "/login/admin"
        }),

    function(req, res) {

    });

//logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login/admin")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login/admin")
    }
}
//passport config

router.use(require("express-session")({
    secret: "Anthing here",
    resave: false,
    saveUninitialized: false,
}));

module.exports = router;