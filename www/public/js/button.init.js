function update_global_state(category)
{
  var imgurl = "/img/bn-";
  var stateObj = { state : category };
  $(".list-title-name").text(category + " 50");
  history.pushState(stateObj, category, "/"+ category +"/50");

  if ( category == "" ) {
    imgurl += "top.png";
  } else {
    imgurl += category + ".png";
  }

  if( category == "" || category == "top") {
    category = "Top";
  }
  $( "#active-tag").text(category + " 50 all");
  $( "div.list-title").css({'background-image': 'url(' + imgurl + ')'});
}

function init_buttons(category) 
{
  $( "#nav_top50" ).click(function() {
    var apiUrl = '/api/v1/get/top/50';
    $("a.nav-selected").removeClass("nav-selected");
    if(!$(this).hasClass("nav-selected")) {
      $(this).addClass("nav-selected");
    }
    update_global_state("top");
    update_chart(apiUrl, "top", 1);
  });

  $( "#nav_luxury" ).click(function() {
    var apiUrl = '/api/v1/get/' + category[2] + '/50';
    $("a.nav-selected").removeClass("nav-selected");
    if(!$(this).hasClass("nav-selected")) {
      $(this).addClass("nav-selected");
    }
    update_global_state(category[2]);
    update_chart(apiUrl, category[2], 1);
  });

  $( "#nav_casual" ).click(function() {
    var apiUrl = '/api/v1/get/' + category[1] + '/50';
    $("a.nav-selected").removeClass("nav-selected");
    if(!$(this).hasClass("nav-selected")) {
      $(this).addClass("nav-selected");
    }
    update_global_state(category[1]);
    update_chart(apiUrl, category[1], 1);
  });

  $( "#nav_boutique" ).click(function() {
    var apiUrl = '/api/v1/get/' + category[0] + '/50';
    $("a.nav-selected").removeClass("nav-selected");
    if(!$(this).hasClass("nav-selected")) {
      $(this).addClass("nav-selected");
    }
    update_global_state(category[0]);
    update_chart(apiUrl, category[0], 1);
  });

  $( "#nav_mbs" ).click(function() {
    var apiUrl = '/api/v1/get/' + category[3] + '/50';
    $("a.nav-selected").removeClass("nav-selected");
    if(!$(this).hasClass("nav-selected")) {
      $(this).addClass("nav-selected");
    }
    update_global_state(category[3]);
    update_chart(apiUrl, category[3], 1);
  });

  $( "a.nav_bytag" ).click(function() {
    var category = $( "#active-tag").text();
    var splitarray = category.split(" ");
    var thistext = $(this).text();
    var tag;
    if(thistext == "Active") {
      thistext+= "AndOutdoor";
    }
    if(splitarray[0] != "Top") { 
      tag = splitarray[0] + "%2C" + thistext;
    } else {
      tag = thistext;
    }
    var apiUrl = '/api/v1/get/' + tag + '/50';
    console.log(tag);
    update_chart(apiUrl, tag, 1);
  });
}
