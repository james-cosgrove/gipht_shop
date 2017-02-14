var express = require('express');
var path = require('path');
var server = express();

// const PORT = 3000;
var port_number = server.listen(process.env.PORT || 3000);

server.set('views', './');
server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname, './')));

server.get('/', function(request, response) {
  response.render('index');
});

// server.listen(PORT, function() {
//   console.log(`Example app listening on port ${PORT}`);
// });

server.listen(port_number);
