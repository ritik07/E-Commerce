var request = require('request');

request('https://corona.lmao.ninja/all', function(error, response, body) {

    if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        console.log(parsedData["cases"]);
    } else(
        console.log(error)
    )

})