var express = require('express');
var router = express.Router(),
    request = require('request'),
    bodyParser = require("body-parser");


router.get("/youtube", function(req, res) {
    request('https://www.googleapis.com/youtube/v3/playlists', function(error, response, body, channelId) {

        if (!error && response.statusCode == 200) {
            channelId = "UCd3O7pbNiGmAkq1lCpkFP7A";
            var parsedData = JSON.parse(body);
            console.log(parsedData);
            var tc = parsedData["UCd3O7pbNiGmAkq1lCpkFP7A"]
            console.log(tc)
            res.send("hey");
        } else(
            console.log("err is " + error)
        )

    });
})


module.exports = router;