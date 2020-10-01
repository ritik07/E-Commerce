var mongoose = require('mongoose')

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    quantity: String,
    shopname: String,
    phonenumber: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
    },
    comments: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }

    ],
       comments: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }

    ],
});

module.exports = mongoose.model("Campground", campSchema);
