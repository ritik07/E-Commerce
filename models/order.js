var mongoose = require('mongoose')

var orderSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    address: String,
    landmark: String,
    phonenumber: Number,
    product: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campground",
            name: String,
            image: String,
        },
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
    },
});

module.exports = mongoose.model("Order", orderSchema);