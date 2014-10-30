function init_buttons(category) 
{
  $( "#nav_top50" ).click(function() {
    var apiUrl = '/api/v1/get/top/50';
    update_chart(apiUrl, "top", 1);
  });

  $( "#nav_luxury" ).click(function() {
    var apiUrl = '/api/v1/get/' + category[2] + '/50';
    update_chart(apiUrl, category[2], 1);
  });

  $( "#nav_casual" ).click(function() {
    var apiUrl = '/api/v1/get/' + category[1] + '/50';
    update_chart(apiUrl, category[1], 1);
  });

  $( "#nav_boutique" ).click(function() {
    var apiUrl = '/api/v1/get/' + category[0] + '/50';
    update_chart(apiUrl, category[0], 1);
  });

  $( "#nav_mbs" ).click(function() {
    var apiUrl = '/api/v1/get/' + category[3] + '/50';
    update_chart(apiUrl, category[3], 1);
  });
}
