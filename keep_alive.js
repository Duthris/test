var http = require('http');

http.createServer(function (req, res){
  res.write("Yardımcı Maymun is now Online!");
  res.end();
}).listen(8080);