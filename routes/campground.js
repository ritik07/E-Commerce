var express = require('express');
var router = express.Router();
var campgrounddb = require("../models/campgrounds");
var passport = require('passport');
var Admin = require("../models/admin");
var user = require("../models/user");
var category = require("../models/category");





router.get("/", function(req, res) {

    campgrounddb.find({}, function(err, work) {
        if (err) {
            console.log(err);
        } else {
            category.find({}, function(err, foundcategory) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/campground", { showfromit: work, foundcategory: foundcategory, currentUser: req.user });

                }
            })
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
    var shopname = req.body.shopname;
    var phonenumber = req.body.phonenumber;
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newcompound = { name: name, image: image, description: description, price: price, quantity: quantity, shopname: shopname, author: author, phonenumber: phonenumber }
        //  CREATING A NEW COMPONENT AND SAVE IT TO DB
    campgrounddb.create(
        newcompound,
        function(err, work) {
            if (err) {
                console.log(err);
            } else {
                //redrict back to campgrounds page
                res.redirect("/campgrounds");
            }
        })
})

//NEW- SHOW FORM TO CREATE NEW COMPONENT
router.get("/new", isManufacture, isLoggedIn, function(req, res) {
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

//======
//campgrounds/category/new
//======

router.get("/category/new", isAdmin, isLoggedIn, function(req, res) {

    category.find({}, function(err, foundcategory) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("category/new", { foundcategory: foundcategory });
        }
    })



})

router.post("/category", isLoggedIn, function(req, res) {
    // get data from form and add to category array
    var name = req.body.name;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcategory = { name: name, author: author }
        //creating a database of named category and saving parameters(newcategory) in it 
    category.create(newcategory, function(err, data) {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            //redirect back to home page
            res.redirect("/campgrounds");
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
                console.log(err)
                res.redirect("/campgrounds")
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

//middleware-V
function isAdmin(req, res, next) {
    if (req.user.isadmin == 1) {
        return next();
    } else {
        res.redirect("/campgrounds")
    }
}

//middleware-IV
function isManufacture(req, res, next) {
    if (req.user.ismanufacture == 1 || req.user.isadmin == 1) {
        return next();
    } else {
        res.redirect("/campgrounds")
    }
}




//middleware-II
function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        campgrounddb.findById(req.params.id, function(err, foundcampground) {
            if (err) {
                consol.log(err);
                res.redirect("back")
            } else {
                //check for the ownership now
                if (foundcampground.author.id.equals(req.user._id) || req.user.isadmin == 1) {
                    next();
                } else {
                    console.log("not allowed")
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