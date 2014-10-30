var mongo = require('mongoskin');
var HashTable = require('hashtable');
var FB = require('fb');
var sha1 = require('sha1');
var url = require('url');
var sleep = require('sleep');

var db = mongo.db('mongodb://localhost:27017/brandflask');

var hashtable = new HashTable();

var totalItemLeft = 0;

function callback (c, key, value) {
  console.log(key);
}

function create_object_node(key, value) {
    var fbApi = "/" + key;
    FB.api(fbApi,
      { fields: ['object_id'] },
      function (res) {
        if(!res || res.error) {
         console.log(!res ? 'error occurred' : res.error);
         return;
        }
        var hash = sha1(value);
        db.collection('imgobj').insert( { name: value, objid: res.object_id, uid: hash }, function(err, result) {
          totalItemLeft--;
          if (err) throw err;
          //if (result) console.log(result);
          if(totalItemLeft <= 0) {
            console.log("done");
          }
        });
    });
}

function get_all_feed(access_token, next) {
    var fbApi = "/100006328603377/feed";
    if(next > 0) {
      FB.api(fbApi,
      { fields: ['id','shares', 'properties', 'type'], until:next },
        function (res) {
          if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
          }
          console.log(res.data.length);
          if(res.data.length == 0) {
            db.close();
            return;
          }
          totalItemLeft = res.data.length;
          res.data.forEach(function(entry) {
            console.log(entry.properties);
            if(entry.type == "photo") {
              create_object_node(entry.id, entry.properties[0].text);
            }
          });
          sleep.sleep(30);
          console.log(res.paging.next);
          var next = url.parse(res.paging.next, true);
          get_all_feed(access_token, next.query.until);
      });
    } else {
      FB.api(fbApi,
      { fields: ['id','shares', 'properties', 'type' ] },
        function (res) {
          if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
          }
          console.log(res.data.length);
          totalItemLeft = res.data.length;
          if(res.data.length == 0) {
            db.close();
            return;
          }
          res.data.forEach(function(entry) {
            console.log(entry.properties);
            if(entry.type == "photo") {
              create_object_node(entry.id, entry.properties[0].text);
            }
          });
          sleep.sleep(15);
          console.log(res.paging.next);
          var next = url.parse(res.paging.next, true);
          get_all_feed(access_token, next.query.until);
      });
    }
}

FB.api('oauth/access_token', {
    client_id: '1380374468852725',
    client_secret: 'a225175481f26632b1b2847bd7ed828b',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    var accessToken = res.access_token;
    console.log(accessToken);
    FB.setAccessToken(accessToken);
    get_all_feed(accessToken, 0);
    return;
});
