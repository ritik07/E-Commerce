var mongoose = require('mongoose')
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment")
    //kr 
var data = [

    {
        name: "roger",
        image: "https://organicexpressmart.com/media/image/268/organic-khapali-wheat-whole-1-kg.jpg",
        description: "describe here",
        price: "100",
        quantity: "1 kg",
    },
    {
        name: "roger",
        image: "https://organicexpressmart.com/media/image/268/organic-khapali-wheat-whole-1-kg.jpg",
        description: "describe here",
        price: "100",
        quantity: "1 kg",
    },
    {
        name: "roger",
        image: "https://organicexpressmart.com/media/image/268/organic-khapali-wheat-whole-1-kg.jpg",
        description: "describe here",
        price: "100",
        quantity: "1 kg",
    },
]

function seedDB() {
    //remove all campgrouns     
    Campground.remove({}, function(err) {
        if (err) {
            console.log("error");
        }
        console.log("removed");
        // add new campground
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, Campground) {
        //         if (err) {
        //             console.log("error");
        //         }
        //         console.log("added data");
        //         // create comments 
        //         Comment.create({
        //                 text: "hello this is comments",
        //                 author: "vectoroso"
        //             },
        //             function(err, comment) {
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     Campground.comments.push(comment);
        //                     Campground.save();
        //                     console.log("comments addded");
        //                 }
        //             }
        //         );
        //     });
        // });

    });


}



module.exports = seedDB;