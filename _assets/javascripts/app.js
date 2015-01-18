// http://dustindiaz.com/smallest-domready-ever
function ready(cb) {
	/in/.test(document.readyState) // in = loadINg
		? setTimeout(ready.bind(null, cb), 9)
		: cb();
}
ready(function(){
	// Handling Navigation
	menuIcon = document.querySelectorAll('nav > svg');
	Array.prototype.forEach.call( menuIcon, function(el) {
	   el.addEventListener('click', function() {

	     el.parentNode.classList.toggle('active');

	  }, false);

	});
    // Moving Featured Image to header
	var featuredImage = document.querySelector('.head-image');
	var header = document.querySelectorAll('.container > header')[0];
	header.appendChild(featuredImage);
});