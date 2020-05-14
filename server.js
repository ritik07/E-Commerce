var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require('request'),
    passport = require('passport'),
    methodOverride = require('method-override'),
    LocalStregy = require("passport-local"),
    mongoose = require('mongoose'),
    seed = require('./seed'),
    Comment = require("./models/comment");



User = require("./models/user")
orderproduct = require("./models/order")
campgrounddb = require('./models/campgrounds')
    //mongoose.connect("mongodb://localhost/camp_data");
mongoose.connect("mongodb://ritik:roger007@ecart-shard-00-00-uh6hr.mongodb.net:27017,ecart-shard-00-01-uh6hr.mongodb.net:27017,ecart-shard-00-02-uh6hr.mongodb.net:27017/test?ssl=true&replicaSet=ecart-shard-0&authSource=admin&retryWrites=true&w=majority");

//mongodb+srv://ritik:roger007@ecart-uh6hr.mongodb.net/test?retryWrites=true&w=majority

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})
app.use(function(req, res, next) {
    res.locals.currentorder = req.orderproduct;
    next();
})

var commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/auth"),
    campgroundRoutes = require("./routes/campground"),
    adminRoutes = require('./routes/admin'),
    adressRoutes = require('./routes/address'),
    categoryroutes = require("./routes/category"),
    devilerroutes = require('./routes/deliver'),
    youtuberoutes = require('./routes/youtube');

//seed();

//passport config

app.use(require("express-session")({
    secret: "Anthing here",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStregy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//calling up the routes
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(adressRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(categoryroutes);
app.use(devilerroutes);
app.use(youtuberoutes);



//app.listen(5000, function() {
//  console.log("server started!!");
//})

app.listen(process.env.PORT || 5000)

// var request = require('request');