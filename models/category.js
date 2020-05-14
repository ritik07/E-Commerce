var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    name: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
    }
})

module.exports = mongoose.model("category", categorySchema);