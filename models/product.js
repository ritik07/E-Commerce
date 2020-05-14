var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    quantity: String,
    shopname: String,
    phonenumber: String,
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category"
        }
    },
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
});

module.exports = mongoose.model("product", productSchema);