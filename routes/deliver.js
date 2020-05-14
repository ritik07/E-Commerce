var express = require('express');
var router = express.Router();
var productdb = require("../models/product");
var order = require("../models/order");

router.use(function(req, res, next) {
    res.locals.currentorder = req.orderproduct;
    next();
})

router.get("/deliverystatus", isDeliveryBoy, function(req, res) {
    order.find({}, function(err, foundorders) {
        if (err) {
            console.log(err)
        } else {
            res.render("deliver/deliver", { foundorders: foundorders, currentUser: req.user })
        }
    })
})

//change boolean "isdelivered" : false,  to "isdelivered" : true, 

router.post("/deliverystatusdelivered", isDeliveryBoy, function(req, res) {
    const id = req.body.id;
    order.findById(id, function(err, foundid) {
        if (err) {
            console.log(err)
        } else {
            foundid.isdelivered = 1;
            foundid.save()
            console.log(foundid)
            res.redirect('/deliverystatus')
        }
    })

})

router.post("/deliverystatusrejected", isDeliveryBoy, function(req, res) {
    const id = req.body.id;
    order.findById(id, function(err, foundid) {
        if (err) {
            console.log(err)
        } else {
            foundid.isrejected = 1;
            foundid.save()
            console.log(foundid)
            res.redirect('/deliverystatus')
        }
    })

})

router.post("/deliverystatusaccepted", isDeliveryBoy, function(req, res) {
    const id = req.body.id;
    order.findById(id, function(err, foundid) {
        if (err) {
            console.log(err)
        } else {
            foundid.isaccepted = 1;
            foundid.save()
            console.log(foundid)
            res.redirect('/deliverystatus')
        }
    })

})

//middleware-I 
function isDeliveryBoy(req, res, next) {
    if (req.user.isdboy == 1 || req.user.isadmin == 1) {
        return next();
    } else {
        res.redirect("/campgrounds")
    }
}

module.exports = router;