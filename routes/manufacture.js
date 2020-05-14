var express = require('express');
var router = express.Router();
var user = require("../models/user");


router.get('/manufacture', isLoggedIn, isManufacture, function(req, res) {
    user.find({}, function(err, founduser) {
        if (err) {
            console.log(err)
        } else {
            res.render("manufacture/manufacture", { currentUser: req.user, founduser: founduser })
        }
    })
})




router.get('/manufacture/:id/new', isLoggedIn, isManufacture, function(req, res) {
    user.findById(req.params.id, function(err, founduser) {
        if (err) {
            console.log(err)
        } else {
            res.render("manufacture/new", { currentUser: req.user });
        }
    })

})

function isManufacture(req, res, next) {
    if (req.user.ismanufacture == 1) {
        return next();
    } else {
        res.redirect("/campgrounds")
    }
}
//middleware-I
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login")
    }
}

module.exports = router;