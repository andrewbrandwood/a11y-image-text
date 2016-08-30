(function(window, $, undefined){
	"use strict";

	var Website = Website || {};

	Website = function(){

		var _self = this;

		function init(){
			var img = document.getElementById('ImageTest');
			var title = document.getElementById('Title');
			var img2 = document.getElementById('ImageTest2');
			var title2 = document.getElementById('Title2');
			var img3 = document.getElementById('ImageTest3');
			var title3 = document.getElementById('Title3');
			title.style.color = getAverageColourAsRGB(img).css;
			title2.style.color = getAverageColourAsRGB(img2).css;
			title3.style.color = getAverageColourAsRGB(img3).css;

			var image1RGB =

			getAcessibility({r:255,g:255,b:255},getAverageColourAsRGB(img3))

		}

		init();
	};

	$(window).on('load', function(){
		var website = new Website();
	})





})(window, jQuery);
