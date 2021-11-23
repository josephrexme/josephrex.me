(function() {
  // http://dustindiaz.com/smallest-domready-ever
  function ready(cb) {
    /in/.test(document.readyState) // in = loadINg
      ? setTimeout(ready.bind(null, cb), 9)
      : cb();
  }
  ready(function(){
    // Progressive reading indicator
    var indicator = document.querySelector('.scroll-progress');
    if(indicator){
      document.addEventListener('scroll', function(e) {
        var dh = document.body.scrollHeight;
        var wh = window.innerHeight;
        var pos = window.scrollY;
        var footerHeight = 345;
        var perc = pos / (dh - footerHeight - wh) * 100;
        indicator.style.setProperty('--scale', (perc / 100));
      })
    }
  });
}())
