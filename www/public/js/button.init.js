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

  $( "#nav_clothing" ).click(function() {
    var apiUrl = '/api/v1/get/Clothing/50';
    update_chart(apiUrl, "Clothing", 1);
  });

  $( "#nav_denim" ).click(function() {
    var apiUrl = '/api/v1/get/Denim/50';
    update_chart(apiUrl, "Denim", 1);
  });

  $( "#nav_bags" ).click(function() {
    var apiUrl = '/api/v1/get/Bags/50';
    update_chart(apiUrl, "Bags", 1);
  });

  $( "#nav_shoes" ).click(function() {
    var apiUrl = '/api/v1/get/Shoes/50';
    update_chart(apiUrl, "Shoes", 1);
  });

  $( "#nav_active" ).click(function() {
    var apiUrl = '/api/v1/get/ActiveAndOutdoor/50';
    update_chart(apiUrl, "Active", 1);
  });

  $( "#nav_bridal" ).click(function() {
    var apiUrl = '/api/v1/get/Bridal/50';
    update_chart(apiUrl, "Bridal", 1);
  });

  $( "#nav_underwear" ).click(function() {
    var apiUrl = '/api/v1/get/Underwear/50';
    update_chart(apiUrl, "Underwear", 1);
  });

  $( "#nav_swim" ).click(function() {
    var apiUrl = '/api/v1/get/Swim/50';
    update_chart(apiUrl, "Swim", 1);
  });

  $( "#nav_maternity" ).click(function() {
    var apiUrl = '/api/v1/get/Maternity/50';
    update_chart(apiUrl, "Maternity", 1);
  });

   $( "#nav_gilt" ).click(function() {
    var apiUrl = '/api/v1/get/Gilt/50';
    update_chart(apiUrl, "Gilt", 1);
  });

  $( "#nav_shopbop" ).click(function() {
    var apiUrl = '/api/v1/get/Shopbop/50';
    update_chart(apiUrl, "Shopbop", 1);
  });

  $( "#nav_nm" ).click(function() {
    var apiUrl = '/api/v1/get/Neiman Marcus/50';
    update_chart(apiUrl, "Neiman Marcus", 1);
  });

  $( "#nav_nap" ).click(function() {
    var apiUrl = '/api/v1/get/Net-a-Porter/50';
    update_chart(apiUrl, "Net-a-Porter", 1);
  });
}
