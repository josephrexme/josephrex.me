(function() {
  // http://dustindiaz.com/smallest-domready-ever
  function ready(cb) {
    /in/.test(document.readyState) // in = loadINg
      ? setTimeout(ready.bind(null, cb), 9)
      : cb();
  }
  ready(function(){
    // Progressive reading indicator
    const indicator = document.querySelector('.scroll-progress');
    if(indicator){
      document.addEventListener('scroll', function(e) {
        const dh = document.body.scrollHeight;
        const wh = window.innerHeight;
        const pos = window.scrollY;
        const footerHeight = 525;
        const perc = pos / (dh - footerHeight - wh) * 100;
        indicator.style.setProperty('--scale', (perc / 100));
      })
    }
  });
}())
