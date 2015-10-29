$(document).on('click','.customTabs',function(){
	var clickedElem = $(this);
	var activeElem = $(this).closest('ul').find('li.active a');
	var showElemClass = clickedElem.attr('data-show');
	var hideElemClass = activeElem.attr('data-show');
	if(showElemClass == hideElemClass) {return}
	clickedElem.closest('.customTabsHolder').find('.'+hideElemClass).fadeOut('fast',function(){
		clickedElem.closest('.customTabsHolder').find('.'+showElemClass).fadeIn('fast');
		clickedElem.parent().addClass('active');
		activeElem.parent().removeClass('active');		
	});
});

var cb = function() {
  var l = document.createElement('link'); l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900';
  var h = document.getElementsByTagName('head')[0]; 
  h.parentNode.insertBefore(l, h);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);

$(document).on('click','.scrollToTop',function(){
	$('html,body').animate({
	   scrollTop: 0
	}, 1000);	
});

$(window).scroll(function () {  
  var scrollTop = $(window).scrollTop();
  if(scrollTop > 10 && $('.scrollToTop').css('display') == 'none'){
  	$('.scrollToTop').fadeIn('fast');
  }else if(scrollTop == 0 && $('.scrollToTop').css('display') == 'block'){
  	$('.scrollToTop').fadeOut('fast');
  }
}).trigger("scroll");

$(document).on('click','.quickContact>button',function(){
	var val = -280;
	if($('.quickContact').css('right') == '-280px'){
		val = 0;
	}
	$('.quickContact').animate({
		right:val,
	},400);
});