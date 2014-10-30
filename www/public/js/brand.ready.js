function update_chart(obj_array, brand_id) {	
  var api = '/api/v1/stat/' + brand_id;
  $.getJSON(api, function() {
      console.log ("Done");
  }).done(function(data) {
    if(data == null)
    {
      return;
    }
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
      FB.init({
        appId: '1380374468852725',
      });     
      $('#loginbutton,#feedbutton').removeAttr('disabled');
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          console.log('Logged in.');
          /* make the API call */
            obj_array.forEach(function(id) {
            var fbApi = "/"+ id;
              FB.api(
                fbApi,
                function (response) {
                  if (response && !response.error) {
                    /* handle the result */
                    //console.log(response.source);
                    $("<img>", { src : response.source }).appendTo("#main-brand-content-photos");
                  } else {
                    console.log("fail to load photo");
                  }
                }
              ); 
          });
        }
        else {
          FB.login();
        } 
      });
    });
    $.each( data.RankUps, function( i, item ) {
        var tagList = item.TagList;
        for (var k in tagList)
        {
          if(k != 0) {
            $( "#brand-tags").append('<li><a href="#">' + tagList[k] + '</a></li>');
          }
        }
        $( "div.brand-info-name" ).text(item.Brand.DisplayName);
        $( "#main-brand").css('background-image', 'url(' + item.Brand.CoverImageUrl + ')');
        $( "#main-brand-content-list-ranking").text(item.Brand.Ranking);
        $( "#main-brand-content-list-score").text(Math.round(item.Brand.Score));
        $( "span.popular-city").text(item.Brand.Location);
        $( "span.category").text(item.TagList[0]);
        $( "#shopboblink").prop("href", item.Brand.ShopbopLink);
        $( "#giltlink").prop("href", item.Brand.GiltLink);
        $( "div.main-brand-content-chart-item-rank" ).text(item.Brand.Ranking);
        $( "div.main-brnad-content-chart-item-detail-about" ).text(item.Brand.About);
        $( "span.ranking-change-index" ).text(item.RankingChange);
        $( "span.found-year").text(item.Brand.YearFounded);
        if(item.Brand.RankingDelta > 0) {
          $( "#chart-item-rankchange-icon").addClass("chart-item-rankchange-icon-down main-brand-content-list-ranking-position");
        } else if(item.Brand.RankingDelta < 0) {
          $( "#chart-item-rankchange-icon").addClass("chart-item-rankchange-icon-up main-brand-content-list-ranking-position");
        } else {
          $( "#chart-item-rankchange-icon").addClass("chart-item-rankchange-icon-nochange main-brand-content-list-ranking-position");
        }
      });
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
}
