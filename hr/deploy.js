var fs = require('fs');
var needle = require('needle');
// var receiver = 'http://103.37.157.50:8999/receiver'; // 演示服务器
var receiver = 'http://10.0.10.6:8999/receiver';  // 测试服务器
var savePath = 'D:/tomcat/tomcat1/webapps/Facade-APP';
var scanPath = './dist';


// 扫描所有文件
var files = []
var filesCount = 0;
function scanDir(dir,fileList,callback,scanSubDir){

    var count = 0;
    var saveSubPath = dir.replace(scanPath,'');

    return function(){

        fs.readdir(dir, function(err, files) {
            console.log('开始扫描目录————'+dir);

            if (!files.length) {
                return console.log('扫描结束————'+dir+'目录没有文件');
            }

            files.forEach(function(f,index){


                fs.stat(dir+'/'+f, function (err, stats) {

                    if(err){
                        console.log('————————————扫描'+dir+'/'+f+'时报错：'+err)
                        return;
                    }

                    if(stats.isFile()){
                        fileList.push({
                            fileName: scanSubDir ? saveSubPath+'/'+f : '/'+f,
                            filePath:dir+'/'+f
                        });
                        console.log('扫描到文件————'+dir+'/'+f)

                        count++;

                        // TODO 不准确
                        if(index==files.length-1){
                            console.log('扫描完成————'+dir+'/共扫描到'+count+'个文件')
                            callback();
                        }


                    }else{
                        console.log('扫描到目录————'+dir+'/'+f);

                        scanDir(dir+'/'+f,fileList,callback,true)
                    }


                })

            })

        })
    }();

}


// 上传文件
function uploadFile(fileName,filePath,callback){
    var data = {
        to: savePath+fileName,
        file: {
            file:filePath,
            content_type: 'application/octet-stream'
        }
    }

    needle.post(receiver, data, { multipart: true }, function(err, resp, body) {
        if(!err){
            console.log('已上传文件————'+data.to)
            callback();
        }else{
            console.log(err)
        }
    });
}


function startUpload(){

    var file = files.shift();

    if(file){
        uploadFile(file.fileName,file.filePath,startUpload);
    }else{
        console.log('全部上传完毕，共计上传'+filesCount+'个文件')
    }

}


// 开始扫描，上传
scanDir(scanPath,files,function(){

    filesCount = files.length;

    console.log('————————扫描完毕，开始上传————————')
    startUpload();
});
