//
// Sprockets Includes
//
//= require vendor/barba.min
//= require vendor/web-animations.min
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
      var _this = this;
      return new Promise(function(resolve, reject){
        resolve(_this.oldContainer.animate({ opacity: [0.5, 0] }, 400));
      });
    },
    reveal: function() {
      var _this = this;
      var newPage = this.newContainer;
      document.body.scrollTop = 0;
      this.oldContainer.style.display = 'none';
      var fadeIn = newPage.animate({ opacity: [0.5, 1] }, 400);
      fadeIn.onfinish = function(e){
        _this.done();
      }
    }
  });
  Barba.Pjax.getTransition = function() {
    return pageTransition;
  };
});


// Barba Pjax Page Load Listener
Barba.Dispatcher.on('transitionCompleted', function() {
  var threadContainer = document.getElementById('disqus_thread');
  // TypeSet MathJax
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  // Share Post dropdown
  var shareBtn = document.getElementById('shareDropdown');
  if(shareBtn){
    shareBtn.addEventListener('click', function(e){
      var dropDown = document.querySelector('.post__sharelinks');
      var openedSharedClass = 'is-opened-sharelinks';
      dropDown.classList.toggle(openedSharedClass);
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
          disqusHeight = threadContainer.clientHeight,
          bottomContentHeight = 700;
          pos = (rootElement).scrollTop,
          bw = ((pos / ((dh - (bottomContentHeight + disqusHeight)) - wh)) * 100);
      bar.style.width = bw+'%';
    });
  }
  // Show/Hide Disqus comments
  var commentTrigger = document.querySelector('.js-toggleComments');
  if(commentTrigger){
    var disqus_config = function() {
      this.page.url = document.querySelector('[rel="canonical"]').href;
      this.page.identifier = document.querySelector('[property="og:title"]').content
        .replace(' ', '-');
    };
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
  var crossOnTrigger = document.querySelector('.comments__trigger__plus');
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
  if(typeof(DISQUS) === 'undefined'){
    crossOnTrigger.classList.add('comments__trigger--animated');
  }
  if(crossOnTrigger.classList.contains('comments__trigger--xclose')){
    crossOnTrigger.classList.remove('comments__trigger--xclose');
    crossOnTrigger.classList.remove('comments__trigger--animated');
  }else{
    if(typeof(DISQUS) === 'undefined'){
      setTimeout(function() {
        crossOnTrigger.classList.remove('comments__trigger--animated');
        crossOnTrigger.classList.add('comments__trigger--xclose');
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      },5000);
    }else{
      crossOnTrigger.classList.add('comments__trigger--xclose');
    }
  }
}
