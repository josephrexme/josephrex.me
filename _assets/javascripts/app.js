//
// Sprockets Includes
//
//= require vendor/jquery/dist/jquery
//= require vendor/barba.min
//= require vendor/jquery.scrollex.min
//
//

// http://dustindiaz.com/smallest-domready-ever
function ready(cb) {
  /in/.test(document.readyState) // in = loadINg
    ? setTimeout(ready.bind(null, cb), 9)
    : cb();
}
ready(function(){
  // Page transitions
  Barba.Pjax.start();
  var pageTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([this.newContainerLoading, this.exit()])
      .then(this.reveal.bind(this))
    },
    exit: function() {
      return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },
    reveal: function() {
      var _this = this;
      var newPage = $(this.newContainer);
      document.body.scrollTop = 0;
      $(this.oldContainer).hide();
      newPage.css({ visibility: 'visible', opacity: 0 });
      newPage.animate({ opacity: 1 }, 300, function() {
        _this.done();
      });
    }
  });
  Barba.Pjax.getTransition = function() {
    return pageTransition;
  };
});


// Barba Pjax Page Load Listener
Barba.Dispatcher.on('transitionCompleted', function() {
  // Animate Header contents
  $('.header__title').scrollex({
    initialize: function() {
      $(this).css('opacity', 1);
      $('.header__description').css('opacity', 1);
      $('.logo').css({'transform': 'scale(1)', 'opacity': '1'});
    },
  });
  // Scroll to top
  var topBtn = document.querySelector('.scrollup');
  if(topBtn){
    document.addEventListener("scroll", function(e){
      if((rootElement).scrollTop > 100){
          topBtn.style.display = 'block';
      }else{
        topBtn.style.display = 'none';
      }
    });
    document.querySelector('.scrollup').onclick = function () {
      scrollTo(rootElement, 0, 1250);
    }
  }
  // Progressive Reading Bar
  var bar = document.querySelector('.scroll-progress');
  var rootElement = typeof InstallTrigger !== 'undefined' ? document.documentElement :
  document.body;
  if(bar){
    document.addEventListener("scroll", function(e){
      var dw = document.body.scrollWidth,
          dh = document.body.scrollHeight,
          wh = window.innerHeight,
          pos = (rootElement).scrollTop,
          bw = ((pos / (dh - wh)) * 100);
      bar.style.width = bw+'%';
    });
  }
  // Date for copyright
  var presentDate = new Date(), showDate = document.querySelector('.thisYear');
  showDate.innerHTML = presentDate.getFullYear();
});


function scrollTo(element, to, duration) {
  var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

  var animateScroll = function(){
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if(currentTime < duration) {
          setTimeout(animateScroll, increment);
      }
  };
  animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};
