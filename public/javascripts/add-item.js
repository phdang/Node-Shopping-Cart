$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd'
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  }
});
$('.add-cart').on('click', function(event) {
  const $img = event.target.parentNode.parentNode.parentNode.childNodes[1];
  const messageAppended = document.getElementById('message-appended');
  $($img).addClass('animated zoomOutUp');
  if (messageAppended) {
    $('#message-appended').remove();
  }
  $(event.target.parentNode.parentNode.parentNode).append(
    '<div id="message-appended" class="alert alert-success">Item added</div>'
  );
  $('#message-appended').fadeOut(3000);
  $($img).animateCss('zoomOutUp', function() {
    $($img).removeClass('animated zoomOutUp');
  });
  event.preventDefault();
});
