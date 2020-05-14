var mongoose = require('mongoose')

var orderSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    address: String,
    landmark: String,
    phonenumber: Number,
    product: [

        {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "Campground",
            name: String,
            image: String,
            price: String,
            shopname: String,
            phonenumber: String,
            author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user"
                },
                username: String,
            }
        },
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
    },
    ///deliver side status
    isaccepted: { type: Boolean, default: 0 },
    isdelivered: { type: Boolean, default: 0 },
    isrejected: { type: Boolean, default: 0 },
    isoutofdelivery: { type: Boolean, default: 0 }
});

module.exports = mongoose.model("Order", orderSchema);