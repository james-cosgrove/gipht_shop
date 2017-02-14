
var count = 0;

var trendingGifs = function() {
  var settings = {
    url: 'https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
    method: 'get',
    dataType: 'json',
  }

  $.ajax(settings).done(function(response) {
    var gifs = response.data;
    _.each(gifs, function(gif) {
      var html = Handlebars.templates.gif({
        embed: gif.embed_url,
        link: gif.bitly_gif_url
      });
      $('#list').append(html);
    });
  });
};

var gifSearch = function() {
  var gif = $('#search').val();
  if (gif !== '') {
    var settings = {
      url: 'https://api.giphy.com/v1/gifs/search?q=&api_key=dc6zaTOxFJmzC&limit=12&offset=0',
      method: 'get',
      dataType: 'json',
      data: { q: gif }
    }

    $.ajax(settings).done(function(response) {
      var gifs = response.data;
      count = gifs.length;
      $('#list').empty();
      var gifs = response.data;
      _.each(gifs, function(gif) {
        var html = Handlebars.templates.gif({
          embed: gif.embed_url,
          link: gif.bitly_gif_url
        });
        $('#list').append(html);
      });
    });
  };
};

var getMore = function() {
  var gif = $('#search').val();
  var settings = {
    url: 'https://api.giphy.com/v1/gifs/search?q=&api_key=dc6zaTOxFJmzC&limit=12&offset=' + count,
    method: 'get',
    dataType: 'json',
    data: { q: gif }
  }

  $.ajax(settings).done(function(response) {
    var gifs = response.data;
    count = (count + gifs.length);
    _.each(gifs, function(gif) {
      var html = Handlebars.templates.gif({
        embed: gif.embed_url,
        link: gif.bitly_gif_url
      });
      $('#list').append(html);
    });
  });

};

// event listeners
window.onload = trendingGifs();
$('body').on('scroll', getMore);
$('button').on('click', gifSearch);
$('#search').keypress(function(e) {
    if(e.which == 13) {
      gifSearch();
    }
});
$(window).scroll(function () {
   if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
      getMore();
   }
});

// fixes header to top of screen on scroll and add's class's to header and h1 to enable shrinking header on scroll
$(window).scroll(function () {
  var distanceX = window.pageYOffset || document.documentElement.scrollTop;
  var distanceY = 120;
  if (distanceX > distanceY) {
    $('header').addClass("shrink");
  } else {
    $('header').hasClass("shrink");
    $('header').removeClass("shrink");
  }
});
