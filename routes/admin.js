var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStregy = require("passport-local");
var Admin = require("../models/admin");
var campgrounddb = require("../models/campgrounds");
var order = require("../models/order")
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
    User.register(newUser, req.body.password, function(err, user) {
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

//show all orders
router.get("/campgrounds/:id/address/admin/allorders", isLoggedIn, function(req, res) {


        order.find({}, function(err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data);
                    res.render("admin/allorders", { data: data, currentUser: req.user });
                }
            })
            // campgrounddb.findById(req.params.id, function(err, foundid) {
            //     if (err) {
            //         console.log(err)
            //     } else {
            //         products.push(foundid);
            //         // console.log(products)
            //         neworder['product'] = products
            //         count++;
            //         if (count == 1) {
            //             createDb(neworder)
            //         }
            //     }
            // })
    }

)

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