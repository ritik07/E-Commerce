var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isadmin: { type: Boolean, default: 0 },
    ismanufacture: { type: Boolean, default: 0 },
    isdboy: { type: Boolean, default: 0 }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);