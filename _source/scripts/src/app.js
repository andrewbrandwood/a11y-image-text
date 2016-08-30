(function(window, $, undefined){
	"use strict";

	var Website = Website || {};

	Website = function(){

		var _self = this;

		function init(){
			setTitles('Title', 'ImageTest');
			setTitles('Title2', 'ImageTest2');
			setTitles('Title3', 'ImageTest3');

			getTextareaDimensions();

		}

		init();
	};

	function getTextareaDimensions(){
		var $textArea = $('[data-textarea]');
		var $pictureFrame = $('[data-picture-frame]');
		var w = $textArea.width();
		var h = $textArea.height();
		var tp = $textArea.offset();
		var pp = $pictureFrame.offset();
		var x = tp.left - pp.left;
		var y = tp.top - pp.top;
		return {w:w,h:h,x:x,y:y};
	}

	function getTextAreaColor(){
		var $textArea = $('[data-textarea]');

		var rgbString = $textArea.css('color')
		var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		delete parts[0];
		return {r:parseInt(parts[1]), g:parseInt(parts[2]), b:parseInt(parts[3]) };
	}

	function setTitles(TitleId, ImgId){
		var $img = $('#' + ImgId);
		var $title = $('#' + TitleId);
		$title.css({ color: getAverageColourAsRGB($img.get(0), getTextareaDimensions()).css});

		console.log(getTextAreaColor());



		getAcessibility(getTextAreaColor(),getAverageColourAsRGB($img.get(0), getTextareaDimensions()));
	}

	$(window).on('load', function(){
		var website = new Website();
	})





})(window, jQuery);
