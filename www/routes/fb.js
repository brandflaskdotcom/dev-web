var mongo = require('mongoskin');
var FB = require('fb');
var sha1 = require('sha1');

var totalItemLeft = 0;

function create_object_node(db, key, value) {
    var fbApi = "/" + key;;
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
          if (result) console.log('Added!');
          if(totalItemLeft <= 0) {
            console.log("done");
          }
        });
    });
}

function get_all_feed(db, access_token) {
    var fbApi = "/100006328603377/feed";
    FB.api(fbApi,
    { fields: ['id','shares', 'properties'], limit:100 },
      function (res) {
        if(!res || res.error) {
         console.log(!res ? 'error occurred' : res.error);
         return;
        }
        console.log(res.data.length);
        totalItemLeft = res.data.length;
        res.data.forEach(function(entry) {
          create_object_node(db, entry.id, entry.properties[0].text);
        });
    });
}

module.exports = {
  update_db: function (db) {
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
        get_all_feed(db, accessToken);
        return;
    });
  }
}
