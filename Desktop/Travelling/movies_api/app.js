const { response } = require('express');
var express = require('express');
var app = express();
var request = require('request');

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});

app.get('/results', (req, res) => {
    var keyword = req.query.keyword; 
    request("http://www.omdbapi.com/?s="+ keyword +"&apikey=thewdb", (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            console.log(parsedData["Search"]);
            res.render("result", { data: parsedData });
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running!!");
})