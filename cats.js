var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/cat_app")


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    termerpent: String,
});


var Cat = mongoose.model("Cat", catSchema);

//ading cat to database

// var george = new Cat({
//     name: "george",
//     age: 11,
//     termerpent: "grouchy"
// });

// george.save(function(err, cat) {
//     if (err) {
//         console.log("something went wrong!")
//     } else {
//         console.log("we just saved a cat to the database");
//         console.log(cat);
//     }
// });
Cat.create({
        name: "cat errror",
        age: 101,
        //      termerpent: "gogom"
    }, function(err, newcat) {
        if (err) {
            console.log("OPPS ERROR OCCURED");
            console.log(err);
        } else {
            console.log("New Cat Added");
            console.log(newcat);
        }
    })
    // retriving data from the database

Cat.find({}, function(err, cats) {
    if (err) {
        console.log("OH NO ERROR!!");
        console.log(err);
    } else {
        console.log("all cats------");
        console.log(cats);
    }
})