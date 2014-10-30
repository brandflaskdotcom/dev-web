var express = require('express');
var router = express.Router();

router.param('hash', function(req,res, next, hash){
  var db = req.db;
  db.collection('imgobj').find({uid: hash}).limit(10).toArray(function(err, result) {
    if (err) throw err;
    req.imglist = result;
    console.log(result);
  });
  next();
});

router.param('id', function(req,res, next, id){
  req.bid = id;
  console.log(id);
  next();
});

/* GET users listing. */
router.get('/detail//:id/:hash', function(req, res) {
  res.render('brand', { brand_id: req.bid ,srclist: req.imglist } );
});

module.exports = router;
