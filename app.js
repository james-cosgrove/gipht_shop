var getGif = function() {
  var gif = $('#search').val();
  var settings = {
    url: 'http://api.giphy.com/v1/gifs/search?q=&api_key=dc6zaTOxFJmzC ',
    method: 'get',
    dataType: 'json',
    data: { q: gif }
  }

  $.ajax(settings).done(function(response) {
    $('.gif').remove();
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

$('button').on('click', getGif);
