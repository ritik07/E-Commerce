var express = require('express');
var router = express.Router();
var campgrounddb = require("../models/campgrounds");
var order = require("../models/order");



//route of that
router.get("/profile", isLoggedIn, function(req, res) {
    order.find({}, function(err, work) {
        if (err) {
            console.log(err);
        } else {
            res.render("order/myorders", { showfromit: work, currentUser: req.user, product: work.product });
            console.log(work)
        }
    })
})

router.get("/campgrounds/:id/address", isLoggedIn, function(req, res) {
    campgrounddb.findById(req.params.id, function(err, foundid) {
        if (err) {
            console.log(err)
        } else {
            res.render("order/new", { itemid: foundid, currentUser: req.user })
        }
    })

})

//ADD ADDRESS TO DATABASE
router.post("/campgrounds/:id/address", isLoggedIn, function(req, res) {
    const products = []
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var landmark = req.body.landmark;
    var phonenumber = req.body.phonenumber;
    var author = {
        id: req.user._id,
        username: req.user.username,

    }
    var neworder = { firstname: firstname, lastname: lastname, address: address, landmark: landmark, phonenumber: phonenumber, author: author }
    let count = 0;

    function reqid() {
        campgrounddb.findById(req.params.id, function(err, foundid) {
            if (err) {
                console.log(err)
            } else {
                products.push(foundid);
                // console.log(products)
                neworder['product'] = products
                count++;
                if (count == 1) {
                    createDb(neworder)
                }
            }
        })
    }

    function createDb(neworder) {
        // console.log(neworder)
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
    }
    reqid()

    // get data from form and add to campground array

    var product = [
            req.params.id,
        ]
        //  CREATING A NEW COMPONENT AND SAVE IT TO DB

})

///order out of delivery 
router.post("/deliverystatusisoutofdelivery", function(req, res) {
    const id = req.body.id;
    order.findById(id, function(err, foundid) {
        if (err) {
            console.log(err)
        } else {
            foundid.isoutofdelivery = 1;
            foundid.save()
            console.log(foundid)
            res.redirect('/profile')
        }
    })

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