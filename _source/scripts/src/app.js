(function(window, $, undefined){
	"use strict";

	var Website = Website || {};

	Website = function(){

		var _self = this;

		function run(){
			setTitles('Title', 'ImageTest');
			// setTitles('Title2', 'ImageTest2');
			// setTitles('Title3', 'ImageTest3');

			getTextareaDimensions();
		}

		function setDraggable(){
			var $textArea = $('[data-text-drag-frame]');
			$textArea.draggable({ containment: 'parent', scroll: false,
				stop: function() {
					$(window).trigger('draggable:stopped');
				}
			});
		}

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

			var rgbString = $textArea.css('color');
			var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			delete parts[0];
			return {r:parseInt(parts[1]), g:parseInt(parts[2]), b:parseInt(parts[3]) };
		}

		function setTitles(TitleId, ImgId){
			var $img = $('#' + ImgId);
			var $title = $('#' + TitleId);
			$title.css({ color: getAverageColourAsRGB($img.get(0), getTextareaDimensions()).css});
			getAcessibility(getTextAreaColor(),getAverageColourAsRGB($img.get(0), getTextareaDimensions()));
		}

		function setTextColor(color){
				var $textArea = $('[data-textarea]');
				$textArea.css({'color': '#' + color});
				run();
		}

		function getColor(e){
			var $input = $(e.currentTarget);
			var color = $input.val();
			setTextColor(color);
		}

		function init(){
			$(window).on('draggable:stopped', run);
			$('[data-js-color]').on('change', getColor);
			run();
			setDraggable();
		}

		init();
	};



	$(window).on('load', function(){
		var website = new Website();
	});





})(window, jQuery);
