var express = require('express');
var router = express.Router();
var campgrounddb = require("../models/campgrounds");
var order = require("../models/order");




router.get("/profile", isLoggedIn, function(req, res) {
    order.find({}, function(err, work) {
        if (err) {
            console.log(err);
        } else {
            res.render("order/myorders", { showfromit: work, currentUser: req.user });
            console.log(work)
        }
    })
})

router.get("/campgrounds/:id/address", isLoggedIn, function(req, res) {
    campgrounddb.findById(req.params.id, function(err, foundid) {
        if (err) {
            console.log(err)
        } else {
            res.render("order/new", { itemid: foundid })
        }
    })

})

//ADD ADDRESS TO DATABASE
router.post("/campgrounds/:id/address", isLoggedIn, function(req, res) {

    // function reqid() {
    //     campgrounddb.findById(req.params.id, function(err, foundid) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             var result = console.log(foundid);
    //             return result;
    //         }
    //     })
    // }



    // get data from form and add to campground array
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var landmark = req.body.landmark;
    var phonenumber = req.body.phonenumber;
    var product = [
        req.params.id,
        req.params.name,
        req.params.image,
    ]
    var author = {
        id: req.user._id,
        username: req.user.username,

    }




    var neworder = { firstname: firstname, lastname: lastname, address: address, landmark: landmark, phonenumber: phonenumber, author: author, product: product }
        //  CREATING A NEW COMPONENT AND SAVE IT TO DB
    order.create(
        neworder,

        function(err, foundorder) {
            if (err) {
                console.log(err);
            } else {
                console.log(foundorder);
                //redirect

                res.redirect("/campgrounds");

            }
        }
    )
})



//middleware-I
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login")
    }
}

module.exports = router;