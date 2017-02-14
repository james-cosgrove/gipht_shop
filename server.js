var app = require('express')();

const PORT = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.post('/', function(request, response) {
  response.render('index');
});

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}`);
});
