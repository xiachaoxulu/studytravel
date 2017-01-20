var fs = require("fs");
var path = require('path');
var reg = /([\u4e00-\u9fa5]+).*?(\d+)/gim;
var fileFilter = /\\users.dat$/;
var location = 'C:\\Users\\xiachao\\Desktop\\tt';
var targetLocation = 'C:\\Users\\xiachao\\Desktop\\result.txt';

var allFiles = [];
var users = [];

function scanFiles(location) {
  var files = fs.readdirSync(location);
  files.forEach(function(f) {
    var fname = location + path.sep + f;
    var stat = fs.lstatSync(fname);
    if (stat.isDirectory()) {
      scanFiles(fname);
    } else {
      if (fs.existsSync(fname)) {
        if (fileFilter.test(fname)) {
          allFiles.push(fname);
          console.log('add:' + fname);
        }
      } else {
        console.log('pass:' + fname);
      }
    }
  })
}

function read(ex) {
  var len = allFiles.length;
  if (len > 0) {
    allFiles.forEach(function(stat, index) {
      console.log("开始读取第:" + index + ",共" + len + "文件");
      var data = fs.readFileSync(stat, "utf-8");
      // data = data.replace(/\s/g, '');
      var result;
      var storeName = stat.replace(/.*?([\u4e00-\u9fa5]+).*/g, '$1');
      console.log(storeName)
      while ((result = ex.exec(data)) != null) {
        users.push({
          storeName: storeName,
          name: result[1],
          pin: result[2]
        })
      }
      console.log("读取第:" + index + "完成");
    })
  } else {
    console.log("文件列表中没有文件");
  }
}

function write() {
  console.log(users)
  var chunks = [];
  var length = 0;
  for (var i = 0, size = users.length; i < size; i++) {
    var record = users[i];
    var storeName = record['storeName'];
    var name = record['name'];
    var pin = record['pin'];

    var value = storeName + ',' + name + ',' + pin + "\r\n";
    var buffer = new Buffer(value);
    chunks.push(buffer);
    length += buffer.length;
  }
  var resultBuffer = new Buffer(length);
  for (var i = 0, size = chunks.length, pos = 0; i < size; i++) {
    chunks[i].copy(resultBuffer, pos);
    pos += chunks[i].length;
  }
  fs.writeFile(targetLocation, resultBuffer, function(err) {
    if (err) throw err;
    console.log('write JSON into TEXT');
  });
}

scanFiles(location);
read(reg);
write();
