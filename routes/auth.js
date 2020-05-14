var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStregy = require("passport-local");
var User = require("../models/user");


router.get("/", function(req, res) {
    res.render("landing");
});


//==============
//Auth Routes
//=============


//reg form
router.get("/register", function(req, res) {
    res.render("register")
});
//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds")
        });
    })
})

//show login form
router.get("/login", function(req, res) {
    res.render("login");
})

//handling login logic
router.post("/login", passport.authenticate("local", {

        successRedirect: "/campgrounds",
        faliurRedirect: "/login"
    }),

    function(req, res) {

    });

//logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login")
    }
}

//=========
//VERIFICATION
//=========

//get
router.get("/verification", function(req, res) {
    User.find({}, function(err, usersfound) {
        if (err) {
            console.log(err)
        } else {
            console.log(usersfound)
            res.render("auth/verification", { usersfound: usersfound })
        }
    })

})

//confirmation
router.get("/verification/:id/confirmation", function(req, res) {
    User.findById(req.params.id, function(err, userfound) {
        if (err) {
            console.log(err)
        } else {
            res.render("auth/confirmation", { id: req.params.id, userfound: userfound })
        }
    })
})

//post confirmation
router.put("/verification/:id/", function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body.updates, function(err, updated) {
        if (err) {
            console.log(err);
        } else {
            console.log(updated)
            res.redirect("/verification")
        }
    })
})



module.exports = router;