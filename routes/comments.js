var express = require('express');
var router = express.Router({ mergeParams: true });
var campgrounddb = require("../models/campgrounds");
var Comment = require("../models/comment");

//==============
//Comment Routes
//=============

router.get("/new", isLoggedIn, function(req, res) {
        campgrounddb.findById(req.params.id, function(err, work) {
            if (err) {
                console.log(err)
            } else {
                res.render("comments/new", { work: work, currentUser: req.user })
            }
        })


    })
    //==============
    //Comment Routes (POST)
    //=============
router.post("/", isLoggedIn, function(req, res) {
    //lookup campground using ID
    campgrounddb.findById(req.params.id, function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                Comment.create(req.body.Comment, function(err, comment) {
                    if (err) {
                        console.log(err)
                    } else {
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        console.log(comment);
                        res.redirect("/campgrounds/" + campground._id);
                    }
                })
            }
        })
        //create new comment
        //connect new comment to campground
        //redirect it to the comment page
})

//======
//EDIT COMMENTS
//=====
router.get('/:comment_id/edit', checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    })

})

//UPDATE-COMMENT
router.put("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.Comment, function(err, updatedCommnet) {
        if (err) {
            console.log(err)
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//======
//COMMENT DESTORY
//=====
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, removed) {
        if (err) {
            console.log(err)
            res.render("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//MIDDLEWARE-I
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login")
    }
}
//MIDDLEWARE-II
function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back")
            } else {
                //check for the ownership now
                if (foundComment.author.id.equals(req.user._id) || req.user.isadmin == 1) {
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

module.exports = router;