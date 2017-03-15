//
// Sprockets Includes
//
//= require vendor/jquery/dist/jquery
//= require vendor/barba.min
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
  // TypeSet MathJax
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  // Share Post dropdown
  var shareBtn = document.getElementById('shareDropdown');
  if(shareBtn){
    shareBtn.addEventListener('click', function(e){
      var dropDown = document.querySelector('.post__sharelinks');
      dropDown.style.display = dropDown.style.display == 'block' ? 'none' : 'block';
    });
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
  // Show/Hide Disqus comments
  var commentTrigger = document.querySelector('.js-toggleComments');
  var threadContainer = document.getElementById('disqus_thread');
  if(commentTrigger){
    commentTrigger.addEventListener('click', function() {
      var threadVisibility = threadContainer.style.display;
      threadContainer.style.display = threadVisibility == 'none' ? 'block' : 'none';
      disqusComments();
    });
  }
  // Date for copyright
  var presentDate = new Date(), showDate = document.querySelector('.thisYear');
  showDate.innerHTML = presentDate.getFullYear();
});


// Disqus Init
function disqusComments() {
  var disqus_shortname = 'josephrexme';
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}
