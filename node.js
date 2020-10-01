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

//calling up the routes
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(adressRoutes);
app.use(authRoutes);
app.use(adminRoutes);

//calling up the routes
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(adressRoutes);
app.use(authRoutes);
app.use(adminRoutes);



User = require("./models/user")
campgrounddb = require('./models/campgrounds')
mongoose.connect("mongodb://localhost/camp_data");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

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



app.listen(5000, function() {
    console.log("server started!!");
})


// var request = require('request');
