var express = require('express');
var path = require('path');
var app = express();

const PORT = 3000;

app.set('views', './');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}`);
});
