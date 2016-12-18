var port = 3000;

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
 

var server = http.createServer(function(request, respose) {

  var pathname = url.parse(request.url).pathname;
  if(pathname=='/'){
  	pathname="/index.html";
  }
  pathname=path.join(__dirname,pathname);
  console.log(pathname);
  fs.exists(pathname, function(exist) {

    if (!exist) {
      respose.writeHead(404, {
        'Content-Type': 'text/plain'
      })

      respose.write("this request url " + pathname + " not found");
      respose.end();
    } else {
      fs.readFile(pathname, "binary", function(err, file) {

        if (err) {
          respose.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          respose.end();
        } else {

          respose.writeHead(200, {
            'Content-Type': 'text/html'
          });
          respose.write(file, "binary");
          respose.end();
        }


      });
    }
  });

});
server.listen(port);
console.log("server listen on " + port);
