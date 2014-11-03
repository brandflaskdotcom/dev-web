function update_chart(apiUrl, tag, flag) {

  var category = [ "Boutique", "Casual", "Luxury" , "MultiBrandShop", "top" ];
  var imgurl = "/img/bn-";

  $.getJSON(apiUrl, function() {
    console.log ("Done");
    var stateObj = { state : tag };
    $(".list-title-name").text(tag + " 50");
    history.pushState(stateObj, tag, "/"+tag+"/50");

    if( flag == 0)  {
      $('#chart-item-dynamic').empty();
    }

  if ( $.inArray( tag, category ) > -1 ) {
    imgurl += tag + ".png";
  } else {
    imgurl += "top.png";
  }

    $( "div.list-title").css({'background-image': 'url(' + imgurl + ')'});
  }).done(function(data) {
    $.each( data.Results, function( i, item ) {
      var tagList = item.TagList;
      var rd = item.Brand.RankingDelta * -1;
      var animationInterval = Math.floor(Math.random()*1000);
      //var hash = $.sha1(item.Brand.DisplayName);
      var hash = item.Brand.DisplayName.replace(/ /g, '+');
      var cid = "#ci-" + i;
      if(flag == 0) {
        var odiv = $("<div></div>", { "class": "chart-item clearfix", id: "ci-"+i  }).appendTo("#chart-item-dynamic");
        $("<a></a>",  { href: "/detail/" + item.Brand.IdStr + "/" + hash }).appendTo(odiv);
        var ranking = $("<div></div>", { "class":"chart-item-ranking" }).appendTo(odiv);
        var cover   = $("<div></div>", {"class":"chart-item-cover"}).appendTo(odiv);
        var detail  = $("<div></div>", {"class":"chart-item-detail"}).appendTo(odiv);
        $("<div></div>", { "class":"icon-position"}).addClass(function() {
          if(rd > 0) {
            return "chart-item-rankchange-icon-up";
          } else if(rd < 0) {
            return "chart-item-rankchange-icon-down";
          } else {
            return "chart-item-rankchange-icon-nochange";
          }          
        }).appendTo(ranking);
        $("<span></span>", { "class":"chart-item-rankchange-index" }).append("<p>" + Math.abs(rd) + "</p>").appendTo(ranking); 
        $("<div></div>", {"class":"chart-item-rank", text: (i+1) }).appendTo(ranking); 
        $("<img>", {"class":"triangle", src : "/img/triangle.png"}).appendTo(cover);
        $("<img>", {"class":"cover-img", src : item.Brand.CoverImageUrl }).appendTo(cover);
        $("<span></span>", {"class": "chart-item-detail-category " + tagList[0].toLowerCase() }).
          append("<p>" + tagList[0] + "</p>").appendTo(detail);
        $("<span></span>", {"class": "chart-item-detail-brandname"}).append("<p>" + item.Brand.DisplayName + "</p>").appendTo(detail);
        var list = $("<ul></ul>", { "class": "chart-item-detail-producttag" }).appendTo(detail);
        for (var k in tagList)
        {
          if(k != 0) {
            list.append('<li>' + tagList[k] + '</li>');
          }
        }
        $("<span></span>", {"class": "chart-item-detail-about"}).append("<p>" + item.Brand.About.substring(0, 100) + "</p>").appendTo(detail);
        $("#chart-item-dynamic").children(':last').hide().fadeIn(animationInterval);
      } else {
        $(cid).fadeOut( animationInterval, function() {  
          $("a", this).attr("href", "/detail/" + item.Brand.IdStr + "/" + hash);
          $(this).children(".chart-item-ranking").children().eq(0).removeClass().addClass(function() {
            if(rd > 0) {
              return "icon-position chart-item-rankchange-icon-up";
            } else if(rd < 0) {
              return "icon-position chart-item-rankchange-icon-down";
            } else {
              return "icon-position chart-item-rankchange-icon-nochange";
            }
          });
          $(this).children(".chart-item-ranking").children().eq(1).html("<p>" + Math.abs(rd) + "</p>");
          $(this).children(".chart-item-ranking").children().eq(2).text(i+1);
          $(this).children(".chart-item-cover").children().eq(1).attr("src", item.Brand.CoverImageUrl );
          $(this).children(".chart-item-detail").children().eq(0).removeClass().addClass("chart-item-detail-category " + tagList[0].toLowerCase())
          .html('<p>' + tagList[0] + '</p>');
          $(this).children(".chart-item-detail").children().eq(1).html("<p>" + item.Brand.DisplayName + "</p>");
          $(this).children(".chart-item-detail").children().eq(2).empty();
          for (var k in tagList)
          {
            if(k != 0) {
              $(this).children(".chart-item-detail").children().eq(2).append('<li>' + tagList[k] + '</li>');
            }
          }
          $(this).children(".chart-item-detail").children().eq(3).html("<p>" + item.Brand.About.substring(0, 100) + "</p>");
         }).fadeIn(500);
      }
    });
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
  }).always(function() {
    console.log( "complete" );
  });
}
