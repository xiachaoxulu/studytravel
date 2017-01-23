var port = 3000;

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');


var server = http.createServer(function(request, respose) {

  var pathname = url.parse(request.url).pathname;
  if (pathname == '/') {
    pathname = "/index.html";
  }
  if (pathname == '/ajaxtest') {
    respose.write("cbs('sss')");
    respose.end();
    return;
  }

  pathname = path.join(__dirname, pathname);
  console.log(pathname);
  fs.exists(pathname, function(exist) {

    if (!exist) {
      respose.writeHead(404, {
        'Content-Type': 'text/plain'
      })

      respose.write("this request url " + pathname + " not found");
      respose.end();
    } else {
      var time = 0;
      if (pathname.includes('test.js')) {

        time = 3000;
      }
      if (pathname.includes('test1.js')) {

        time = 10000;
      }
      if(pathname.includes('linktest.css')){
        time = 5000;
      }
      if(pathname.includes('linktest1.css')){
        time = 7000;
      }
      setTimeout(function() {
        fs.readFile(pathname, "binary", function(err, file) {

          if (err) {
            respose.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            respose.end();
          } else {
            var ss='text/html';
            if(time==5000 || time==7000)
            {
              ss='text/css';
            }
            respose.writeHead(200, {
              'Content-Type': ss
            });
            respose.write(file, "binary");
            respose.end();
          }


        });
      }, time);

    }
  });

});
server.listen(port);
console.log("server listen on " + port);
