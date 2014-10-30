var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require('url');
var swig  = require('swig');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/brandflask');

var tpl = swig.compileFile('./public/brand.html');

function requestHandler(req, res) {
    var thisreq = url.parse(req.url, true);
//    console.log(thisreq);
    var fileName;
    if(!path.basename(req.url)) {
      fileName = 'index.html';
    } else {
      if(thisreq.search == '') {
        fileName = thisreq.pathname;
      } else {
        db.collection('imgobj').find({uid: thisreq.query.name}).limit(10).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          db.close();
          var x = tpl({ brand_id: thisreq.query.id ,srclist: result });
//          console.log(x);
          res.end(x);
          return;
        });
        return;
      }
    }
    var localFolder = __dirname + '/public/';
    var page404 = localFolder + '404.html';
    //call our helper function
    //pass in the path to the file we want,
    //the response object, and the 404 page path
    //in case the requestd file is not found
    getFile((localFolder + fileName),res,page404);
}

//helper function handles file verification
function getFile(filePath,res,page404){
    //does the requested file exist?
    //console.log(filePath);
    fs.exists(filePath,function(exists){
        //if it does...
        if(exists){
            //read the file, run the anonymous function
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    //if there was no error
                    //send the contents with the default 200/ok header
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        } else {
            //if the requested file was not found
            //serve-up our custom 404 page
            fs.readFile(page404,function(err,contents){
                //if there was no error
                if(!err){
                    //send the contents with a 404/not found header
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        };
    });
}

var server = http.createServer(requestHandler);

server.listen(80);
console.log("Server is listening");
