var express = require('express');
var router = express.Router();
var campgrounddb = require("../models/campgrounds");
var passport = require('passport');
var Admin = require("../models/admin");
var category = require("../models/category");
var productdb = require("../models/product");
var order = require("../models/order");
var Commentdb = require("../models/comment")




router.get("/campgrounds/category/:id/", function(req, res) {
    category.find({}, function(err, foundcategory) {
        if (err) {
            res.redirect("campgrounds");
        } else {
            productdb.find({}, function(err, founddata) {
                res.render("category/category", { currentUser: req.user, foundcategory: foundcategory, id: req.params.id, founddata: founddata })
            })
        }
    })

})

//Show page
router.get("/campgrounds/category/:id/:id_product", function(req, res) {

    productdb.findById(req.params.id_product).populate("comments").exec(function(err, foundproduct) {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds");
        } else {
            category.findById(req.params.id, function(err, foundcategory) {
                res.render("product/show", { foundproduct: foundproduct, currentUser: req.user, id: req.params.id, foundcategory: foundcategory })
            })

        }
    })
})


//edit
router.get("/campgrounds/category/:id/:id_product/edit", checkCampgroundOwnership, isLoggedIn, isManufacture, function(req, res) {
    productdb.findById(req.params.id_product, function(err, foundproduct) {
        if (err) {
            console.log(err)
        } else {
            category.findById(req.params.id, function(err, foundcategory) {
                if (err) {
                    console.log(err)
                } else {
                    res.render("product/edit", { foundproduct: foundproduct, foundcategory: foundcategory });
                }
            })

        }
    })
})

// edit post req
router.post("/campgrounds/category/:id/:id_product", function(req, res) {
    productdb.findByIdAndUpdate(req.params.id_product, req.body.editproduct, function(err, updated) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds")
        }
    })
})

//delete
router.delete("/campgrounds/category/:id/:id_product", function(req, res) {
        productdb.findByIdAndRemove(req.params.id_product, function(err, deleted) {
            if (err) {
                console.log(err)
            } else {
                res.redirect("/campgrounds")
            }
        })
    })
    //GET order page
router.get("/campgrounds/category/:id/:id_product/address", isLoggedIn, function(req, res) {
    //render the order page 
    productdb.findById(req.params.id_product, function(err, itemid) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            res.render("product/neworders", { id: req.params.id, currentUser: req.user, itemid: itemid })

        }
    })

})

//Post order page save details of ordered product into database
router.post("/campgrounds/category/:id/:id_product/address", function(req, res) {

    //get data from ejs
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

    var totalinfo = { firstname: firstname, lastname: lastname, address: address, landmark: landmark, phonenumber: phonenumber, author: author, phonenumber: phonenumber }
    let count = 0;

    function showdata() {
        productdb.findById(req.params.id_product, function(err, foundid) {
            if (err) {
                console.log(err)
            } else {
                products.push(foundid);
                // console.log(products)
                totalinfo['product'] = products
                count++;
                if (count == 1) {
                    createDb(totalinfo)
                }
            }
        })
    }

    function createDb(totalinfo) {
        order.create(
            totalinfo,
            function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    res.redirect("/campgrounds");
                }
            }
        )
    }
    showdata()
    var product = [
        req.params.id_product,
    ]
})



router.get("/campgrounds/category/:id/addnew/new", isLoggedIn, function(req, res) {
    res.render("product/new", { id: req.params.id })
})

router.post("/campgrounds/category/:id/", isLoggedIn, function(req, res) {
    // get data into variable
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var shopname = req.body.shopname;
    var phonenumber = req.body.phonenumber;
    var category = {
        id: req.params.id
    }
    var author = {
        id: req.user._id,
        username: req.user.username
    }

    var newproduct = { name: name, image: image, description: description, price: price, quantity: quantity, shopname: shopname, category: category, author: author, phonenumber: phonenumber }

    productdb.create(newproduct, function(err, data) {
        if (err) {
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/category/" + req.params.id)
        }
    })
})

//get new comment
router.get("/campgrounds/category/:id/:id_product/comments", function(req, res) {
    category.findById(req.params.id, function(err, foundcategory) {
        if (err) {
            console.log(err)
        } else {
            productdb.findById(req.params.id_product, function(err, foundproduct) {
                res.render("product/newcomment", { foundcategory: foundcategory, currentUser: req.params.id, foundproduct: foundproduct })
            })
        }
    })

})

//post new comment
router.post("/campgrounds/category/:id/:id_product/comments", isLoggedIn, function(req, res) {
    //lookup campground using ID
    productdb.findById(req.params.id_product, function(err, product) {
        if (err) {
            console.log(err);
        } else {
            Commentdb.create(req.body.Comment, function(err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    product.comments.push(comment);
                    product.save();
                    console.log(comment);
                    res.redirect("/campgrounds/category/:id");
                }
            })
        }
    })
})

//middleware-IV
function isAdmin(req, res, next) {
    if (req.user.isadmin == 1) {
        return next();
    } else {
        res.redirect("/campgrounds")
    }
}



//middleware-III
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
        productdb.findById(req.params.id_product, function(err, foundproduct) {
            if (err) {
                res.redirect("back")
            } else {
                console.log(foundproduct)
                    //check for the ownership now
                if (foundproduct.author.id.equals(req.user._id) || req.user.isadmin == 1) {
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