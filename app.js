
var count = 0;

var trendingGifs = function() {
  var settings = {
    url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
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
      url: 'http://api.giphy.com/v1/gifs/search?q=&api_key=dc6zaTOxFJmzC&limit=12&offset=0',
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
    url: 'http://api.giphy.com/v1/gifs/search?q=&api_key=dc6zaTOxFJmzC&limit=12&offset=' + count,
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

// event listener
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

// fixes header to top of screen on scroll
$(window).scroll(function () {
  var distanceY = window.pageYOffset || document.documentElement.scrollTop;
  var distanceZ = 35;
  if (distanceY > distanceZ) {
    $('header').addClass("affix");
    $('#list').addClass("list-scroll");
  } else {
    $('header').hasClass("affix");
    $('header').removeClass("affix");
    $('#list').hasClass("list-scroll");
    $('#list').removeClass("list-scroll");
  }
});
