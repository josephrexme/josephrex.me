// http://dustindiaz.com/smallest-domready-ever
function ready(cb) {
	/in/.test(document.readyState) // in = loadINg
		? setTimeout(ready.bind(null, cb), 9)
		: cb();
}
ready(function(){
	// Sticky logo on home page
	var wrap = document.querySelector('#js-wrap');
	/*document.addEventListener('click', function(e) {
	   if ( e.target.webkitMatchesSelector('#js-wrap') ) {
	   }
	}, false);*/
	/*addEvent(wrap, 'scroll', function(){
    	if (wrap.scrollTop > 5) {
	    	addClass(wrap, 'fixed')
		}else {
			removeClass(wrap, 'fixed')
		}
		alert("hey");
	});*/
	if(wrap){
		wrap.addEventListener("scroll", function(e) {
		  wrap.classList.toggle('fixed', (wrap.scrollTop > 10));
		});
	}
	// Handling Navigation
	menuIcon = document.querySelectorAll('nav > svg');
	Array.prototype.forEach.call( menuIcon, function(el) {
	   el.addEventListener('click', function() {

	     el.parentNode.classList.toggle('active');

	  }, false);

	});
});

var hasClass = function (el, cl) {
        var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
        return !!el.className.match(regex);
    },

addClass = function (el, cl) {
    el.className += ' ' + cl;
},

removeClass = function (el, cl) {
    var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
    el.className = el.className.replace(regex, ' ');
},

toggleClass = function (el, cl) {
    hasClass(el, cl) ? removeClass(el, cl) : addClass(el, cl);

};
var addEvent = (function () {
	var filter = function(el, type, fn) {
		for ( var i = 0, len = el.length; i < len; i++ ) {
			addEvent(el[i], type, fn);
		}
	};
	if ( document.addEventListener ) {
		return function (el, type, fn) {
			if ( el && el.nodeName || el === window ) {
				el.addEventListener(type, fn, false);
			} else if (el && el.length) {
				filter(el, type, fn);
			}
		};
	}

	return function (el, type, fn) {
		if ( el && el.nodeName || el === window ) {
			el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
		} else if ( el && el.length ) {
			filter(el, type, fn);
		}
	};
})();