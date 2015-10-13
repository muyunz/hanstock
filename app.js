var express = require('express');

var app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {

    res.render('index.html');

});

app.listen(80, '128.199.203.121')
