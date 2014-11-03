var fb = require('./fb.js');
var express = require('express');
var router = express.Router();
var request = require("request")

router.param('hash', function(req,res, next, hash){
  var db = req.db;
  db.collection('imgobj').find({uid: hash}).limit(10).toArray(function(err, result) {
    if (err) throw err;
    req.imglist = result;
    //console.log(result);
    next();
  });
});

router.param('bname', function(req,res, next, bname){
  var db = req.db;
  //console.log(bname);
  var brand_name = bname.replace(/\+/g, ' ');
  console.log(brand_name);
  db.collection('imgobj').find({name: brand_name}).limit(10).toArray(function(err, result) {
    if (err) throw err;
    req.imglist = result;
    req.bname = brand_name;
    //console.log(result);
    next();
  });
});

router.param('id', function(req,res, next, id){
  req.bid = id;
  //console.log(id);
  next();
});

router.param('tag', function(req,res, next, tag){
  req.tag = tag;
  //console.log(tag);
  next();
});

router.param('limit', function(req,res, next, limit){
  req.limit = limit;
  //console.log(limit);
  next();
});

router.param('bid', function(req,res, next, bid){
  req.bid = bid;
  //console.log(bid);
  next();
});

router.param('ecode', function(req,res, next, ecode){
  req.ecode = ecode;
  //console.log(bid);
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { default_tag: 'top', limit: '50' });
});

router.get('/:tag/:limit', function(req, res) {
  res.render('index', { default_tag: req.tag , limit: req.limit });
});

/* GET users listing. */
router.get('/api/v1/update', function(req, res) {
  //fb.update_db(req.db);
});

router.get('/api/v1/get/:hash', function(req, res) {
    res.json({ data: req.imglist });
});

router.get('/api/v1/get/:tag/:limit', function(req, res, next) {
    var url = "http://localhost:8080/?format=json&num=" + req.limit;
//    console.log(req.tag);
    if(req.tag != "top") {
      url = url + "&tag="+ req.tag;
    }
    console.log(url);
    request({
      uri: url,
      json: true,
      timeout: 2000
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body) // Print the json response
          console.log("json returned");
          res.json(body);
        } else {
          console.error('request failed:',error);
        }
     })
});

router.get('/api/v1/stat/:bid', function(req, res, next) {
    var url = "http://localhost:8080/view/"+ req.bid + "?format=json";
    console.log(url);
    request({
      url: url,
      json: true,
      timeout: 2000
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
//          console.log(body) // Print the json response
          res.json(body);
        } else {
          console.error('request failed:',error);
        }
     })
});

router.get('/detail/:id/:bname', function(req, res) {
//    console.log(req.imglist);
    res.render('brand', { brand_id: req.bid ,brand_name:req.bname ,srclist: req.imglist } );
});

module.exports = router;
