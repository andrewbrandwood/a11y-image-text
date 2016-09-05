(function(window, $, undefined){
	"use strict";

	var Website = Website || {};

	Website = function(){

		var _self = this;

		function run(){

			var textColor = getColor($('[data-js-color]'));
			setTextColor(textColor);
			setTitleColor(textColor);
			setColors();
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

		function setColors(ImgId){
			var $img = $('[data-main-image]');

			var textAreaDimensions = getTextareaDimensions();
			var bgColor = getAverageColourAsRGB($img.get(0), textAreaDimensions);

			setBgColor(bgColor.css);

			getAcessibility(getTextAreaColor(),bgColor);
		}

		function setColor(color){
			var bgColor = getBgColor();
			var textColor = getTextColor();
			run();
		}

		function setTitleColor(color){
			var $title = $('[data-title');
			$title.css({'color': '#' + color});
		}

		function setTextColor(color){
				setTitleColor(color);
				var $textArea = $('[data-textarea]');
				$textArea.css({'color': '#' + color});
		}

		function setBgColor(color){
			console.log(color);
				var $bg = $('body');
				$bg.css({'background-color': color});
		}

		function getColor(e){
			var $input = $(e);
			var color = $input.val();
			return color;
		}

		function handleImage(e){
			var reader = new FileReader(e);
			reader.onload = function(event){
				var img = new Image();
				$('[data-main-image]').get(0).src = event.target.result;
				run();
			}
			reader.readAsDataURL(e.target.files[0]);
		}

		function init(){
			$(window).on('draggable:stopped', run);
			$('[data-js-color]').on('change', run);
			$('[data-image-uploader-file]').on('change', handleImage);
			run();
			setDraggable();
		}

		init();
	};



	$(window).on('load', function(){
		var website = new Website();
	});





})(window, jQuery);
