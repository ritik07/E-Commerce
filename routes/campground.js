var express = require('express');
var router = express.Router();
var campgrounddb = require("../models/campgrounds");
var passport = require('passport');
var Admin = require("../models/admin");

router.get("/", function(req, res) {

    campgrounddb.find({}, function(err, work) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/campground", { showfromit: work, currentUser: req.user });
        }
    })



})

//ADD NEW COMPONENT TO DB
router.post("/", isLoggedIn, function(req, res) {
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newcompound = { name: name, image: image, description: description, price: price, quantity: quantity, author: author }
        //  CREATING A NEW COMPONENT AND SAVE IT TO DB
    campgrounddb.create(
        newcompound,
        function(err, work) {
            if (err) {
                console.log(err);
            } else {

                console.log(work);
                //redrict back to campgrounds page
                res.redirect("/campgrounds");
            }
        })
})

//NEW- SHOW FORM TO CREATE NEW COMPONENT
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
});

//SHOW - SHOWS MORE INFO ABOUT ONE COMPONENT
router.get("/:id", function(req, res) {
        campgrounddb.findById(req.params.id).populate("comments").exec(function(err, work) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/show.ejs", { work: work, currentUser: req.user });
            }
        })

    })
    //==========
    //   EDIT
    //=========
    //EDIT - TO EDIT A COMPONENT
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    campgrounddb.findById(req.params.id, function(err, foundcampground) {
        res.render("campgrounds/edit", { campground: foundcampground });
    });
})

//GET REQUEST
router.put("/:id", checkCampgroundOwnership, function(req, res) {
        //find and update
        campgrounddb.findByIdAndUpdate(req.params.id, req.body.compound, function(err, updatedcampground) {
            if (err) {
                res.redirect("/camprounds")
            } else {
                //redirect 
                res.redirect("/campgrounds/" + req.params.id);
            }
        })
    })
    //==========
    //   DESTORY A COMPONENT
    //=========
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
    campgrounddb.findByIdAndRemove(req.params.id, function(err, deleted) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    })
});

//middleware-III
function checkAdminOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Admin.findById(req.params.id, function(err, foundadmin) {
            if (err) {
                res.redirect("back")
            } else {
                //check for the ownership now
                if (foundcampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back")
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


//middleware-II
function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        campgrounddb.findById(req.params.id, function(err, foundcampground) {
            if (err) {
                res.redirect("back")
            } else {
                //check for the ownership now
                if (foundcampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back")
                }
            }
        });
    } else {
        res.redirect("back");
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