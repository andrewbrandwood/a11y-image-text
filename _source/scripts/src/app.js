(function(window, $, undefined){
	"use strict";

	var Website = Website || {};

	Website = function(){

		var _self = this;

		function init(){
			setTitles('Title', 'ImageTest');
			setTitles('Title2', 'ImageTest2');
			setTitles('Title3', 'ImageTest3');


			//getAcessibility({r:255,g:255,b:255},getAverageColourAsRGB(img3))

		}

		init();
	};

	function setTitles(TitleId, ImgId){
		var img = document.getElementById(ImgId);
		var title = document.getElementById(TitleId);
		title.style.color = getAverageColourAsRGB(img).css;
	}

	$(window).on('load', function(){
		var website = new Website();
	})





})(window, jQuery);
