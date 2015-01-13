// jQuery 2.1.1
//=require vendor/jquery

$(document).ready(function(){
	// Menu Navigation
	$('nav>svg').click(function(){
		$(this).closest('nav').toggleClass('active');
	});
	// Moving head images to header position
	var $header = $('.head-image');
	$('.container>header').prepend($header);
});